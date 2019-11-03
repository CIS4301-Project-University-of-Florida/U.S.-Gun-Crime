import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

/**
 * Returns all unique relationships characterizing gun crime participants.
 */
router.get('/relationships', async (req: Request, res: Response) => {
  try {
    const relationships = await query(
      `SELECT DISTINCT relationship FROM Participant 
      WHERE relationship IS NOT NULL ORDER BY relationship`
    );
    return res.status(OK).json(relationships);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
