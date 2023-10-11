import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { JWTGenerated } from "../helpers/JWT.helpers";
import { Patient, User } from "../models";

export const getPatient = async (req: Request, resp: Response) => {
  const document_number = req.params.document_number as string;
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
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const getPatients = async (req: Request, resp: Response) => {
  try {
    const pagination = Number(req.query.pagination) || 0;
    const [patients, total] = await Promise.all([
      Patient.find().skip(pagination).limit(5),
      Patient.countDocuments(),
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
      message: "We couldn't get any patient at the database",
    });
  }
};

export const createPatient = async (req: Request, resp: Response) => {
  const { email, document_number, document_type, email_provider, rol } =
    req.body;
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

    const isPreviouslyRegister = await Patient.findOne({ document_number });
    if (isPreviouslyRegister) {
      return resp.status(400).json({
        ok: false,
        message: `There is somebody already enrolled with document ${document_type}:${document_number}`,
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
      message: "Patient has been created successfully",
      patient,
      token,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const updatePatient = async (req: Request, resp: Response) => {
  const id = req.params.id as string;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at the database",
      });
    }

    const { email, document_number, email_name, rol, ...fields } = req.body;
    if (patient.email !== email) {
      const isEmailTaken = await Patient.findOne({ email });
      if (isEmailTaken) {
        return resp.status(400).json({
          ok: false,
          message: "This email has been already taken",
        });
      }
      fields.email = email;
    }
    if (patient.document_number !== document_number) {
      const isDocumentExistent = await User.findOne({ email });
      if (isDocumentExistent) {
        return resp.status(400).json({
          ok: false,
          message: `There is somebody already enrolled with document: ${patient.document_number}`,
        });
      }
      fields.document_number = document_number;
    }

    const patientUpdated = await Patient.findByIdAndUpdate(id, fields, {
      new: true,
    });

    return resp.status(200).json({
      ok: true,
      message: "Patient has been updated successfully",
      patient: patientUpdated,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const deletePatient = async (req: Request, resp: Response) => {
  const patient_id = req.params.id as string;
  const user_logged_id = req.body.user_logged;
  try {
    const patient_to_delete = await Patient.findById(patient_id);
    const user_logged = await User.findById(user_logged_id);

    if (!patient_to_delete) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at the database",
      });
    }

    if (user_logged?.rol === "doctor" || user_logged?.rol === "patient") {
      return resp.status(404).json({
        ok: false,
        message: "Forbidden action",
      });
    }

    patient_to_delete.validationState = !patient_to_delete.validationState;
    const user_updated = await Patient.findByIdAndUpdate(
      patient_id,
      patient_to_delete,
      { new: true }
    );

    return resp.status(200).json({
      ok: true,
      message: `Patient has been ${
        user_updated?.validationState ? "Enabled" : "Disabled"
      }`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const confirmPatientPassword = async (req: Request, resp: Response) => {
  const id = req.params.id as string;
  const oldPassword = req.body.oldPassword;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at the database",
      });
    }

    const isPasswordValid = bcrypt.compareSync(oldPassword, patient.password);

    if (!isPasswordValid) {
      return resp.status(400).json({
        ok: false,
        message: "Incorrect Password",
      });
    }

    return resp.status(200).json({ ok: true });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const changePatientPassword = async (req: Request, resp: Response) => {
  const id = req.params.id as string;
  const newPassword = req.body.newPassword;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at the database",
      });
    }

    const encrypting = bcrypt.genSaltSync();
    patient.password = bcrypt.hashSync(newPassword, encrypting);
    await Patient.findByIdAndUpdate(id, patient, { new: true });
    return resp.status(200).json({
      ok: true,
      message: "Password has been changed successfully",
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};
