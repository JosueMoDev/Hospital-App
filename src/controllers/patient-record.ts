import { Request, Response } from 'express';
import { Patient, MedicalRecords } from '../models';

export const getMedicalRecords = async (req: Request, resp: Response) => {
  const document_number = req.query.document_number as string;
  const _pagination = req.query.pagination;

  try {
    const patient = await Patient.findOne({ document_number: document_number });
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: 'Unknown patient at database',
      });
    }
    const pagination = Number(_pagination) || 0;
    const [records, total] = await Promise.all([
      MedicalRecords.find({ patient: patient.id })
        .skip(pagination)
        .limit(5)
        .populate('doctor', 'name'),
      MedicalRecords.countDocuments(),
    ]);

    return resp.json({
      ok: true,
      message: 'Getting medical records ....',
      records,
      total,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: 'Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out',
    });
  }
};

export const getASingleMedicalRecord = async (req: Request, resp: Response) => {
  const record_id = req.params.id as string;
  try {
    const record = await MedicalRecords.findById(record_id).populate('doctor', 'name');
    if (!record) {
      return resp.status(404).json({
        ok: false,
        message: "We couldn't find any medical record at database",
      });
    }

    return resp.status(200).json({
      ok: true,
      message: 'Getting Medical records ....',
      record,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      message: 'Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out',
    });
  }
};

export const createMedicalRecord = async (req: Request, resp: Response) => {
  const patient_id = req.body.patient as string;
  const patient_document_number = req.body.document_number as string;

  try {
    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return resp.status(404).json({
        ok: false,
        message: 'Unknown patient at database',
      });
    }

    if (patient.document_number !== patient_document_number) {
      return resp.status(404).json({
        ok: false,
        message: 'Forbidden Action',
      });
    }

    const patient_record = new MedicalRecords(req.body);
    await patient_record.save();

    return resp.status(200).json({
      ok: true,
      message: 'Patient record has been created successfully',
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: 'Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it',
    });
  }
};

export const updateMedicalRecord = async (req: Request, resp: Response) => {
  const medical_record_id = req.params.id as string;
  const { title, body, edited_by, last_edited_date } = req.body;
  try {
    const medical_record = await MedicalRecords.findById(medical_record_id);
    if (!medical_record) {
      return resp.status(404).json({
        ok: false,
        message: "We couldn't find any medical record",
      });
    }
    medical_record.title = title;
    medical_record.body = body;
    medical_record.edited_by = edited_by;
    medical_record.last_edited_date = last_edited_date;

    await MedicalRecords.findByIdAndUpdate(medical_record_id, medical_record, { new: true });

    return resp.status(200).json({
      ok: true,
      message: 'Medical record has been updated successfully',
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: 'Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it',
    });
  }
};

export const deleteMedicalRecord = async (req: Request, resp: Response) => {
  const patient_id = req.params.id as string;
  try {
    resp.status(200).json({
      ok: true,
      message: `Patient ${patient_id} deleted`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: 'Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it',
    });
  }
};


