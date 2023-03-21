const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getAppointments, createAppointment, updateAppointment, deleteAppointement } = require('../controllers/appointment.controller');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');

// Route => Hospitals
router.get('/', isJwtValid, getAppointments);
router.post('/', [
    isJwtValid,
    check('date', 'date is a mandatory field').not().isEmpty(),
    check('clinic', 'clinic is a mandatory field').not().isEmpty(),
    check('doctor', 'doctor is a mandatory field').not().isEmpty(),
    check('patient', 'patient is a mandatory field').not().isEmpty(),
    check('createdby', 'user is a mandatory field').not().isEmpty(),       
    fieldsValidation,
], createAppointment);
router.put('/:id', isJwtValid, updateAppointment);
router.delete('/:id', isJwtValid, deleteAppointement);


module.exports = router;