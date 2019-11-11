import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

/**
 * Returns number of gun deaths caused by each gender
 */
router.get('/bygender', async (req: Request, res: Response) => {
  try {
    const bygender = await query(
      `SELECT gender, SUM(n_killed) AS n_killed
        FROM ${process.env.OWNER}.incident, ${process.env.OWNER}.participant
        WHERE ${process.env.OWNER}.incident.id = ${process.env.OWNER}.participant.incident_id
        AND ${process.env.OWNER}.participant.gender IS NOT NULL
        GROUP BY gender`
    );
    return res.status(OK).json(bygender);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * number of incidents caused by stolen/not stolen guns
 */
router.get('/isstolen', async (req: Request, res: Response) => {
  try {
    const bygender = await query(
      `SELECT stolen, COUNT(id) AS numincidents
        FROM ${process.env.OWNER}.gun
        WHERE stolen IS NOT NULL
        GROUP BY stolen`
    );
    return res.status(OK).json(bygender);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
