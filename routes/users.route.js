const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid, isAdminUser } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => users
router.get('/',isJwtValid, getUsers);
router.post('/', [
    // isJwtValid,
    check('document_type', 'document type is a mandatory field').not().isEmpty(),
    check('document_number', 'document number is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('lastname', 'user lastname is a mandatory field').not().isEmpty(),
    check('gender', 'gender is a mandatory field').not().isEmpty(),
    check('phone', 'Phone is a mandatory field').not().isEmpty(),
    check('rol', 'rol is a mandatory field').not().isEmpty(),
    fieldsValidation
], createUser);
router.put('/:id', [
    isJwtValid,
    // isAdminUser,
    check('document_type', 'document type is a mandatory field').not().isEmpty(),
    check('document_number', 'document number is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('lastname', 'user lastname is a mandatory field').not().isEmpty(),
    check('gender', 'gender is a mandatory field').not().isEmpty(),
    check('phone', 'Phone is a mandatory field').not().isEmpty(),
    fieldsValidation
], updateUser);
router.put('/delete/:id', [isJwtValid], deleteUser);


module.exports = router;
