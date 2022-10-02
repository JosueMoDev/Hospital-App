const { response } = require('express');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model')

const getDocumentsCollection = async (req, resp = response) => { 
    
    const schema = req.params.schema;
    const query = req.params.query;
    const regexpresion = new RegExp(query, 'i');
    
    try {
        let data = []
        switch (schema) {
            case 'users':
                data = await User
                    .find({ name: regexpresion });
                break;
            case 'hospitals':
                data = await Hospital
                    .find({ name: regexpresion })
                    .populate('user', 'name, img');
                break;
            case 'doctors':
                data = await Doctor
                    .find({ name: regexpresion })
                    .populate('user', 'name, img')
                    .populate('hospital', 'name, img');
                break;    
            default:
                
                return resp.status(400).json({
                    ok: false,
                    message: `You should search into the following paths `
                });
        }
        resp.status(200).json({
            ok: true,
            message: ' Getting Respose for ....',
            data
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:` We Couldnt Get Anything about${'query'}`
        });
    }

}
module.exports = { getDocumentsCollection };