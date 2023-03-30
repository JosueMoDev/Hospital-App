const { response } = require("express");
const bcrypt = require("bcryptjs");

const { JWTGenerated } = require("../helpers/JWT.helpers");
const Patient = require("../models/patient.model");
const User = require("../models/user.model");

const getPatient = async (req, resp = response) => {
  const document_number = req.params.document_number;
  try {
    const patient = await Patient.findOne({ document_number });
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "unknown patient at database",
      });
    }

    return resp.json({
      ok: true,
      patient,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:"Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const getPatients = async (req, resp = response) => {
  try {
    const pagination = Number(req.query.pagination) || 0;
    const [patients, total] = await Promise.all([
      Patient.find().skip(pagination).limit(5),
      Patient.count(),
    ]);

    return resp.json({
      ok: true,
      message: "Getting Patients ....",
      patients,
      total,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: `We cound't get any patient at data base`,
    });
  }
};

const createPatient = async (req, resp) => {
  const { email, document_number, document_type, email_provider, rol } = req.body;
  try {
    if (rol !== "patient") {
      return resp.status(403).json({
        ok: false,
        message: "Forbidden action",
      });
    }
    const isEmailTaken = await Patient.findOne({ email });
    if (isEmailTaken) {
      return resp.status(400).json({
        ok: false,
        message: "This email has been already taken",
      });
    }

    const isPreviuslyRegister = await Patient.findOne({ document_number });
    if (isPreviuslyRegister) {
      return resp.status(400).json({
        ok: false,
        message: `There is somebody already enrrolled with document ${document_type}:${document_number}`,
      });
    }
    const patient = new Patient(req.body);
    patient.email_provider = email_provider;
    const password = (patient.password ||= "the clinic");
    const encrypting = bcrypt.genSaltSync();
    patient.password = bcrypt.hashSync(password, encrypting);
    patient.rol = "patient";
    patient.photo = "";
    await patient.save();

    const token = await JWTGenerated(patient.id);

    return resp.status(200).json({
      ok: true,
      message: "Patient has been created success",
      patient,
      token,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const updatePatient = async (req, resp = response) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at database",
      });
    }

    const { email, document_number, email_name, rol, ...fields } = req.body;
    if (patient.email !== email) {
      const isEmailTaken = await Patient.findOne({ email });
      if (isEmailTaken) {
        return resp.status(400).json({
          ok: false,
          message: "This mail has been already taken",
        });
      }
      fields.email = email;
    }
    if (patient.document_number !== document_number) {
      const isDocumentExitent = await User.findOne({ email });
      if (isDocumentExitent) {
        return resp.status(400).json({
          ok: false,
          message: `There is somebody already enrrolled with document: ${patient.document_number}`,
        });
      }
      fields.document_number = document_number;
    }

    const patientUpdated = await Patient.findByIdAndUpdate(id, fields, {
      new: true,
    });

    return resp.status(200).json({
      ok: true,
      message: `Patient has been updated success`,
      patient: patientUpdated,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:"Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const deletePatient = async (req, resp = response) => {
  const patient_id = req.params.id;
  const user_logged_id = req.body.user_logged;
  try {
    const patient_to_delete = await Patient.findById(patient_id);
    const user_logged = await User.findById(user_logged_id);

    if (!patient_to_delete) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown patient  at database`,
      });
    }

    if (user_logged.rol === "doctor" || user_logged.rol === "patient") {
      return resp.status(404).json({
        ok: false,
        message: `Forbidden action`,
      });
    }

    patient_to_delete.validationState = !patient_to_delete.validationState;
    const user_updated = await Patient.findByIdAndUpdate(patient_id, patient_to_delete, { new: true });

    return resp.status(200).json({
      ok: true,
      message: `Patient has been ${user_updated.validationState ? "Anabled" : "Disabled"}`,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:"Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const confirmatePassword = async (req, resp) => {
  const id = req.params.id;
  const oldPassoword = req.body.oldPassword;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown patient at database`,
      });
    }

    const validatePassword = bcrypt.compareSync(oldPassoword, patient.password);

    if (!!validatePassword) {
      return resp.status(400).json({
        ok: false,
        message: "Incorrect Password",
      });
    }

    return resp.status(200).json({ ok: true, });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:"Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const changePassword = async (req, resp) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown patient at database`,
      });
    }

    const encrypting = bcrypt.genSaltSync();
    patient.password = bcrypt.hashSync(newPassword, encrypting);
    await Patient.findByIdAndUpdate(id, patient, { new: true });
    return resp.status(200).json({
      ok: true,
      message: "Password has been changed success",
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:"Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

module.exports = {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  confirmatePassword,
  changePassword,
};
