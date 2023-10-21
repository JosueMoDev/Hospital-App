import { Router } from "express";
import {
  getAllDoctorsAssigned,
  getAllDoctorsAvailableToBeAssigned,
  assingDoctorsToClinic,
  removeAllDoctorsAssignedToClinic,
  removeADoctorAssignedToClinic,
  getDoctorsAvailableToMakeAnAppointment
} from "../controllers";
import { check } from "express-validator";
import { isJwtValid, fieldsValidation } from "../middlewares";

const router = Router();

router.get("/all-assigned", [isJwtValid], getAllDoctorsAssigned);

router.get("/all-available", isJwtValid, getAllDoctorsAvailableToBeAssigned);

router.get("/doctors-available/:id", isJwtValid, getDoctorsAvailableToMakeAnAppointment);

router.post("/:id", [
  isJwtValid,
  check("doctors_assigned", `Doctors is a required field`).not().isEmpty(),
  fieldsValidation,
], assingDoctorsToClinic);

router.delete("/remove-all/:id", isJwtValid, removeAllDoctorsAssignedToClinic);

router.delete("/remove-one/:id", isJwtValid, removeADoctorAssignedToClinic);

export default router;
