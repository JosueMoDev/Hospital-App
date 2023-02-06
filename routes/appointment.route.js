const { Router } = require('express');
const { getAppointments, createAppointment, updateAppointment, deleteAppointement } = require('../controllers/appointment.controller');
const router = Router();
// Route => Hospitals
router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointement);


module.exports = router;