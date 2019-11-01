import { Router } from 'express';
import IncidentRouter from './Incidents';
import DeepDiveRouter from './DeepDive';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/incidents', IncidentRouter);
router.use('/deepdive', DeepDiveRouter);

// Export the base-router
export default router;
