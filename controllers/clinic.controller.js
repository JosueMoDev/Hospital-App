const { response } = require('express');
const Clinic = require('../models/clinic.model');

const getClinics = async (req, resp = response) => { 
    const clinics = await Clinic.find().populate('user','name');
    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting Hospitals ....',
            hospitals: clinics
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Hospitals'
        });
    }

}

const createClinic = async (req, resp = response) => { 

    const {  register_number, user_id, user_rol, address } = req.body;

    try {
        const isPreviuslyRegister = await Clinic.findOne({ register_number });
        if (user_rol!=='admin') { 
            return resp.status(400).json({
                ok: false,
                message: `Sorry Forbidden Action`
            });
        }
        if (isPreviuslyRegister) { 
            return resp.status(400).json({
                ok: false,
                message: `This clinic already has an account with document :${register_number}`
            });
        }
        const clinic = new Clinic(req.body);
        clinic.country = 'EL Salvador';
        clinic.province = address.province;
        clinic.city = address.city;
        clinic.street = address.street
        clinic.user = user_id
        await clinic.save();
  

        resp.json({
            ok: true,
            message: 'Clinic has been created success',
            clinic,
        });
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message: 'unexpercted error'
        });
    }
}

const updateClinic = async (req, resp = response) => { 
    const user_id = req.user_id;
    const clinic_id = req.params.id;

    try {
        const clinic = await Clinic.findById(clinic_id);
        if (!clinic) { 
            return resp.status(404).json({
                ok: false,
                message:'We couldnt find this hospial'
            });
        }
        
        const { name, user, ...fields } = req.body;
        if (clinic.name !== name) { 
            const clinicExist = await Clinic.findOne({ name });
            if (clinicExist) { 
                return resp.status(400).json({
                    ok: false,
                    message:'One hospital has already registered with this name'
                });
            }
            fields.name = name;
        }
        fields.user = user_id;
        const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id,  fields, { new: true }).populate('user', 'name').populate('user', 'img');
        resp.status(200).json({
            ok: true,
            message: 'Hospitals was updated success',
            success: clinicUpdated
        });
    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deleteClinic = async (req, resp = response) => { 
        
        const hospital_id = req.params.id;
        try {
            const hospital = await Clinic.findById(hospital_id);   
            if (!hospital) { 
                return resp.status(400).json({
                    ok: false,
                    message:'we could not find hospital'
                });
            }
 
            await Clinic.findByIdAndDelete(hospital.id);
            resp.status(200).json({
                ok: true,
                message: 'hospital deleted', 
            });

        } catch (error) {  
            console.log(error)
            resp.status(500).json({
                ok: false,
                message:'something was wrong'
            });
            
        }
    }
        
module.exports = { getClinics, createClinic, updateClinic, deleteClinic }