const { Router } = require('express');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller')
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => Hospitals
router.get('/',isJwtValid, getDoctors);
router.post('/', [
    isJwtValid,
    check('name', `doctor's name is a require field`).not().isEmpty(),
    check('hospital', `you must pick up a hospital`).isMongoId(),
    fieldsValidation
], createDoctor);
router.put('/:id', [
    isJwtValid,
    check('name', `doctor's name is a require field`).not().isEmpty(),
    fieldsValidation
], updateDoctor);
router.delete('/:id', isJwtValid, deleteDoctor);


module.exports = router;