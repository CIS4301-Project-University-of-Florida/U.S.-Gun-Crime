import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Incident, Participant, Gun } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns number of gun crimes committed by each gender
 */
router.get('/bygender', async (req: Request, res: Response) => {
  try {
    const bygender = await query(
      `SELECT gender, COUNT(id) AS n_crimes
        FROM ${Participant}
        WHERE ${Participant}.type = 'Subject-Suspect'
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
    const isstolen = await query(
      `SELECT stolen, COUNT(id) AS n_crimes
        FROM ${Gun}
        GROUP BY stolen`
    );
    return res.status(OK).json(isstolen);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
