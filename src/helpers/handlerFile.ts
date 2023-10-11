import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { User, Clinic, Patient } from "../models"; 

const uploadPhotoToCloudinary = async (folder: string, photoName: string, filePath: string) => {
  const newfolder = (folder ||= "clinic");
  const res = await cloudinary.uploader.upload(filePath, {
    folder: newfolder + "s",
    public_id: photoName,
  });
  const { secure_url, public_id } = res;
  return { secure_url, public_id };
};

export const handlerPhotoValidation = (file: any) => {
  const nameChunck = file.originalname.split(".");
  const fileExtension = nameChunck[nameChunck.length - 1];
  // validate extesion
  const allowedExtension = ["jpg", "png", "jpeg"];
  if (!allowedExtension.includes(fileExtension)) {
    return false;
  }
  return true;
};
export const handlerPhoto = {
  uploadPhoto: async (schema: any, filePath: string) => {
    const { collection, document } = schema;
    if (!collection && !document) {
      return false;
    } else {
      let collection = document;

      const photoName = `${collection.email || collection.name}${
        collection._id
      }`;
      if (collection.photo_id) {
        await cloudinary.uploader.destroy(collection.photo_id);
      }

      const { secure_url, public_id } = await uploadPhotoToCloudinary(
        document.rol,
        photoName,
        filePath
      );

      collection.photo = secure_url;
      collection.photo_id = public_id;
      await collection.save();

      return true;
    }
  },
  destroyPhoto: async (schema: any) => {
    const { collection, document } = schema;
    if (!collection && !document) {
      return false;
    } else {
      let collection = document;
      if (collection.photo_id) {
        await cloudinary.uploader.destroy(collection.photo_id);
        collection.photo = "";
        collection.photo_id = "";
        await collection.save();
        return true;
      }
      return false;
    }
  },
};

export const handlerFolder = async (folder: any, id: string) => {
  switch (folder) {
    case "clinics":
      let clinic = await Clinic.findById(id);
      if (!clinic) {
        return false;
      } else {
        return { collection: "clinic", document: clinic };
      }
  
    case "users":
      let user = await User.findById(id);
      if (!user) {
        return false;
      } else {
        return { collection: "user", document: user };
      }
          
    case "patients":
      let patient = await Patient.findById(id);
      if (!patient) {
        return false;
      } else {
        return { collection: "patient", document: patient };
      }

    default:
      break;
  }
};

