import { Router } from 'express';
import IncidentRouter from './Incident';
import DeepDiveRouter from './DeepDive';
import LocationRouter from './Location';
import GunRouter from './Gun';
import ParticipantRouter from './Participant';
import BarGraphsRouter from './BarGraphs';
import LineGraphsRouter from './LineGraphs';
import PolarGraphsRouter from './PolarGraphs';
import DonutGraphsRouter from './DonutGraphs';
import StateComparisonsRouter from './StateComparisons';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/incident', IncidentRouter);
router.use('/deepdive', DeepDiveRouter);
router.use('/location', LocationRouter);
router.use('/gun', GunRouter);
router.use('/participant', ParticipantRouter);

router.use('/linegraphs', LineGraphsRouter);
router.use('/bargraphs', BarGraphsRouter);
router.use('/donutgraphs', DonutGraphsRouter);
router.use('/polargraphs', PolarGraphsRouter);
router.use('/statecomparisons', StateComparisonsRouter);

// Export the base-router
export default router;
