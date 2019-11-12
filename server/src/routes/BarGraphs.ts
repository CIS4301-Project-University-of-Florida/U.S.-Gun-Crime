import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Incident, Gun, Participant } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns number of gun deaths caused by different gun types
 */
router.get('/byguntype', async (req: Request, res: Response) => {
  try {
    const bygender = await query(
      `SELECT type, SUM(n_killed) AS n_killed
        FROM ${Incident}, ${Gun}
        WHERE ${Incident}.id = ${Gun}.incident_id
        AND type IS NOT NULL
        GROUP BY type`
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
 * Returns correlation between gun crime and relationship type
 */
router.get('/byrelationship', async (req: Request, res: Response) => {
  try {
    const bygender = await query(
      `SELECT relationship, COUNT(incident_id) AS incidentcount
        FROM ${Incident}, ${Participant}
        WHERE ${Incident}.id = ${Participant}.incident_id
        AND relationship IS NOT NULL
        GROUP BY relationship`
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
