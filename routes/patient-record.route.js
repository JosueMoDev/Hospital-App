const { Router } = require('express');
const { check } = require('express-validator');
const { getPatientRecord, createPatientRecord, updatePatientRecord, deletePatientRecord, getASinglePatientRecord} = require("../controllers/patient-record.controller");
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();
// Route => Hospitals
router.get('/', isJwtValid, getPatientRecord);
router.get('/record/:id', isJwtValid,  getASinglePatientRecord);
router.post('/', [
    isJwtValid, 
    check('doctor', 'doctor is a required field').not().isEmpty(),
    check('patient', 'patient is a required field').not().isEmpty(),
    check('date', 'date is a required field').not().isEmpty(),
    check('document_number', 'document number is a required field').not().isEmpty(),
    check('title', 'title is a required field').not().isEmpty(),
    check('body', 'body is a required field').not().isEmpty(),
    fieldsValidation
],createPatientRecord);
router.put('/:id', updatePatientRecord);
router.delete('/:id', deletePatientRecord);


module.exports = router;