import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

/**
 * Returns all distinct characteristics that an incident may have.
 */
router.get('/characteristics', async (req: Request, res: Response) => {
  try {
    const characteristics = await query(
      `SELECT DISTINCT incident_characteristic FROM IncidentCharacteristic`
    );
    return res.status(OK).json(characteristics);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
