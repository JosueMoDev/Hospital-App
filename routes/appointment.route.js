const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointement
} = require("../controllers/appointment.controller");
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');

router.get('/', isJwtValid, getAppointments);

router.post('/', [
    isJwtValid,
    check('start', 'date start is a required field').not().isEmpty(),
    check('end', 'date end is a required field').not().isEmpty(),
    check('title', 'date title is a required field').not().isEmpty(),
    check('clinic', 'clinic is a required field').not().isEmpty(),
    check('doctor', 'doctor is a required field').not().isEmpty(),
    check('patient', 'patient is a required field').not().isEmpty(),
    check('createdby', 'user is a required field').not().isEmpty(),
    fieldsValidation,
], createAppointment);

router.put('/:id', [
    isJwtValid,
    check('start', 'date start is a required field').not().isEmpty(),
    check('end', 'date end is a required field').not().isEmpty(),
    check('clinic', 'clinic is a required field').not().isEmpty(),
    check('doctor', 'doctor is a required field').not().isEmpty(),
], updateAppointment);

router.delete('/:id', [isJwtValid], deleteAppointement);

module.exports = router;