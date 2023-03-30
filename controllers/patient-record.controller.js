const { response } = require("express");
const Patient = require("../models/patient.model");
const MedicalRecords = require("../models/medical_record.model");

const getMedicalRecords = async (req, resp = response) => {
  const document_number = req.query.document_number;
  const _pagination = req.query.pagination;

  try {
    const patient = await Patient.findOne({ document_number: document_number });
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at database",
      });
    }
    const pagination = Number(_pagination) || 0;
    const [records, total] = await Promise.all([
      MedicalRecords.find({ id: patient.id })
        .skip(pagination)
        .limit(5)
        .populate("doctor", "name"),
      MedicalRecords.count(),
    ]);

    return resp.json({
      ok: true,
      message: "Getting medical records ....",
      records,
      total,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const getASingleMedicalRecord = async (req, resp = response) => {
  const record_id = req.params.id;
  try {
    const record = await MedicalRecords.findById(record_id).populate("doctor", "name");
    if (!record) {
      return resp.status(404).json({
        ok: false,
        message: "We couldnt found any medical record at database",
      });
    }

    return resp.status(200).json({
      ok: true,
      message: "Getting Medical records ....",
      record,
    });
      
  } catch (error) {
    resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const createMedicalRecord = async (req, resp = response) => {
  const patient_id = req.body.patient;
  const patient_document_number = req.body.document_number;

  try {
    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: "Unknown patient at database",
      });
    }

    if (patient.document_number !== patient_document_number) {
      return resp.status(404).json({
        ok: false,
        message: "Forbidden Action",
      });
    }

    const patient_record = new MedicalRecords(req.body);
    await patient_record.save();

    return resp.status(200).json({
      ok: true,
      message: ` Patient record  has been created success`,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const updateMedicalRecord = async (req, resp = response) => {
  const medical_record_id = req.params.id;
  const { title, body, edited_by, last_edited_date } = req.body;
  try {
    const medical_record = await MedicalRecords.findById(medical_record_id);
    if (!medical_record) {
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any medical record`,
      });
    }
    medical_record.title = title;
    medical_record.body = body;
    medical_record.edited_by = edited_by;
    medical_record.last_edited_date = last_edited_date;

    await MedicalRecords.findByIdAndUpdate(medical_record_id, medical_record, { new: true });

    return resp.status(200).json({
      ok: true,
      message: `Medical record has been updated success`,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const deleteMedicalRecord = async (req, resp = response) => {
  const patient_id = req.params.id;
  try {
    resp.status(200).json({
      ok: true,
      message: ` Patient ${patient_id} deleted`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

module.exports = {
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getASingleMedicalRecord,
};
