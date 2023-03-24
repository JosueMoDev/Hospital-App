const { response } = require('express');
const Clinic = require('../models/clinic.model');
const User = require('../models/user.model');

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

const assingDoctorsToClinic = async (req, resp = response) => {
    const clinic_id = req.params.id;
    const doctors = req.body.doctors_assigned;
    
    try {
        const clinic = await Clinic.findById(clinic_id);
        if (!clinic) {
            return resp.status(404).json({
                ok: false,
                message: 'We couldnt find any Clinic'
            });
        }
        const doctors_db = await User.find({ _id: doctors.selectedStaff })
        const doctorsToAssing = doctors_db.map(doctor => doctor._id)
        const updatedDoctors = await User.updateMany(
            { _id: { $in: doctorsToAssing } },
            { $set: { isAssigned: true } },
            { multi: true }
        )
        if (!updatedDoctors.acknowledged) {
            return resp.status(404).json({
                ok: false,
                message: 'something wrong',
            });
        }
        const doctors_to_assigned = await User.find({ _id: doctors.selectedStaff })
        clinic.doctors_assigned = [ ...clinic.doctors_assigned, ...doctors_to_assigned];
        const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, { new: true });

        return resp.status(200).json({
            ok: true,
            message: 'Doctors has been assigned',
            clinic:clinicUpdated
        });
       
    } catch (error) {   
        return resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}

const removeAllAssingDoctorsToClinic = async (req, resp = response) => {
    const clinic_id = req.params.id;
    const doctors = req.body.doctors_assigned;
    
    try {
        const clinic = await Clinic.findById(clinic_id);
        if (!clinic) {
            return resp.status(404).json({
                ok: false,
                message: 'We couldnt find any Clinic'
            });
        }
        const doctors_db = await User.find({ _id: doctors })
        const doctorsAssigned = doctors_db.map(doctor => doctor._id)
        const updatedDoctors = await User.updateMany(
            { _id: { $in: doctorsAssigned } },
            { $set: { isAssigned: false } },
            { multi: true }
            )
        if (!updatedDoctors.acknowledged) {
            return resp.status(404).json({
                ok: false,
                message: 'something wrong',
            });
        }
        
        clinic.doctors_assigned = [];

        const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, { new: true });

        return resp.status(200).json({
            ok: true,
            message: 'Doctors have been removed',
            clinic:clinicUpdated
        });
       
    } catch (error) {   
        return resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
const removeADoctorassignedToClinic = async (req, resp = response) => {
    const clinic_id = req.params.id;
    const doctors = req.body.doctors_assigned;
    const doctor = req.body.doctor_remove;

    try {
        const clinic = await Clinic.findById(clinic_id);
        if (!clinic) {
            return resp.status(404).json({
                ok: false,
                message: 'We couldnt find any Clinic'
            });
        }
        const doctors_db = await User.find({ _id: doctors })
        const doctor_remove = await User.findById(doctor);

        
        if(!doctor_remove || !doctors_db) {
            return resp.status(404).json({
                ok: false,
                message: 'Any doctor has been found'
            });
        }
    
        if (!doctors_db) {
            clinic.doctors_assigned = [];
        } else {
            clinic.doctors_assigned = [...doctors_db];
        }
        doctor_remove.isAssigned = false;

        const clinicUpdated = await Clinic.findByIdAndUpdate(clinic_id, clinic, { new: true });
        await User.findByIdAndUpdate(doctor, doctor_remove, { new: true });
 
        return resp.status(200).json({
            ok: true,
            message: 'Doctors has been removed',
            clinic:clinicUpdated
        });
       
    } catch (error) {   
        return resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
const deleteClinic = async (req, resp = response) => {
        
    const clinic_id = req.params.id;
    const user_logged_id = req.body.user_logged
    try {
        const clinic_to_delete = await Clinic.findById(clinic_id);
        const user_logged = await User.findById(user_logged_id);
            
        if (!clinic_to_delete) {
            return resp.status(404).json({
                ok: false,
                message: `unknown clinic'${clinic_id}' at database`
            })
        }
            
        if (user_logged.rol !== 'admin') {
            return resp.status(404).json({
                ok: false,
                message: `Forbidden action`
            })
        }
           
            
        clinic_to_delete.validationState = !clinic_to_delete.validationState;
        const clinic_updated = await Clinic.findByIdAndUpdate(clinic_id, clinic_to_delete, { new: true });
     
        return resp.status(200).json({
            ok: true,
            message: `Clinic has been ${(clinic_updated.validationState) ? 'Anabled' : 'Disabled'}`,
        })
    }catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Something was wrong'
        });
    }
}     
module.exports = { getClinics, createClinic, updateClinic, deleteClinic, assingDoctorsToClinic, removeAllAssingDoctorsToClinic, removeADoctorassignedToClinic }