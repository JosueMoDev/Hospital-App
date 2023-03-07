const { Router } = require('express');
const { getClinics, createClinic, updateClinic, deleteClinic } = require('../controllers/clinic.controller')
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid, isAdminUser } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => Hospitals
router.get('/', [isJwtValid], getClinics);
router.post('/', [
    // isJwtValid,
    check('register_number', `Clinic's register number is a required field`).not().isEmpty(),
    check('phone', `Clinic's phone number is a required field`).not().isEmpty(),
    check('name', `Clinic's name is a required field`).not().isEmpty(),
    check('address', `Clinic's address is a required field`).not().isEmpty(),
    fieldsValidation
], createClinic);
router.put('/:id', [
    isJwtValid,
    // isAdminUser,
    check('name', `Hospital's name is a required field`).not().isEmpty(),
    fieldsValidation
], updateClinic);
router.delete('/:id', [isJwtValid, isAdminUser], deleteClinic);


module.exports = router;