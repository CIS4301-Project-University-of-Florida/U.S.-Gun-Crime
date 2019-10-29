import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import Incident from 'src/entities/Incident';

// Init shared
const router = Router();

/******************************************************************************
 *            For testing purposes only: "GET /api/incidents/firstFour"
 ******************************************************************************/

router.get('/firstFour', async (req: Request, res: Response) => {
  try {
    const incidents = await query<Incident>(
      `SELECT * FROM Incident WHERE ROWNUM < 5`
    );
    return res.status(OK).json({ incidents });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
