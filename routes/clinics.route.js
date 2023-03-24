const { Router } = require('express');
const { getClinics, createClinic, updateClinic, deleteClinic, assingDoctorsToClinic, removeAllAssingDoctorsToClinic, removeADoctorassignedToClinic } = require('../controllers/clinic.controller')
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid, isAdminUser } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => Hospitals
router.get('/', [isJwtValid], getClinics);
router.post('/', [
    isJwtValid,
    check('register_number', `Clinic's register number is a required field`).not().isEmpty(),
    check('phone', `Clinic's phone number is a required field`).not().isEmpty(),
    check('name', `Clinic's name is a required field`).not().isEmpty(),
    check('address', `Clinic's address is a required field`).not().isEmpty(),
    fieldsValidation
], createClinic);
router.put('/:id', [
    isJwtValid,
    // isAdminUser,
    check('register_number', `Clinic's register number is a required field`).not().isEmpty(),
    check('phone', `Clinic's phone number is a required field`).not().isEmpty(),
    check('name', `Clinic's name is a required field`).not().isEmpty(),
    check('country', `Clinic's country is a required field`).not().isEmpty(),
    check('province', `Clinic's province is a required field`).not().isEmpty(),
    check('city', `Clinic's city is a required field`).not().isEmpty(),
    check('street', `Clinic's street is a required field`).not().isEmpty(),
    fieldsValidation
], updateClinic);

router.put('/assignment/:id', [
    isJwtValid,
    check('doctors_assigned', `Doctors is a required field`).not().isEmpty(),
    fieldsValidation
], assingDoctorsToClinic);

router.put('/remove-all-assigned/:id', isJwtValid, removeAllAssingDoctorsToClinic);

router.put('/remove-doctor-assigned/:id', isJwtValid, removeADoctorassignedToClinic );

router.put('/delete/:id', [isJwtValid], deleteClinic);


module.exports = router;