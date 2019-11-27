import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import {
  Incident,
  Gun,
  Participant,
  Location,
  StatePopulation,
} from 'src/table';

// Init shared
const router = Router();

/**
 * Returns number of gun deaths caused by different gun types
 */
router.get('/byguntype/:var', async (req: Request, res: Response) => {
  try {
    const byguntype = await query(
      `SELECT type, SUM(n_killed) AS n_killed
        FROM ${Incident}, ${Gun}
        WHERE ${Incident}.id = ${Gun}.incident_id
        AND type IS NOT NULL
        GROUP BY type
        ORDER BY n_killed DESC`
    );
    return res.status(OK).json(byguntype);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns correlation between gun crime and relationship type
 */
router.get('/byrelationship/:var', async (req: Request, res: Response) => {
  try {
    const byrelationship = await query(
      `SELECT relationship, COUNT(incident_id) AS incidentcount
        FROM ${Incident}, ${Participant}
        WHERE ${Incident}.id = ${Participant}.incident_id
        AND relationship IS NOT NULL
        GROUP BY relationship
        ORDER BY incidentcount DESC`
    );
    return res.status(OK).json(byrelationship);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns top 30 most lethal incidents
 */
router.get('/mostlethalincidents/:var', async (req: Request, res: Response) => {
  try {
    const mostlethalincidents = await query(
      `SELECT * FROM
      (SELECT ${Location}.city_or_county||','||state||' '||i_date AS incident_details, N_KILLED
      FROM ${Incident}, ${Location}
      WHERE ${Incident}.latitude = ${Location}.latitude
      AND ${Incident}.longitude = ${Location}.longitude
      ORDER BY N_KILLED DESC)
      WHERE ROWNUM <= 30`
    );
    return res.status(OK).json(mostlethalincidents);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Ranks states by most dangerous
 */
router.get('/mostdangerousstates/:var', async (req: Request, res: Response) => {
  try {
    const mostdangerousstates = await query(
      `SELECT ${Location}.state, 
      (SUM(N_KILLED)/${StatePopulation}.population)*100000000000 AS N_KILLED,
      SUM(N_KILLED) AS GUNDEATHS,
      ${StatePopulation}.population AS STATEPOP
      FROM ${Incident}, ${Location}, ${StatePopulation}
      WHERE ${Incident}.latitude = ${Location}.latitude
      AND ${Incident}.longitude = ${Location}.longitude
      AND ${StatePopulation}.state = ${Location}.state
      AND EXTRACT(YEAR FROM i_date) = '${req.params.var}'
      AND ${StatePopulation}.year = '${req.params.var}'
      GROUP BY ${Location}.state, ${StatePopulation}.population
      ORDER BY N_KILLED DESC`
    );
    return res.status(OK).json(mostdangerousstates);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
