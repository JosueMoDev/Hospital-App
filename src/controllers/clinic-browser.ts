import { Request, Response } from "express";
import { User, Patient, Appointment, Clinic } from "../models";

export const clinicBrowser = async (req: Request, resp: Response) => {
  const query = req.params.query as string;
  const regexpresion = new RegExp(query, "i");
  try {
    const [users, patients, clinics, appointments] = await Promise.all([
      User.find({ name: regexpresion }),
      Patient.find({ name: regexpresion }),
      Clinic.find({ name: regexpresion }),
      Appointment.find({ title: regexpresion }).populate(
        "patient",
        "photo name lastname phone"
      ),
    ]);

    const data = [...users, ...patients, ...clinics, ...appointments];

    return resp.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      message: `Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it`,
    });
  }
};
