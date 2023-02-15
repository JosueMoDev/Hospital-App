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

const handlerPhoto = {
    
    uploadPhoto: async (folder, schema,  fileName, filePath) => { 
        
        const { collection, document } = schema;
        if (!collection && !document) { 
            return false
        } else {

            let collection = document;

            
            const  photoName = `${collection._id}${collection.name}${fileName}`
            if (collection.photo_id) { await cloudinary.uploader.destroy(collection.photo_id);}
            
            const { secure_url, public_id } = await uploadPhotoToCloudinary(folder, photoName, filePath);
            
            collection.photo = secure_url;
            collection.photo_id = public_id 
            await collection.save();
            
            return true
        }
    },
    destroyPhoto: async (schema) => { 
        const { collection, document } = schema;
        if (!collection && !document) {

            return false
        } else {
            let collection = document;
            if (collection.photo_id) {
                await cloudinary.uploader.destroy(collection.photo_id);
                collection.photo = '';
                collection.photo_id = ''
                await collection.save();
                return true
            }
             return false
        }
    }

}



const handlerFolder = async (folder, id ) => {

    switch (folder) {
        case 'doctors':
            let doctor = await Doctor.findById(id);
            if (!doctor) {
                return false;
            } else {  
                return { collection:'doctor', document:doctor }
            }
        break;
        case 'hospitals':
            let hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            } else { 
                return { collection:'hospital', document:hospital }
            }
        break;
        case 'users':
            let user = await User.findById(id);
            if (!user) {
                return false;
            } else {    
                return { collection:'user', document:user }
            }
        break;
        case 'patient':
            let patient = await Patient.findById(id);
            if (!patient) {
                return false;
            } else { 
       
                return { collection:'patient', document:patient }
            }
        break;
        
    
        default:
            break;
    }
}


module.exports = { handlerPhoto, handlerFolder }
