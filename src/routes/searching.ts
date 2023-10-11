import { Router } from 'express';
import { clinicBrowser } from '../controllers';
import { isJwtValid } from '../middlewares';

const router = Router();

router.get('/:query', isJwtValid, clinicBrowser);

export default router;
