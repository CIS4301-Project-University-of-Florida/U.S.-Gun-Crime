import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

// Client-side data sent as a POST payload
interface IData {
  characteristics: string[];
  numKilled: { equality: string; count: number };
  numInjured: { equality: string; count: number };
  dateRange: [string, string];
  numGuns: { equality: string; count: number };
  gunTypes: string[];
  participant: {
    gender: string;
    age: { equality: string; count: number };
    type: string;
    status: string;
    relationship: string;
  };
  usState: string;
  cityOrCounty: string;
  houseDistrict: string;
  senateDistrict: string;
  waitingForData: boolean;
}

export const quoteAndSeparateWithCommas = (data: string[]) => {
  return "'" + data.join("','") + "'";
};

/******************************************************************************
 *                        See deep dive tool in frontend
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
  const data: IData = req.body;

  logger.info('/api/deepDive endpoint received this data:');
  console.log(data);

  const participantQuery = `
    SELECT *
    FROM Participant WHERE (${data.participant});
  `;

  // TODO: return multi-valued attributes; squash duplicate incidents into one in the frontend maybe?
  // TODO: add participants
  const queryString = `
    SELECT DISTINCT Incident.id, i_date, n_killed, n_injured, 
    Incident.latitude, Incident.longitude, state, city_or_county, state_house_district, state_senate_district, notes, source_url
    FROM Incident INNER JOIN IncidentCharacteristic ON Incident.id = IncidentCharacteristic.incident_id
    INNER JOIN Location ON Incident.latitude = Location.latitude AND Incident.longitude = Location.longitude
    INNER JOIN Gun ON Incident.id = Gun.incident_id
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
    AND n_guns_involved${data.numGuns.equality}${data.numGuns.count}
    ${
      data.gunTypes.length
        ? `AND type IN (${quoteAndSeparateWithCommas(data.gunTypes)})`
        : ''
    }
    ${data.usState ? `AND state='${data.usState}'` : ''}
    ${data.cityOrCounty ? `AND city_or_county='${data.cityOrCounty}'` : ''}
    ${data.houseDistrict ? `AND house_district=${data.houseDistrict}` : ''}
    ${data.senateDistrict ? `AND senate_district=${data.senateDistrict}` : ''}
  `;

  logger.info('Attempting to execute this query:');
  console.log(queryString);

  try {
    const incidents = await query(queryString);
    return res.status(OK).json(incidents);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
