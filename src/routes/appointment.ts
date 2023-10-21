import { Router } from 'express';
import { check } from 'express-validator';
import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAllClinicsAvailableToMakeAnAppointment
} from "../controllers";
import { isJwtValid, fieldsValidation } from '../middlewares';


const router = Router();

router.get('/', isJwtValid, getAppointments);

router.get('/clinic-available', isJwtValid, getAllClinicsAvailableToMakeAnAppointment);

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

router.delete('/:id', [isJwtValid], deleteAppointment);

export default router;
