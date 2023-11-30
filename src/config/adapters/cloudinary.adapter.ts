import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Environment } from '../envs';

cloudinary.config({
    cloud_name: Environment.CLOUDINARY_CLOUD_NAME,
    api_key: Environment.CLOUDINARY_API_KEY,
    api_secret: Environment.CLOUDINARY_API_SECRET,
    secure: true,
});

export enum AllowedFolder {
    clinic = "clinics",
    admin = "admins",
    patient = "patients",
    doctor = "doctots",
    record = "records"
}
export interface CloudinaryUploadFileArgs {
    filePath: string;
    folder: AllowedFolder,
    public_id: string;
}

export class CloudinaryAdapter {

    static async uploadFile(options: CloudinaryUploadFileArgs): Promise<UploadApiResponse> {
        const { filePath, public_id, folder } = options;
        return await cloudinary.uploader.upload(filePath, { folder, public_id });
    }

    static async deleteFile(id: string): Promise<boolean> {
        const resp = await cloudinary.uploader.destroy(id);
        console.log(resp);
        return resp;
    }
}