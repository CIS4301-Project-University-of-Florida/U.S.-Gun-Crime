import { Router } from 'express';
import IncidentRouter from './Incident';
import DeepDiveRouter from './DeepDive';
import LocationRouter from './Location';
import GunRouter from './Gun';
import ParticipantRouter from './Participant';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/incident', IncidentRouter);
router.use('/deepdive', DeepDiveRouter);
router.use('/location', LocationRouter);
router.use('/gun', GunRouter);
router.use('/participant', ParticipantRouter);

// Export the base-router
export default router;
