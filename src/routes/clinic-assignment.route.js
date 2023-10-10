const { Router } = require("express");
const {
  getAllDoctorsAssigned,
  getAllDoctorsAvailableToBeAssigned,
  assingDoctorsToClinic,
  removeAllDoctorsAssignedToClinic,
  removeADoctorAssignedToClinic,
  getDoctorsAvailableToMakeAnAppointment
} = require("../controllers/clinic-assignment.controller");
const { check } = require("express-validator");
const {
  fieldsValidation,
} = require("../middlewares/fields-validations.middleware");
const { isJwtValid } = require("../middlewares/jwt-validation.middleware");

const router = Router();

router.get("/all-assigned", [isJwtValid], getAllDoctorsAssigned );

router.get("/all-available", isJwtValid, getAllDoctorsAvailableToBeAssigned);

router.get("/doctors-available/:id", isJwtValid, getDoctorsAvailableToMakeAnAppointment);

router.post("/:id",[
    isJwtValid,
    check("doctors_assigned", `Doctors is a required field`).not().isEmpty(),
    fieldsValidation,
  ],assingDoctorsToClinic);

router.delete("/remove-all/:id", isJwtValid, removeAllDoctorsAssignedToClinic);

router.delete("/remove-one/:id", isJwtValid, removeADoctorAssignedToClinic);

module.exports = router;
