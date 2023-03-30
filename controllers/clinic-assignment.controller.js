const { response } = require("express");
const ClinicAssignments = require("../models/clinic_assignment.model");
const Clinic = require("../models/clinic.model");
const User = require("../models/user.model");

const getAllDoctorsAssigned = async (req, resp = response) => {
  const clinic_id = req.query.clinic;
  const _pagination = req.query.pagination
  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message:`Sorry! we couldn't found this clinic`
      });
    }
    const pagination = Number(_pagination) || 0;
    const [doctors_assigned, total] = await Promise.all([
      ClinicAssignments.find( { clinic: clinic_id} ).skip(pagination).limit(5).populate("doctor", "name lastname photo"),
      ClinicAssignments.count(),
    ]);
   
    const doctors = doctors_assigned.map(({doctor, _id}) => ({
      doctor_id: doctor._id,
      name: doctor.name,
      lastname: doctor.lastname,
      photo: doctor.photo,
      reference: _id
    }));
   
    return resp.status(200).json({
      ok: true,
      message: "Getting clinics ....",
      doctors_assigned:doctors,
      total
    });

  } catch (error) {
    resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};
const getAllDoctorsAvailableToBeAssigned = async (req, resp = response) => {
  
  try {
    const doctors_available = await User.find({ rol: "doctor", isAssigned: false, validationState: true });

    return resp.status(200).json({
      ok: true,
      message: "Getting Doctors ....",
      doctors_available,
    });

  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: `Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it`,
    });
  }
};
const assingDoctorsToClinic = async (req, resp = response) => {
  const clinic_id = req.params.id;
  const doctors = req.body.doctors_assigned;
 
  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any clinic`,
      });
    }
    const doctors_db = await User.find({ _id: doctors.selectedStaff, isAssigned: false }, "_id")
    if (!doctors_db) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any doctor`,
      });
    }
    const doctors_to_assign = doctors_db.map(doctor => ({
      doctor: doctor,
      clinic:clinic_id 
    }))
    const saveDoctors = await ClinicAssignments.insertMany( doctors_to_assign );
    const updatedDoctors = await User.updateMany(
      { _id: { $in: doctors_db} },
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
    const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, { new: true });

    return resp.status(200).json({
      ok: true,
      message: "Doctors has been assigned",
      clinic: clinicUpdated
    });

  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const removeAllDoctorsAssignedToClinic = async (req, resp = response) => {
  const clinic_id = req.params.id;
 
  try {
    const clinic = await Clinic.findById(clinic_id);
    if (!clinic) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any clinic`,
      });
    }
    const clinicAssigments = await ClinicAssignments.find({ clinic: clinic_id }, ["_id", "doctor"]);
    const doctors = clinicAssigments.map(assignment => assignment.doctor);
    const assignments = clinicAssigments.map(assignment => assignment._id);
    await User.updateMany(
      { _id: { $in: doctors } },
      { $set: { isAssigned: false } },
      { multi: true }
    );
    
    await ClinicAssignments.deleteMany({ _id: { $in: assignments } })
    
    clinic.hasAssignments = false;
    const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, { new: true });
    return resp.status(200).json({
      ok: true,
      message: "Doctors have been removed",
      clinic: clinicUpdated
    });

  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const removeADoctorAssignedToClinic = async (req, resp = response) => {
  const reference = req.params.id;
  const doctor = req.query.doctor;
  const clinic_id = req.query.clinic
  
  try {

    const assignment_deleted = await ClinicAssignments.findByIdAndDelete(reference);
    if (!assignment_deleted) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any doctor assigned to clinic`,
      });
    }
  
    await User.findByIdAndUpdate({ _id: doctor }, { $set: { isAssigned: false } }, { new: true });
    const hasMoreAssignments = await ClinicAssignments.find({ clinic: clinic_id });
    if (!hasMoreAssignments.length) {
      await Clinic.findByIdAndUpdate({ _id: clinic_id }, { $set: { hasAssignments: false } }, { new: true });
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
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

module.exports = {
  getAllDoctorsAssigned,
  getAllDoctorsAvailableToBeAssigned,
  assingDoctorsToClinic,
  removeAllDoctorsAssignedToClinic,
  removeADoctorAssignedToClinic,
};
