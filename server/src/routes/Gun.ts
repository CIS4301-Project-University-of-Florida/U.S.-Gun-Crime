import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Gun } from 'src/table';

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

export default router;
