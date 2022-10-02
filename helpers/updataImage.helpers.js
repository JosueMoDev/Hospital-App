const { response } = require('express');
const fs = require('fs');

const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');

const deleteOldImg = async (schema, collection) => {
    const oldImagePath = `./uploads/${schema}/${collection.img}`;
    if (fs.existsSync(oldImagePath)) { 
        fs.unlinkSync(oldImagePath);
    }
}
const uploadImage = async (schema, id, fileName) => {

    switch (schema) {
        case 'doctors':
            let doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log('we could not find any doctor with id : id');
            } else { 
                deleteOldImg(schema, doctor);
                doctor.img = fileName;
                await doctor.save();
                return true
            }
        break;
        case 'hospitals':
            let hospital = await Hospital.findById(id);
            if (!hospital) { 
                console.log('we could not find any Hospital with id : id');
                return false;
            }
            deleteOldImg(schema, hospital);

            hospital.img = fileName;
            await hospital.save();
            return true
            break;

        case 'users':
            let user = await User.findById(id);
            if (!user) {
                console.log('we could not find any user with id : id');
            } else { 
                deleteOldImg(schema, user);
                user.img = fileName;
                await user.save();
                return true
            }
            break;
    
    
        default:
            break;
    }

}
module.exports = { uploadImage }