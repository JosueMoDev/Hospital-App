const { Router } = require('express');
const { uploadFile, returnImage } = require('../controllers/upload.controller');
const  expressFileUpload  = require('express-fileupload');
// const { check } = require('express-validator');
// const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');


const router = Router();
router.use(expressFileUpload());
// Route => Searching All
router.put('/:schema/:id', isJwtValid, uploadFile);

router.get('/:schema/:file', isJwtValid, returnImage );

module.exports = router;