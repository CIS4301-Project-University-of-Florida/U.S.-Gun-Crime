import oracledb from 'oracledb';
import config from 'src/config';
import { logger } from '@shared';

/** Convenience function for connecting to the Oracle database and executing queries.
 *
 * @param statement The query to execute, denoted as a string.
 * @param shouldOptimize A flag denoting whether the query needs to be optimized (e.g., for large result sets).
 * @returns A Promise whose resolved value is either an EntityType array or undefined.
 */
async function query(statement: string, shouldOptimize: boolean = false) {
  let connection;

  // fetchArraySize denotes the number of rows the DB should fetch at a time.
  // By default, this is 100. Some queries, like ones from the deep dive tool,
  // return thousands (potentially hundreds of thousands) of rows. Reducing the
  // number of round trips allows the queries to execute in a more reasonable
  // amount of time, but it's a tradeoff with memory (because we don't always
  // need a buffer for 232,000 rows).
  oracledb.fetchArraySize = shouldOptimize ? 232000 : 300;

  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(statement, [], {
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
