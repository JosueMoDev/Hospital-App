import { Request, Response } from "express";
import { Appointment, Clinic, User } from "../models";
import { JWTGenerated } from "../helpers/JWT";

export const getAppointments = async (req: Request, resp: Response) => {
  try {
    const [appointments, total] = await Promise.all([
      Appointment.find().populate("patient", "id"),
      Appointment.countDocuments(),
    ]);

    return resp.status(200).json({
      ok: true,
      message: "Getting appointments ....",
      appointments,
      total,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: `Unexpected error, mail to jonasjosuemoralese@gmail.com to talk about it`,
    });
  }
};

export const createAppointment = async (req: Request, resp: Response) => {
  const { clinic, doctor } = req.body;
  try {
    const isClinicAvailable = await Clinic.findById(clinic);
    if (!isClinicAvailable) {
      return resp.status(400).json({
        ok: false,
        message: "This clinic is not available to make an appointment",
      });
    }
    const isDoctorAvailable = await User.findById(doctor);
    if (!isDoctorAvailable) {
      return resp.status(400).json({
        ok: false,
        message: "This Doctor is not available to make an appointment",
      });
    }

    const appointment = new Appointment(req.body);
    appointment.doctor_info = `${isDoctorAvailable.name} ${isDoctorAvailable.lastname}`;
    appointment.clinic_info = `${isClinicAvailable.name} - ${isClinicAvailable.province}/${isClinicAvailable.city}`;
    await appointment.save();

    const token = await JWTGenerated(appointment.createdby.toString());
    return resp.status(200).json({
      ok: true,
      message: "Appointment has been created successfully",
      appointment,
      token,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk about it",
    });
  }
};

export const updateAppointment = async (req: Request, resp: Response) => {
  const appointment = req.params.id;

  try {
    const { start, end, clinic, doctor, ...fields } = req.body;
    const currentAppointment = await Appointment.findById(appointment);
    const currentClinic = await Clinic.findById(clinic);
    const currentDoctor = await User.findById(doctor);

    if (!currentAppointment) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any Appointment`,
      });
    }
    if (!currentClinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find clinic`,
      });
    }
    if (!currentDoctor || currentDoctor.rol !== "doctor") {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find Doctor`,
      });
    }

    fields.start = start;
    fields.end = end;
    fields.clinic = clinic;
    fields.clinic_info = `${currentClinic.name} - ${currentClinic.province}/${currentClinic.city}`;
    fields.doctor = doctor;
    fields.doctor_info = `${currentDoctor.name} ${currentDoctor.lastname}`;

    await Appointment.findByIdAndUpdate(appointment, fields, { new: true });

    return resp.status(200).json({
      ok: true,
      message: "Appointment has been updated",
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk about it",
    });
  }
};

export const deleteAppointment = async (req: Request, resp: Response) => {
  const appointment = req.params.id;
  const user_logged_id = req.query.user;

  try {
    const appointmentToDelete = await Appointment.findById(appointment);
    const userLogged = await User.findById(user_logged_id);
    if (!appointmentToDelete) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any appointment in the database`,
      });
    }

    if (userLogged?.rol === "doctor") {
      return resp.status(403).json({
        ok: false,
        message: `Forbidden action`,
      });
    }

    await Appointment.findByIdAndDelete(appointment);

    return resp.status(200).json({
      ok: true,
      message: `Appointment has been deleted`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk about it",
    });
  }
};

export const getAllClinicsAvailableToMakeAnAppointment = async (
  req: Request,
  resp: Response
) => {
  try {
    const clinics = await Clinic.find({ hasAssignments: true });
    return resp.status(200).json({
      ok: true,
      message: "Getting clinics ....",
      clinics,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: `Unexpected error, mail to jonasjosuemoralese@gmail.com to talk about it`,
    });
  }
};
