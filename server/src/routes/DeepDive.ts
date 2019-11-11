import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import {
  Participant,
  Incident,
  IncidentCharacteristic,
  Gun,
  Location,
} from 'src/table';

// Init shared
const router = Router();

// Client-side data sent as a POST payload
interface FormData {
  characteristics: string[];
  numKilled: { equality: string; count: number };
  numInjured: { equality: string; count: number };
  dateRange: [string, string];
  numGuns: { equality: string; count: number };
  gunTypes: string[];
  participant: {
    qualifier: 'any' | 'only';
    gender: 'Any' | 'M' | 'F';
    age: { equality: string; count: number };
    type: string;
    status: string;
    relationship: string;
  };
  usState: string;
  cityOrCounty: string;
  houseDistrict: string;
  senateDistrict: string;
}

export const quoteAndSeparateWithCommas = (data: string[]) => {
  return "'" + data.join("','") + "'";
};

const invert = (equalitySymbol: string) => {
  switch (equalitySymbol) {
    case '>=':
      return '<';
    case '>':
      return '<=';
    case '=':
      return '<>';
    case '<=':
      return '>';
    case '<':
      return '>=';
  }
};

/******************************************************************************
 *                        See deep dive tool in frontend
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
  const data: FormData = req.body;

  const participant = data.participant;

  const ageEquality =
    participant.qualifier === 'only'
      ? invert(participant.age.equality)
      : participant.age.equality;

  // Okay, here's the deal: By default, the age field is set to >= 0.
  // By definition, every living thing on this planet is of age >= 0.
  // It's simply not possible to be of negative age. Now, a null age
  // in the database, while technically denoting an "unknown" age, is
  // at least known to be >= 0 (this does not hold true for any other
  // threshold or equality sign). So we have to account for this special case.
  const ageCanBeNull =
    participant.age.equality === '>=' && participant.age.count === 0;

  // Same logic here. All crimes involved >= 1 gun, even if the count is null.
  // Why? Because a gun crime... had to involve at least one gun :D
  const gunCountCanBeNull =
    data.numGuns.equality === '>=' && data.numGuns.count === 1;

  let participantQuery;

  if (participant.qualifier === 'any') {
    participantQuery = `
    SELECT id, incident_id FROM ${Participant}
    WHERE (
      ${
        ageCanBeNull
          ? `(age IS NULL OR age${ageEquality}${participant.age.count})`
          : `age${ageEquality}${participant.age.count}`
      }
      ${
        participant.gender !== 'Any'
          ? ` AND gender='${participant.gender}'`
          : ''
      }
      ${participant.type ? ` AND type='${participant.type}'` : ''}
      ${participant.status ? ` AND status='${participant.status}'` : ''}
      ${
        participant.relationship
          ? ` AND relationship='${participant.relationship}'`
          : ''
      }
    )
    `;
  } else {
    // In this case, we get the set difference between all participants
    // and those participants not matching any of the conditions.
    // Applying DeMorgan's laws yields ORs, IS NULLs, and <> in place of
    // AND, IS NOT NULL, and =, respectively. Note that the ageCanBeNull
    // case has to be inverted as well. It's tricky but makes sense
    // because of the negation logic in a set difference query: if the
    // age can be null, then we have to subtract all cases where age
    // is not null and whatever equality we have. We then have to inner
    // join this again with Participant to get the participant IDs as well.
    participantQuery = `
    SELECT id, onlyParticipants.incident_id
    FROM
    (
    SELECT incident_id FROM ${Participant}
    MINUS
    (
    SELECT incident_id FROM ${Participant}
    WHERE (
      ${!ageCanBeNull ? `(age IS NULL OR ` : ''}age${ageEquality}${
      participant.age.count
    }${!ageCanBeNull ? `)` : ''}
      ${
        participant.gender !== 'Any'
          ? ` OR gender IS NULL OR gender<>'${participant.gender}'`
          : ''
      }
      ${
        participant.type
          ? ` OR type IS NULL OR type<>'${participant.type}'`
          : ''
      }
      ${
        participant.status
          ? ` OR status IS NULL OR status<>'${participant.status}'`
          : ''
      }
      ${
        participant.relationship
          ? ` OR relationship IS NULL OR relationship<>'${participant.relationship}'`
          : ''
      }
    ))) onlyParticipants INNER JOIN ${Participant} ON onlyParticipants.incident_id = Participant.incident_id`;
  }

  const queryString = `
    SELECT DISTINCT inc.id AS incident_id, n_participants, i_date AS incident_date, n_killed, n_injured, notes, source_url,
    n_guns_involved, loc.latitude, loc.longitude, state, city_or_county, state_house_district, state_senate_district
    FROM ${Incident} inc INNER JOIN (${participantQuery}) p ON inc.id = p.incident_id 
    LEFT OUTER JOIN ${IncidentCharacteristic} ic ON inc.id = ic.incident_id
    LEFT OUTER JOIN ${Location} loc ON inc.latitude = loc.latitude AND inc.longitude = loc.longitude
    LEFT OUTER JOIN ${Gun} ON inc.id = Gun.incident_id
    INNER JOIN (
      SELECT incident_id, COUNT(DISTINCT id) AS n_participants
      FROM ${Participant}
      GROUP BY incident_id
    ) pcount ON pcount.incident_id = inc.id
    WHERE 
    n_killed${data.numKilled.equality}${data.numKilled.count}
    AND n_injured${data.numInjured.equality}${data.numInjured.count}
    ${
      data.characteristics.length
        ? `AND incident_characteristic IN (${quoteAndSeparateWithCommas(
            data.characteristics
          )})`
        : ''
    }
    ${
      data.dateRange[0]
        ? `AND i_date BETWEEN TO_DATE('${data.dateRange[0]}', 'MM/DD/YYYY') AND TO_DATE('${data.dateRange[1]}', 'MM/DD/YYYY')`
        : ''
    }
    AND ${
      gunCountCanBeNull
        ? `(n_guns_involved IS NULL OR n_guns_involved${data.numGuns.equality}${data.numGuns.count})`
        : `n_guns_involved${data.numGuns.equality}${data.numGuns.count}`
    }
    ${
      data.gunTypes.length
        ? `AND type IN (${quoteAndSeparateWithCommas(data.gunTypes)})`
        : ''
    }
    ${data.usState ? `AND state='${data.usState}'` : ''}
    ${data.cityOrCounty ? `AND city_or_county='${data.cityOrCounty}'` : ''}
    ${data.houseDistrict ? `AND house_district=${data.houseDistrict}` : ''}
    ${data.senateDistrict ? `AND senate_district=${data.senateDistrict}` : ''}
    ORDER BY incident_date
  `;

  logger.info('Attempting to execute this query:');
  console.log(queryString);

  try {
    const incidents = await query(queryString, true);
    return res.status(OK).json(incidents);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
