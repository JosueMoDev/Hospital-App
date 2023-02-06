const { Router } = require('express');
const { getPatientRecord, createPatientRecord, updatePatientRecord, deletePatientRecord } = require("../controllers/patient-record.controller")

const router = Router();
// Route => Hospitals
router.get('/', getPatientRecord);
router.post('/', createPatientRecord);
router.put('/:id', updatePatientRecord);
router.delete('/:id', deletePatientRecord);


module.exports = router;