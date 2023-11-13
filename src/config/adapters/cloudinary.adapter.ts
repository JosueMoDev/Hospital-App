import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Environment } from '../envs/envs';

cloudinary.config({
    cloud_name: Environment.CLOUDINARY_CLOUD_NAME,
    api_key: Environment.CLOUDINARY_API_KEY,
    api_secret: Environment.CLOUDINARY_API_SECRET,
    secure: true,
});

interface CloudinaryUploadFileOptions {
    filePath: string;
    fileConfig: FileConfig;
}

interface FileConfig {
    folder: string,
    public_id: string,
}
export class CloudinaryAdapter {

    static async uploadFile(options: CloudinaryUploadFileOptions): Promise<UploadApiResponse>{
        const { filePath, fileConfig } = options;
        return await cloudinary.uploader.upload(filePath, { folder: fileConfig.folder, public_id: fileConfig.public_id });
    }

    static async deleteFile(id: string): Promise<boolean> {
        return await cloudinary.uploader.destroy(id);
    }
    
}