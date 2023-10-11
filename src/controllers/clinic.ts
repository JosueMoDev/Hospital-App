import { Request, Response } from "express";
import { Clinic, User } from "../models"; 
export const getClinics = async (req: Request, resp: Response) => {
  try {
    const pagination = Number(req.query.pagination) || 0;
    const [clinics, total] = await Promise.all([
      Clinic.find().skip(pagination).limit(5).populate("user", "name"),
      Clinic.countDocuments(),
    ]);
    return resp.status(200).json({
      ok: true,
      message: "Getting clinics ....",
      clinics,
      total,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: `Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it`,
    });
  }
};

export const createClinic = async (req: Request, resp: Response) => {
  const { register_number, user_id, user_rol, address } = req.body as {
    register_number: string;
    user_id: string;
    user_rol: string;
    address: {
      province: string;
      city: string;
      street: string;
    };
  };

  try {
    const isPreviuslyRegister = await Clinic.findOne({ register_number });
    if (user_rol !== "admin") {
      return resp.status(400).json({
        ok: false,
        message: `Sorry Forbidden Action`,
      });
    }
    if (isPreviuslyRegister) {
      return resp.status(400).json({
        ok: false,
        message: `One clinic has been already enrolled with this register number before :${register_number}`,
      });
    }
    const clinic = new Clinic(req.body);
    clinic.country = "El Salvador";
    clinic.province = address.province;
    clinic.city = address.city;
    clinic.street = address.street;
    clinic.id = user_id;
    clinic.photo = "";
    await clinic.save();

    return resp.status(200).json({
      ok: true,
      message: "Clinic has been created successfully",
      clinic,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};

export const updateClinic = async (req: Request, resp: Response) => {
  const id = req.id;
  const clinic_id = req.params.id as string;

  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any clinic`,
      });
    }

    const { name, user, register_number, ...fields } = req.body;
    if (clinic.name !== name) {
      const clinicExist = await Clinic.findOne({ name });
      if (clinicExist) {
        return resp.status(400).json({
          ok: false,
          message: "One Clinic has already enrolled with this name",
        });
      }
      fields.name = name;
    }
    if (clinic.register_number !== register_number) {
      const clinicExist = await Clinic.findOne({ register_number });
      if (clinicExist) {
        return resp.status(400).json({
          ok: false,
          message: `One Clinic has already enrolled with number: ${register_number}`,
        });
      }
      fields.register_number = register_number;
    }
    fields.user = id;
    const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, fields, {
      new: true,
    }).populate("user", "name");

    return resp.status(200).json({
      ok: true,
      message: "Clinic has been updated",
      clinic: clinicUpdated,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};

export const deleteClinic = async (req: Request, resp: Response) => {
  const clinic_id = req.params.id as string;
  const user_logged_id = req.body.user_logged as string;
  try {
    const clinic_to_delete = await Clinic.findById(clinic_id);
    const user_logged = await User.findById(user_logged_id);

    if (!clinic_to_delete) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown clinic  at the database`,
      });
    }

    if (user_logged?.rol !== "admin") {
      return resp.status(404).json({
        ok: false,
        message: `Forbidden action`,
      });
    }

    clinic_to_delete.validationState = !clinic_to_delete.validationState;
    const clinic_updated = await Clinic.findByIdAndUpdate(
      clinic_id,
      clinic_to_delete,
      { new: true }
    );

    return resp.status(200).json({
      ok: true,
      message: `Clinic has been ${
        clinic_updated?.validationState ? "Enabled" : "Disabled"
      }`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};
