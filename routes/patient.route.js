const { Router } = require('express');
const { getPatient, createPatient, updatePatient, deletePatient } = require("../controllers/patient.controller")

const router = Router();
// Route => Patients
router.get('/', getPatient );
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);


module.exports = router;