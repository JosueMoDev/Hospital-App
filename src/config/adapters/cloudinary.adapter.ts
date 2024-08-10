import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Environment } from '../envs';

cloudinary.config({
  cloud_name: Environment.CLOUDINARY_CLOUD_NAME,
  api_key: Environment.CLOUDINARY_API_KEY,
  api_secret: Environment.CLOUDINARY_API_SECRET,
  secure: true,
});

export enum AllowedFolder {
  clinic = 'clinics',
  admin = 'admins',
  patient = 'patients',
  doctor = 'doctors',
  record = 'records',
}
export interface CloudinaryUploadFileArgs {
  filePath: string;
  folder: AllowedFolder;
  public_id: string;
}

export class CloudinaryAdapter {
  private static PrepareFile() {}

  static async uploadFile(
    options: CloudinaryUploadFileArgs,
  ): Promise<UploadApiResponse> {
    const { filePath, public_id, folder } = options;
    return await cloudinary.uploader.upload(filePath, { folder, public_id });
  }

  static async deleteFile(id: string): Promise<{ [key: string]: string }> {
    return await cloudinary.uploader.destroy(id);
  }
}
