const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => users
router.get('/',isJwtValid, getUsers);
router.post('/', [
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('password', 'password is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    fieldsValidation
], createUser);
router.put('/:id', [
    isJwtValid,
    check('name', 'user name is a mandatory field').not().isEmpty(),
    check('email', 'email is a mandatory field').isEmail(),
    fieldsValidation
], updateUser);
router.delete('/:id', isJwtValid, deleteUser);


module.exports = router;