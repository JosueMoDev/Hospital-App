const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Clinic = require('../models/clinic.model');
const User = require('../models/user.model');
const Patient = require('../models/patient.model');

const uploadPhotoToCloudinary = async (folder, photoName, filePath) => { 
    const res = await cloudinary.uploader.upload(filePath, { folder: folder, public_id: photoName });
    const { secure_url, public_id} = res
    return { secure_url, public_id }
}

const handlerPhotoValidation = (file ) => { 
    const nameChunck = file.originalname.split('.');
    const fileExtension = nameChunck[nameChunck.length - 1];
    // validate extesion 
    const allowedExtension = ['jpg', 'png', 'jpeg'];
    if (!allowedExtension.includes(fileExtension)) { 
        return false;
    }
    return true;
}
const handlerPhoto = {
    
    uploadPhoto: async (schema, filePath) => { 
        
        const { collection, document } = schema;
        if (!collection && !document) { 
            return false
        } else {

            let collection = document;

            
            const  photoName = `${collection.email}${collection._id}`
            if (collection.photo_id) { await cloudinary.uploader.destroy(collection.photo_id);}
            
            const { secure_url, public_id } = await uploadPhotoToCloudinary(document.rol||'clinic'+'s', photoName, filePath);
            
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
    
        case 'clinics':
            let clinic = await Clinic.findById(id);
            if (!clinic) {
                return false;
            } else { 
                return { collection:'clinic', document:clinic }
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
        case 'patients':
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


module.exports = { handlerPhoto, handlerFolder, handlerPhotoValidation }
