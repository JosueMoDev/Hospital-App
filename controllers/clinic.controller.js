const { response } = require('express');
const Clinic = require('../models/clinic.model');

const getClinics = async (req, resp = response) => { 
    try {
        const pagination = Number(req.query.pagination) || 0;
        const [clinics, total] = await Promise.all([

            Clinic
                .find()
                .skip(pagination)
                .limit(5)
                .populate('user','name'),
            
            Clinic.count()

        ]);
    
        resp.json({
            ok: true,
            message:'getting Clinics ....',
            clinics,
            total
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Clinics'
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
        clinic.street = address.street;
        clinic.user = user_id;
        clinic.photo = '';
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
    const id = req.id;
    const clinic_id = req.params.id;

    try {
        const clinic = await Clinic.findById(clinic_id);
        if (!clinic) { 
            return resp.status(404).json({
                ok: false,
                message:'We couldnt find any Clinic'
            });
        }
        
        const { name, user, register_number, ...fields } = req.body;
        if (clinic.name !== name) { 
            const clinicExist = await Clinic.findOne({ name });
            if (clinicExist) { 
                return resp.status(400).json({
                    ok: false,
                    message:'One Clinic has already enrolled with this name'
                });
            }
            fields.name = name;
        }
        if (clinic.register_number !== register_number) { 
            const clinicExist = await Clinic.findOne({ register_number });
            if (clinicExist) { 
                return resp.status(400).json({
                    ok: false,
                    message:`One Clinic has already enrolled with number: ${register_number}`
                });
            }
            fields.register_number = register_number;
        }
        fields.user = id;
        const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, fields, { new: true }).populate('user', 'name');
            // .populate('user', 'img');
        return resp.status(200).json({
            ok: true,
            message: 'Clinic has been updated',
            clinic: clinicUpdated
        });
    } catch (error) {   
        return resp.status(500).json({
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