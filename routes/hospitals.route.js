const { Router } = require('express');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller')
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => Hospitals
router.get('/', [isJwtValid], getHospitals);
router.post('/', [
    isJwtValid,
    check('name', `Hospital's name is a required field`).not().isEmpty(),
    fieldsValidation
], createHospital);
router.put('/:id', [isJwtValid], updateHospital);
router.delete('/:id', [isJwtValid], deleteHospital);


module.exports = router;