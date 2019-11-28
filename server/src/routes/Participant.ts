import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Participant, Incident } from 'src/table';

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

/**
 * Returns number of gun crimes committed by each gender
 */
router.get('/numberOfCrimesByGender', async (req: Request, res: Response) => {
  try {
    const bygender = await query(
      `SELECT gender, COUNT(id) AS n_crimes
        FROM ${Participant}
        WHERE ${Participant}.type = 'Subject-Suspect'
        GROUP BY gender`
    );
    return res.status(OK).json(bygender);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns number of participants matching the given type (Victim or Subject-Suspect) in different age ranges.
 */
router.get('/ageDistribution/:type', async (req: Request, res: Response) => {
  try {
    const participantType =
      req.params.type === 'victim' ? 'Victim' : 'Subject-Suspect';

    const Victims = await query(
      `SELECT SUM(CASE WHEN A.age BETWEEN 0 AND 9 THEN 1 ELSE 0 END) AS group1,
        SUM(CASE WHEN A.age BETWEEN 10 AND 18 THEN 1 ELSE 0 END) AS group2,
        SUM(CASE WHEN A.age BETWEEN 19 AND 25 THEN 1 ELSE 0 END) AS group3,
        SUM(CASE WHEN A.age BETWEEN 25 AND 26 THEN 1 ELSE 0 END) AS group4,
        SUM(CASE WHEN A.age BETWEEN 65 AND 109 THEN 1 ELSE 0 END) AS group5
        FROM (SELECT * FROM
        ${Participant}
        WHERE ${Participant}.type='${participantType}') A`
    );
    return res.status(OK).json(Victims);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/**
 * Returns correlation between gun crime and relationship type
 */
router.get('/atRiskRelationships', async (req: Request, res: Response) => {
  try {
    const byrelationship = await query(
      `SELECT relationship, COUNT(incident_id) AS incident_count
        FROM ${Incident}, ${Participant}
        WHERE ${Incident}.id = ${Participant}.incident_id
        AND relationship IS NOT NULL
        GROUP BY relationship
        ORDER BY incident_count DESC`
    );
    return res.status(OK).json(byrelationship);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
