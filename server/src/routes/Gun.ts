import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Gun, Incident } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns all gun types.
 */
router.get('/types', async (req: Request, res: Response) => {
  try {
    const types = await query(`SELECT DISTINCT type FROM ${Gun} ORDER BY type`);
    return res.status(OK).json(types);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Number of incidents caused by stolen/not stolen guns.
 */
router.get(
  '/numberOfCrimesByGunStolen',
  async (req: Request, res: Response) => {
    try {
      const stolen = await query(
        `SELECT stolen, COUNT(id) AS n_crimes
        FROM ${Gun}
        GROUP BY stolen`
      );
      return res.status(OK).json(stolen);
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
);

/**
 * Returns number of gun deaths caused by different gun types
 */
router.get('/rankedByDeaths', async (req: Request, res: Response) => {
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

export default router;
