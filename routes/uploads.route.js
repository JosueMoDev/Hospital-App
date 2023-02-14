const { Router } = require('express');
const { uploadFile } = require('../controllers/upload.controller');


const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// router.use(expressFileUpload());
// Route => Searching All
// router.put('/:schema/:id', isJwtValid, uploadFile);

// router.get('/:schema/:file', returnImage );

router.post('/photo/:folder/:id', isJwtValid, uploadFile);


module.exports = router;