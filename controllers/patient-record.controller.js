const { response } = require('express');
const Patient = require('../models/patient.model');
const PatientRecord = require('../models/medical_record.model');

const getMedicalRecords = async (req, resp = response) => { 
    const document_number = req.query.document_number;
    const _pagination = req.query.pagination;
    
    try {
        const patient = await Patient.findOne({ document_number: document_number });
        if (!patient) { 
            return resp.status(404).json({
                ok: false,
                message: 'unknown patient at database'
            })
        } 
        const pagination = Number(_pagination) || 0;
        const [records, total] = await Promise.all([

            PatientRecord
                .find({ id: patient.id })
                .skip(pagination)
                .limit(5)
                .populate('doctor','name'),
            PatientRecord.count()

        ]);
    
        return resp.json({
            ok: true,
            message:'Getting Patients records ....',
            records,
            total
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Something was wrong'
        });
    }

}

const getASingleMedicalRecord = async (req, resp = response) => { 
    const record_id = req.params.id
    try {
        const record = await PatientRecord.findById(record_id).populate('doctor', 'name')
        if (!record) { 
            return resp.status(404).json({
                ok: false,
                message: 'We couldnt found any record at database'
            })
        } 
       
        return resp.json({
            ok: true,
            message:'Getting Patients records ....',
            record,
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Something was wrong'
        });
    }

}



const createMedicalRecord = async (req, resp = response) => { 

    const patient_id = req.body.patient;
    const patient_document_number = req.body.document_number
   
    try {
        //Database users
        const patient = await Patient.findById(patient_id);
        if (!patient) { 
            return resp.status(404).json({
                ok: false,
                message: 'unknown patient at database'
            })
        } 
    
        if (patient.document_number !== patient_document_number) { 
            return resp.status(404).json({
                ok: false,
                message: 'Forbidden Action'
            })
        } 

        const patient_record = new PatientRecord(req.body);
        await patient_record.save();

        return resp.status(200).json({
            ok: true,
            message:` Patient record  has been created success`
        })
        
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            message:'unexpected error'
        })
    }
}

const updateMedicalRecord = async (req, resp = response) => { 
    const medical_record_id = req.params.id;
    const {title, body, edited_by, last_edited_date} = req.body
    try {
        const medical_record = await PatientRecord.findById(medical_record_id);
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
        
        await PatientRecord.findByIdAndUpdate(medical_record_id, medical_record, { new: true });

        return resp.status(200).json({
            ok: true,
            message: `Medical record has been updated success`,
        });

    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deleteMedicalRecord = async (req, resp = response) => { 
        
        const patient_id = req.params.id;
        try {
            resp.status(200).json({
                ok: true,
                message: ` Patient ${patient_id} deleted`, 
            });

        } catch (error) {  
            console.log(error)
            resp.status(500).json({
                ok: false,
                message:'something was wrong'
            });
            
        }
    }
        
module.exports = { getMedicalRecords, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord, getASingleMedicalRecord }