const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async (req, resp = response) => { 
    const hospitals = await Hospital.find().populate('user','name');
    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting Hospitals ....',
            hospitals
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Hospitals'
        });
    }

}

const createHospital = async (req, resp = response) => { 

    const user_id = req.user_id;
    const hospital = new Hospital({
        user: user_id,
        ...req.body
    });
    try {
       const  hospitalDB = await hospital.save();
        resp.status(200).json({
            ok: true,
            message: ' Hospital created success',
            hospital:hospitalDB
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt create a hospital'
        });  
    }
}

const updateHospital = async (req, resp = response) => { 


    resp.status(200).json({
        ok: true,
        message:'Hospitals was updated success'
    });
}

const deleteHospital = async (req, resp = response) => { 

    resp.status(200).json({
        ok: true,
        message:'Hospitals has been deleted'
    });
}

module.exports = { getHospitals, createHospital, updateHospital, deleteHospital }