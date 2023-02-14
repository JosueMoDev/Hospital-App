const fs = require('fs-extra');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');
const Patient = require('../models/patient.model')

const uploadPhotoToCloudinary = async (folder, photoName, filePath) => {     
    const res = await cloudinary.uploader.upload(filePath, { folder: folder, public_id: photoName });
    const { secure_url, public_id} = res
    return { secure_url, public_id }
}

const insertPhotoOn = async (folder, id, fileName, filePath) => {

    switch (folder) {
        case 'doctors':
            let doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log(`we could not find any doctor with id : ${id}`);
            } else { 
                const  photoName = `${doctor._id}${doctor.name}${fileName}`
                 if (doctor.photo_id) { await cloudinary.uploader.destroy(doctor.photo_id);}
     
                 const { secure_url, public_id } = await uploadPhotoToCloudinary(folder, photoName, filePath);
     
                 doctor.photo = secure_url;
                 doctor.photo_id = public_id 
                 await doctor.save();
                 await fs.unlink(filePath)
                 
                return true
            }
        break;
        case 'hospitals':
            let hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log(`we could not find any user with id : ${id}`);
            } else { 
               const  photoName = `${hospital._id}${hospital.name}${fileName}`
                if (hospital.photo_id) {
                    res = await cloudinary.uploader.destroy(hospital.photo_id);
                    console.log(res)
                }
    
                const { secure_url, public_id } = await uploadPhotoToCloudinary(folder, photoName, filePath);
    
                hospital.photo = secure_url;
                hospital.photo_id = public_id 
                await hospital.save();
                await fs.unlink(filePath)
                
                return true
            }
        break;
        case 'users':
            let user = await User.findById(id);
            if (!user) {
                console.log(`we could not find any user with id : ${id}`);
            } else { 
               const  photoName = `${user._id}${user.name}${fileName}`
                if (user.photo_id) {await cloudinary.uploader.destroy(user.photo_id)}
    
                const { secure_url, public_id } = await uploadPhotoToCloudinary(folder, photoName, filePath);
    
                user.photo = secure_url;
                user.photo_id = public_id 
                await user.save();
                await fs.unlink(filePath)
                
                return true
            }
        break;
        case 'patient':
            let patient = await Patient.findById(id);
            if (!patient) {
                console.log(`we could not find any user with id : ${id}`);
            } else { 
                const  photoName = `${patient._id}${patient.name}${fileName}`
                if (patient.photo_id) { await cloudinary.uploader.destroy(patient.photo_id);}
    
                const { secure_url, public_id } = await uploadPhotoToCloudinary(folder, photoName, filePath);
    
                patient.photo = secure_url;
                patient.photo_id = public_id 
                await patient.save();
                await fs.unlink(filePath)
                
                return true
            }
        break;
        
    
        default:
            break;
    }

}
module.exports = { insertPhotoOn }