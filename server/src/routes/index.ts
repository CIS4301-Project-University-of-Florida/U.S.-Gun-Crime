import { Router } from 'express';
import IncidentRouter from './Incidents';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/incidents', IncidentRouter);

// Export the base-router
export default router;
