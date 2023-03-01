const { response } = require('express');
const bcrypt = require('bcryptjs');

const { JWTGenerated } = require('../helpers/JWT.helpers');
const Patient = require('../models/patient.model') 

const getPatient = async (req, resp = response) => { 
   
    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting All Patients ....',
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Patients'
        });
    }

}

const createPatient = async (req, resp ) => { 

    const {  email, document_number, document_type, email_provider, rol } = req.body;
    try {
        
        //  validate if one those folders are avilable on claudinary
        if (rol!=='patient') {    
            return resp.status(403).json({
                ok: false,
                message: 'forbidden action',
                
            });
        }
        const isEmailTaken = await Patient.findOne({ email });
        if (isEmailTaken) { 
            return resp.status(400).json({
                ok: false,
                message: 'This mail has already taken'
            });
        }

        const isPreviuslyRegister = await Patient.findOne({ document_number });
        if (isPreviuslyRegister) { 
            return resp.status(400).json({
                ok: false,
                message: `This patient already has an account with document ${document_type}:${document_number}`
            });
        }
        const patient = new Patient(req.body);
     // encrypt password{
        if(email_provider==='@gmail.com'){patient.google=true}
        const password = 'the clinic'
        const encrypting = bcrypt.genSaltSync();
        patient.password = bcrypt.hashSync(password, encrypting);
        patient.rol='patient'
    // here create our patients    
        await patient.save();

    
    // Generate a JWT 
        const token = await JWTGenerated(patient.id);

        resp.json({
            ok: true,
            message: 'Patient has been created success',
            patient,
            token
        });
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message: 'unexpercted error'
        });
    }

}

const updatePatient = async (req, resp = response) => { 
    const patient_id = req.params.id;

    try {
        resp.status(200).json({
            ok: true,
            message: `patient ${ patient_id } has updated success`,
        });
    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deletePatient = async (req, resp = response) => { 
        
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
        
module.exports = { getPatient, createPatient, updatePatient, deletePatient }