const { Router } = require('express');
const { check } = require('express-validator');
const {
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getASingleMedicalRecord,
} = require("../controllers/patient-record.controller");
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');

const router = Router();

router.get('/', isJwtValid, getMedicalRecords);

router.get('/record/:id', isJwtValid, getASingleMedicalRecord);

router.post('/', [
    isJwtValid,
    check('doctor', 'doctor is a required field').not().isEmpty(),
    check('patient', 'patient is a required field').not().isEmpty(),
    check('date', 'date is a required field').not().isEmpty(),
    check('document_number', 'document number is a required field').not().isEmpty(),
    check('title', 'title is a required field').not().isEmpty(),
    check('body', 'body is a required field').not().isEmpty(),
    fieldsValidation
], createMedicalRecord);

router.put('/:id', [
    isJwtValid,
    check('title', 'title is a required field').not().isEmpty(),
    check('body', 'body is a required field').not().isEmpty(),
    check('edited_by', 'edited by is a required field').not().isEmpty(),
    check('last_edited_date', 'last time edited is a required field').not().isEmpty(),
    fieldsValidation,
], updateMedicalRecord);

router.delete('/:id', deleteMedicalRecord);

module.exports = router;