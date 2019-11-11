import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import query from 'src/query/query';
import { Participant } from 'src/table';

// Init shared
const router = Router();

/**
 * Returns number of victims in different age ranges
 */
router.get('/Victims', async (req: Request, res: Response) => {
  try {
    const Victims = await query(
      `SELECT SUM(CASE WHEN A.age BETWEEN 0 AND 9 THEN 1 ELSE 0 END) AS group1,
        SUM(CASE WHEN A.age BETWEEN 10 AND 19 THEN 1 ELSE 0 END) AS group2,
        SUM(CASE WHEN A.age BETWEEN 20 AND 29 THEN 1 ELSE 0 END) AS group3,
        SUM(CASE WHEN A.age BETWEEN 30 AND 39 THEN 1 ELSE 0 END) AS group4,
        SUM(CASE WHEN A.age BETWEEN 40 AND 49 THEN 1 ELSE 0 END) AS group5,
        SUM(CASE WHEN A.age BETWEEN 50 AND 59 THEN 1 ELSE 0 END) AS group6,
        SUM(CASE WHEN A.age BETWEEN 60 AND 69 THEN 1 ELSE 0 END) AS group7,
        SUM(CASE WHEN A.age BETWEEN 70 AND 79 THEN 1 ELSE 0 END) AS group8,
        SUM(CASE WHEN A.age BETWEEN 80 AND 89 THEN 1 ELSE 0 END) AS group9,
        SUM(CASE WHEN A.age BETWEEN 90 AND 99 THEN 1 ELSE 0 END) AS group10,
        SUM(CASE WHEN A.age BETWEEN 100 AND 109 THEN 1 ELSE 0 END) AS group11
        FROM (SELECT * FROM
        ${Participant}
        WHERE ${Participant}.type='Victim') A`
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
 * Returns number of suspects in different age ranges
 */
router.get('/Suspects', async (req: Request, res: Response) => {
  try {
    const Suspects = await query(
      `SELECT SUM(CASE WHEN A.age BETWEEN 0 AND 9 THEN 1 ELSE 0 END) AS group1,
        SUM(CASE WHEN A.age BETWEEN 10 AND 19 THEN 1 ELSE 0 END) AS group2,
        SUM(CASE WHEN A.age BETWEEN 20 AND 29 THEN 1 ELSE 0 END) AS group3,
        SUM(CASE WHEN A.age BETWEEN 30 AND 39 THEN 1 ELSE 0 END) AS group4,
        SUM(CASE WHEN A.age BETWEEN 40 AND 49 THEN 1 ELSE 0 END) AS group5,
        SUM(CASE WHEN A.age BETWEEN 50 AND 59 THEN 1 ELSE 0 END) AS group6,
        SUM(CASE WHEN A.age BETWEEN 60 AND 69 THEN 1 ELSE 0 END) AS group7,
        SUM(CASE WHEN A.age BETWEEN 70 AND 79 THEN 1 ELSE 0 END) AS group8,
        SUM(CASE WHEN A.age BETWEEN 80 AND 89 THEN 1 ELSE 0 END) AS group9,
        SUM(CASE WHEN A.age BETWEEN 90 AND 99 THEN 1 ELSE 0 END) AS group10,
        SUM(CASE WHEN A.age BETWEEN 100 AND 109 THEN 1 ELSE 0 END) AS group11
        FROM (SELECT * FROM
        ${Participant}
        WHERE ${Participant}.type='Subject-Suspect') A`
    );
    return res.status(OK).json(Suspects);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
