const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');


const router = Router();
// Route => Auth
router.post('/', [
    check('email', 'Email is a required field').not().isEmpty().isEmail(),
    check('password','password is a required field').not().isEmpty(),
    fieldsValidation
],login );

module.exports = router;