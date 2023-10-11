import { Router } from 'express';
import { uploadPhoto, deletePhoto } from '../controllers';
import { isJwtValid } from '../middlewares';

const router = Router();

router.post('/photo/upload/:folder/:id', isJwtValid, uploadPhoto);

router.delete('/photo/destroy/:folder/:id', isJwtValid, deletePhoto);

export default router;
