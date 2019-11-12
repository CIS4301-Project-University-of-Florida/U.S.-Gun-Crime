import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Participant } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns all genders of gun crime participants.
 */
router.get('/genders', async (req: Request, res: Response) => {
  try {
    const relationships = await query(
      `SELECT DISTINCT gender FROM ${Participant} 
      WHERE gender IS NOT NULL ORDER BY gender`
    );
    return res.status(OK).json(relationships);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all types of gun crime participants.
 */
router.get('/types', async (req: Request, res: Response) => {
  try {
    const types = await query(
      `SELECT DISTINCT type FROM ${Participant} 
      WHERE type IS NOT NULL ORDER BY type`
    );
    return res.status(OK).json(types);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all gun crime participant statuses (e.g., Killed, Arrested).
 */
router.get('/statuses', async (req: Request, res: Response) => {
  try {
    const statuses = await query(
      `SELECT DISTINCT status FROM ${Participant} 
      WHERE status IS NOT NULL ORDER BY status`
    );
    return res.status(OK).json(statuses);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all unique relationships characterizing gun crime participants.
 */
router.get('/relationships', async (req: Request, res: Response) => {
  try {
    const relationships = await query(
      `SELECT DISTINCT relationship FROM ${Participant} 
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
