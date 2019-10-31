import oracledb, { Result } from 'oracledb';
import config from 'src/config';
import { logger } from '@shared';

/** Convenience function for connecting to the Oracle database and executing queries.
 *  Returns a promise whose value is either undefined or an array of EntityType objects.
 *  Example call: query<Incident>('SELECT * FROM Incident'). Assuming this doesn't return
 *  undefined, you'll get an array of objects that conform to the Incident interface.
 *
 * @param statement The query to execute, denoted as a string.
 * @returns A Promise whose resolved value is either an EntityType array or undefined.
 */
async function query<EntityType>(
  statement: string
): Promise<EntityType[] | undefined> {
  let connection;

  try {
    connection = await oracledb.getConnection(config);
    const result: Result<EntityType> = await connection.execute(statement, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows;
  } catch (err) {
    logger.error(`Unable to execute '${statement}'. Error: ${err}`);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        logger.error(`Unable to close DB connection: ${err}`);
      }
    }
  }
}

export default query;
