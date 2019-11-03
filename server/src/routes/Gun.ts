import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

/**
 * Returns all gun types.
 */
router.get('/types', async (req: Request, res: Response) => {
  try {
    const types = await query(`SELECT DISTINCT type FROM Gun ORDER BY type`);
    return res.status(OK).json(types);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
