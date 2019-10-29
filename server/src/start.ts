import app from '@server';
import { logger } from '@shared';
import query from './query/query';
import Incident from './entities/Incident';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});

// Example of calling a query
const result = query<Incident>(`SELECT * FROM Incident WHERE ROWNUM < 5`);
result.then((value: Incident[] | undefined) => {
  if (value) {
    value.forEach((incident: Incident) =>
      console.log(`ID: ${incident.I_DATE}`)
    );
  }
});
