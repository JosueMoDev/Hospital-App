const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid, isAdminUser } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => users
router.get('/',isJwtValid, getUsers);
router.post('/', [
    check('user_id', 'user id is a mandatory field').not().isEmpty(),
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('lastname', 'user lastname is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    check('password', 'password is a mandatory field').not().isEmpty(),
    check('rol', 'rol is a mandatory field').not().isEmpty(),
    fieldsValidation
], createUser);
router.put('/:id', [
    isJwtValid,
    isAdminUser,
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    fieldsValidation
], updateUser);
router.delete('/:id', [isJwtValid, isAdminUser], deleteUser);


module.exports = router;