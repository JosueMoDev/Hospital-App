const { response} = require('express');
const Doctor = require('../models/doctor.model')

const getDoctors = async (req, resp = response) => { 

    const pagination = Number(req.query.pagination) || 0;
    const [doctors, total] = await Promise.all([

        Doctor
            .find()
            .populate('user', 'name')
            .populate('hospital', 'name')
            .skip(pagination)
            .limit(5),
        
        Doctor.count()

    ]);

    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting Doctor ....',
            doctors,
            total
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt get any doctor'
        });
    }

}
const getDoctorById = async (req, resp = response) => { 
    const doctor_id = req.params.id
    try {
        const doctor = await Doctor.findById(doctor_id).populate('user','name')
    
        resp.status(200).json({
            ok: true,
            message: ' Getting Doctor ....',
            doctor
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt get any doctor'
        });
    }

}

const createDoctor = async (req, resp = response) => {
    
    const user_id = req.user_id;
    
    const doctor = new Doctor({
        user: user_id,
        ...req.body
    });
    try {
        const doctorDB = await doctor.save();
        resp.status(200).json({
            ok: true,
            message: 'Doctor has been Created success',
            doctor:doctorDB
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt create doctor'
        });
    }

}

const updateDoctor  = async (req, resp = response) => { 

    const doctor_id = req.params.id
    try {
        const doctor = await Doctor.findById(doctor_id);
        if (!doctor) { 
            return resp.status(404).json({
                ok: true,
                message:'Any doctor found it '
            });
        }
        const {user, ...fields } = req.body;
        fields.user = req.user_id;

        const doctorUpdated = await Doctor.findByIdAndUpdate(doctor_id,  fields, { new: true }).populate('user', 'name');
     
        resp.status(200).json({
            ok: true,
            message: 'Doctor was updated success',
            data: doctorUpdated
        });
    } catch (error) {
        resp.status(500).json({
            ok: true,
            message:'internal error'
        }); 
    }

}

const deleteDoctor = async (req, resp = response) => { 

    const doctor_id = req.params.id;
    try {
        const doctor = await Doctor.findById(doctor_id);   
        if (!doctor) { 
            return resp.status(400).json({
                ok: false,
                message:'we could not find doctor'
            });
        }
        
        await Doctor.findByIdAndDelete(doctor.id);
        resp.status(200).json({
            ok: true,
            message: 'doctor deleted', 
        });

    } catch (error) {  
        console.log(error)
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor }