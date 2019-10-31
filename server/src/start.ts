import app from '@server';
import { logger } from '@shared';
import query from './query/query';
import Incident from './entities/Incident';
import Location from './entities/Location';
import Participant from './entities/Participant';
import cors from 'cors';

// Start the server
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});

/*
// Example of an inner join: intersection type 'Incident & Location'

const result = query<Incident & Location>(
  `SELECT * FROM Incident 
  INNER JOIN Location 
  ON Incident.latitude = Location.latitude AND Incident.longitude = Location.longitude
  WHERE ROWNUM < 5`
);
result.then((value: Array<Incident & Location> | undefined) => {
  if (value) {
    value.forEach((incident: Incident & Location) => console.log(incident));
  }
});
*/
