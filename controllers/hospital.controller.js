const { response } = require('express');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');

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
    const user_id = req.user_id;
    const hospital_id = req.params.id;

    try {
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) { 
            return resp.status(404).json({
                ok: false,
                message:'We couldnt find this hospial'
            });
        }
        
        const { name, user, ...fields } = req.body;
        if (hospital.name !== name) { 
            const hospitalExist = await Hospital.findOne({ name });
            if (hospitalExist) { 
                return resp.status(400).json({
                    ok: false,
                    message:'One hospital has already registered with this name'
                });
            }
            fields.name = name;
        }
        fields.user = user_id;
        const hospitalUpdated = await Hospital.findByIdAndUpdate(hospital_id,  fields, { new: true }).populate('user', 'name').populate('user', 'img');
        resp.status(200).json({
            ok: true,
            message: 'Hospitals was updated success',
            success: hospitalUpdated
        });
    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deleteHospital = async (req, resp = response) => { 
        
        const user_id = req.user_id;
        const user = await User.findById(user_id);
        const userLoggedIn = JSON.stringify(user._id);
        const ROLE = user.role;

   
        const hospital_id = req.params.id;
        try {
            const hospital = await Hospital.findById(hospital_id);   
            if (!hospital) { 
                return resp.status(400).json({
                    ok: false,
                    message:'we could not find hospital'
                });
            }

            const userCreator = JSON.stringify(hospital.user);
         
            if ((userLoggedIn !== userCreator)&& ROLE !== 'ADMIN_ROLE' ) { 
                return resp.status(400).json({
                    ok: false,
                    message: 'to delete a hospital, User must be who has been created it or has an ADMIN_ROLE', 
                }); 
                
            }
            await Hospital.findByIdAndDelete(hospital.id);
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
        
module.exports = { getHospitals, createHospital, updateHospital, deleteHospital }