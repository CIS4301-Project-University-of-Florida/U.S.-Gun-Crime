import app from '@server';
import { logger } from '@shared';
import cors from 'cors';

// Start the server
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
