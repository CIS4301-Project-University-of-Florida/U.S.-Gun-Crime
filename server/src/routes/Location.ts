import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Location, Incident } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns all states in which gun crimes can occur.
 */
router.get('/states', async (req: Request, res: Response) => {
  try {
    const states = await query(
      `SELECT DISTINCT state FROM ${Location} ORDER BY state`
    );
    return res.status(OK).json(states);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all cities/counties for the specified state.
 */
router.get('/:state/citiesAndCounties', async (req: Request, res: Response) => {
  try {
    const citiesOrCounties = await query(
      `SELECT DISTINCT city_or_county FROM ${Location} WHERE state='${req.params.state}' ORDER BY city_or_county`
    );
    return res.status(OK).json(citiesOrCounties);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all cities/counties in which gun crimes can occur.
 */
router.get('/citiesAndCounties', async (req: Request, res: Response) => {
  try {
    const citiesOrCounties = await query(
      `SELECT DISTINCT city_or_county FROM ${Location} ORDER BY city_or_county`
    );
    return res.status(OK).json(citiesOrCounties);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all house districts for the given state.
 */
router.get('/:state/houseDistricts', async (req: Request, res: Response) => {
  try {
    const houseDistricts = await query(
      `SELECT DISTINCT state_house_district FROM ${Location} WHERE state='${req.params.state}' ORDER BY state_house_district`
    );
    return res.status(OK).json(houseDistricts);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all house districts in which gun crimes can occur.
 */
router.get('/houseDistricts', async (req: Request, res: Response) => {
  try {
    const houseDistricts = await query(
      `SELECT DISTINCT state_house_district FROM ${Location} ORDER BY state_house_district`
    );
    return res.status(OK).json(houseDistricts);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all senate districts for the given state.
 */
router.get('/:state/senateDistricts', async (req: Request, res: Response) => {
  try {
    const senateDistricts = await query(
      `SELECT DISTINCT state_senate_district FROM ${Location} WHERE state='${req.params.state}' ORDER BY state_senate_district`
    );
    return res.status(OK).json(senateDistricts);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all senate districts in which gun crimes can occur.
 */
router.get('/senateDistricts', async (req: Request, res: Response) => {
  try {
    const senateDistricts = await query(
      `SELECT DISTINCT state_senate_district FROM ${Location} ORDER BY state_senate_district`
    );
    return res.status(OK).json(senateDistricts);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

interface DateRange {
  start: string;
  end: string;
}

/**
 * Returns the coordinates (latitude/longitude) of all crimes that occurred in the given time range.
 */
router.post('/coordinates', async (req: Request, res: Response) => {
  const args: DateRange = req.body;

  try {
    const coordinates = await query(
      `SELECT DISTINCT loc.latitude, loc.longitude
      FROM ${Location} loc INNER JOIN ${Incident} inc 
      ON loc.latitude = inc.latitude AND loc.longitude = inc.longitude
      WHERE i_date BETWEEN TO_DATE('${args.start}', 'MM/DD/YYYY') AND TO_DATE('${args.end}', 'MM/DD/YYYY')`
    );
    return res.status(OK).json(coordinates);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
