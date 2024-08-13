import { get } from 'env-var';

export class Environment {
  static PORT: number = get('PORT').required().asPortNumber();
  static SECRET_KEY_JWT: string = get('SECRET_KEY_JWT').required().asString();
  static GOOGLE_CLIENT_KEY: string = get('GOOGLE_CLIENT_KEY')
    .required()
    .asString();
  static GOOGLE_SECRET_KEY: string = get('GOOGLE_SECRET_KEY')
    .required()
    .asString();
  static CLOUDINARY_CLOUD_NAME: string = get('CLOUDINARY_CLOUD_NAME')
    .required()
    .asString();
  static CLOUDINARY_API_KEY: string = get('CLOUDINARY_API_KEY')
    .required()
    .asString();
  static CLOUDINARY_API_SECRET: string = get('CLOUDINARY_API_SECRET')
    .required()
    .asString();
  static MONGO_URL: string = get('MONGO_URL').required().asString();
  static TEMP_UPLOAD_PATH: string = get('TEMP_UPLOAD_PATH')
    .required()
    .asString();
}
