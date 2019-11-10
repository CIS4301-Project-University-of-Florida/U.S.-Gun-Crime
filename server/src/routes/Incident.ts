import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';

// Init shared
const router = Router();

/**
 * Returns participant info for the incident with the given ID.
 */
router.get('/:id/participants', async (req: Request, res: Response) => {
  try {
    const characteristics = await query(
      `SELECT Participant.name, Participant.age, Partcipant.gender, Participant.type, Participant.status, Participant.relationship
      FROM Incident INNER JOIN Participant ON Incident.id = Participant.incident_id
      WHERE Incident.id = ${req.params.id}`
    );
    return res.status(OK).json(characteristics);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns gun info for the incident with the given ID.
 */
router.get('/:id/guns', async (req: Request, res: Response) => {
  try {
    const characteristics = await query(
      `SELECT Gun.type, Gun.stolen
      FROM Incident INNER JOIN Gun ON Incident.id = Gun.incident_id
      WHERE Incident.id = ${req.params.id}`
    );
    return res.status(OK).json(characteristics);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns all distinct characteristics that an incident may have.
 */
router.get('/characteristics', async (req: Request, res: Response) => {
  try {
    const characteristics = await query(
      `SELECT DISTINCT incident_characteristic FROM IncidentCharacteristic ORDER BY incident_characteristic`
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
