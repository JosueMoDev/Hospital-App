const { Router } = require('express');
const { getSearchingRespose } = require('../controllers/searchingAll.controller');
const { getDocumentsCollection } = require('../controllers/searchIntoSchema.controller');
// const { check } = require('express-validator');
// const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');


const router = Router();
// Route => Searching All
router.get('/:query', isJwtValid, getSearchingRespose);

router.get('/collection/:schema/:query', isJwtValid, getDocumentsCollection);

module.exports = router;