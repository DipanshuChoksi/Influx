import { Router } from 'express';
import { ingestMedia, pickFolder } from '../controllers/ingest.controller';

const router = Router();

// Ingest media from local folder
router.post('/', ingestMedia);

// Native folder picker
router.get('/pick', pickFolder);

export default router;
