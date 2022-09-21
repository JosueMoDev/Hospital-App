const { response } = require('express');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model')

const getSearchingRespose = async (req, resp = response) => { 
    
    const query = req.params.query;
    const regexpresion = new RegExp(query, 'i');
    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regexpresion }),
        Hospital.find({ name: regexpresion }),
        Doctor.find({ name: regexpresion }),
    ]);
    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting Respose for ....',
            users,
            hospitals,
            doctors
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:` We Couldnt Get Anything about${'query'}`
        });
    }

}
// const getSearchBySchema = async (req, resp = response) => { 
    //TODO: search how Juan Matias code works class 132 
//     const query = req.params.query;
//     const regexpresion = new RegExp(query, 'i');
//     const [users, hospitals, doctors] = await Promise.all([
//         User.find({ name: regexpresion }),
//         Hospital.find({ name: regexpresion }),
//         Doctor.find({ name: regexpresion }),
//     ]);
//     try {
//         resp.status(200).json({
//             ok: true,
//             message: ' Getting Respose for ....',
//             users,
//             hospitals,
//             doctors
//         });
//     } catch (error) {
//         resp.status(500).json({
//             ok: false,
//             message:` We Couldnt Get Anything about${'query'}`
//         });
//     }

// }
module.exports = { getSearchingRespose };