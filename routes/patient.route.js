const { Router } = require('express');
const { getPatients, createPatient, updatePatient, deletePatient } = require('../controllers/patient.controller');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid, isAdminUser } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => users
router.get('/',isJwtValid, getPatients);

router.post('/', [
    isJwtValid,
    check('document_type', 'document type is a mandatory field').not().isEmpty(),
    check('document_number', 'document number is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('lastname', 'user lastname is a mandatory field').not().isEmpty(),
    check('gender', 'gender is a mandatory field').not().isEmpty(),
    check('rol', 'rol is a mandatory field').not().isEmpty(),
    fieldsValidation
], createPatient);

router.post('/outside', [
    check('document_type', 'document type is a mandatory field').not().isEmpty(),
    check('document_number', 'document number is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    check('password', 'password is a mandatory field').not().isEmpty(),
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('lastname', 'user lastname is a mandatory field').not().isEmpty(),
    check('gender', 'gender is a mandatory field').not().isEmpty(),
    check('rol', 'rol is a mandatory field').not().isEmpty(),
    fieldsValidation
], createPatient);



// router.put('/:id', [
//     isJwtValid,
//     isAdminUser,
//     check('name', 'user name is a mandatory field').not().isEmpty(),
//     check('email', 'email is a mandatory field').isEmail(),
//     fieldsValidation
// ], updateUser);
// router.delete('/:id', [isJwtValid, isAdminUser], deleteUser);


module.exports = router;