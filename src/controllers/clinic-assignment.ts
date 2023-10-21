import { Request, Response } from "express";
import { Clinic, ClinicAssignment, User} from '../models'

export const getAllDoctorsAssigned = async (req: Request, resp: Response) => {
  const clinic_id = req.query.clinic as string;
  const _pagination = req.query.pagination as string;
  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `Sorry! we couldn't find this clinic`,
      });
    }
    const pagination = Number(_pagination) || 0;
    const [doctors_assigned, total] = await Promise.all([
      ClinicAssignment.find({ clinic: clinic_id })
        .skip(pagination)
        .limit(5)
        .populate("doctor", "name lastname photo"),
      ClinicAssignment.find({ clinic: clinic_id }).countDocuments(),
    ]);

    const doctors = doctors_assigned.map(({ doctor, _id }: any) => ({
      doctor_id: doctor._id,
      name: doctor.name,
      lastname: doctor.lastname,
      photo: doctor.photo,
      reference: _id,
    }));

    return resp.status(200).json({
      ok: true,
      message: "Getting clinics ....",
      doctors_assigned: doctors,
      total,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};

export const getDoctorsAvailableToMakeAnAppointment = async (
  req: Request,
  resp: Response
) => {
  const clinic_id = req.params.id as string;

  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `Sorry! we couldn't find this clinic`,
      });
    }

    const doctors = await ClinicAssignment.find({
      clinic: clinic_id,
    }).populate({
      path: "doctor",
      match: { validationState: true },
      select: "name lastname photo",
    });
    const doctors_whioutDisabled = doctors.filter(
      (assignment) => assignment.doctor !== null
    );
    const doctors_available = doctors_whioutDisabled.map(({ doctor }: any) => ({
      id: doctor._id,
      name: doctor.name,
      lastname: doctor.lastname,
      photo: doctor.photo,
    }));
    return resp.status(200).json({
      ok: true,
      message: "Getting doctors ....",
      doctors: doctors_available,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};

export const getAllDoctorsAvailableToBeAssigned = async (
  req: Request,
  resp: Response
) => {
  try {
    const doctors_available = await User.find({
      rol: "doctor",
      isAssigned: false,
      validationState: true,
    });

    return resp.status(200).json({
      ok: true,
      message: "Getting Doctors ....",
      doctors_available,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};

export const assingDoctorsToClinic = async (req: Request, resp: Response) => {
  const clinic_id = req.params.id as string;
  const doctors = req.body.doctors_assigned as { selectedStaff: string[] };

  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any clinic`,
      });
    }
    const doctors_db = await User.find(
      { _id: { $in: doctors.selectedStaff }, isAssigned: false },
      "_id"
    );
    if (!doctors_db) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any doctor`,
      });
    }
    const doctors_to_assign = doctors_db.map((doctor) => ({
      doctor: doctor,
      clinic: clinic_id,
    }));
    const saveDoctors = await ClinicAssignment.insertMany(doctors_to_assign);
    const updatedDoctors = await User.updateMany(
      { _id: { $in: doctors_db } },
      { $set: { isAssigned: true } },
      { multi: true }
    );

    if (!saveDoctors) {
      return resp.status(404).json({
        ok: false,
        message: "Something wrong",
      });
    }

    if (!updatedDoctors.acknowledged) {
      return resp.status(404).json({
        ok: false,
        message: "Something wrong",
      });
    }
    clinic.hasAssignments = true;
    const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, {
      new: true,
    });

    return resp.status(200).json({
      ok: true,
      message: "Doctors have been assigned",
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

export const removeAllDoctorsAssignedToClinic = async (
  req: Request,
  resp: Response
) => {
  const clinic_id = req.params.id as string;

  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any clinic`,
      });
    }
    const clinicAssigments = await ClinicAssignment.find(
      { clinic: clinic_id },
      ["_id", "doctor"]
    );
    const doctors = clinicAssigments.map((assignment) => assignment.doctor);
    const assignments = clinicAssigments.map((assignment) => assignment._id);
    await User.updateMany(
      { _id: { $in: doctors } },
      { $set: { isAssigned: false } },
      { multi: true }
    );

    await ClinicAssignment.deleteMany({ _id: { $in: assignments } });

    clinic.hasAssignments = false;
    const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, {
      new: true,
    });
    return resp.status(200).json({
      ok: true,
      message: "Doctors have been removed",
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

export const removeADoctorAssignedToClinic = async (req: Request, resp: Response) => {
  const reference = req.params.id as string;
  const doctor = req.query.doctor as string;
  const clinic_id = req.query.clinic as string;

  try {
    const assignment_deleted = await ClinicAssignment.findByIdAndDelete(
      reference
    );
    if (!assignment_deleted) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any doctor assigned to the clinic`,
      });
    }

    await User.findByIdAndUpdate(
      { _id: doctor },
      { $set: { isAssigned: false } },
      { new: true }
    );
    const hasMoreAssignments = await ClinicAssignment.find({
      clinic: clinic_id,
    });
    if (!hasMoreAssignments.length) {
      await Clinic.findByIdAndUpdate(
        { _id: clinic_id },
        { $set: { hasAssignments: false } },
        { new: true }
      );
    }
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any clinic`,
      });
    }

    return resp.status(200).json({
      ok: true,
      message: "Doctor has been removed",
      clinic: clinic,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it",
    });
  }
};
