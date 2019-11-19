import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Incident } from 'src/table';
import { Location } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns deaths per year in a state: 2013, 2014, 2015, 2016, 2017, 2018
 */
router.get('/deathsperyear/:state', async (req: Request, res: Response) => {
  try {
    const deathsperyear = await query(
      `SELECT SUM(n_killed) AS deaths
      FROM ${Incident}, ${Location}
      WHERE ${Incident}.latitude = ${Location}.latitude
      AND ${Incident}.longitude = ${Location}.longitude
      AND State = '${req.params.state}'
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
