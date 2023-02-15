const { Router } = require('express');
const { uploadPhoto, deletePhoto } = require('../controllers/files.controller');


const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// router.use(expressFileUpload());
// Route => Searching All
// router.put('/:schema/:id', isJwtValid, uploadFile);

// router.get('/:schema/:file', returnImage );

router.post('/photo/upload/:folder/:id', isJwtValid, uploadPhoto);
router.delete('/photo/destroy/:folder/:id', isJwtValid, deletePhoto);


module.exports = router;