const { response, query } = require('express');
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

    resp.status(200).json({
        ok: true,
        message:'Doctor was updated success'
    });
}

const deleteDoctor = async (req, resp = response) => { 

    resp.status(200).json({
        ok: true,
        message:'Doctor has been deleted'
    });
}

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor }