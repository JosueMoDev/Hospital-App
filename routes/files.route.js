const { Router } = require('express');
const { uploadPhoto, deletePhoto } = require('../controllers/files.controller');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');
const router = Router();

router.post('/photo/upload/:folder/:id', isJwtValid, uploadPhoto);

router.delete('/photo/destroy/:folder/:id', isJwtValid, deletePhoto);


module.exports = router;