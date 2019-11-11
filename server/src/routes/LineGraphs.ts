import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

/**
 * Returns deaths per year: 2013, 2014, 2015, 2016, 2017, 2018
 */
router.get('/deathsperyear', async (req: Request, res: Response) => {
  try {
    const deathsperyear = await query(
      `SELECT SUM(n_killed) AS deaths
      FROM ${process.env.OWNER}.incident
      GROUP BY extract(year FROM i_date)
      ORDER BY extract(year FROM i_date) ASC`
    );
    return res.status(OK).json(deathsperyear);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
