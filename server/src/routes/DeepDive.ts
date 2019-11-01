import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

// Client-side data sent as a POST payload
interface IData {
  characteristics: string[];
  numKilled: { equality: string; count: number };
  numInjured: { equality: string; count: number };
  gunTypes: string[];
  usState: string;
  cityOrCounty: string;
  houseDistrict: string;
  senateDistrict: string;
  waitingForData: boolean;
}

/******************************************************************************
 *            See deep dive tool in frontend
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
  const data: IData = req.body;

  logger.info('/api/deepDive endpoint received this data:');
  console.log(data);

  try {
    const incidents = await query(
      `select *
      from incident inner join gun 
      ON incident.id = gun.incident_id 
      inner join location on incident.latitude = location.latitude and incident.longitude = location.longitude
      inner join participant on incident.id = participant.incident_id
      where rownum < 10000`
    );
    return res.status(OK).json(incidents);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
