// {
//   asset_id: 'a0110107632e20deb219c287c1296bd3',
//   public_id: 'clinics/65615020a9ad9cf7a4dc1176.pdf',
//   version: 1701278195,
//   version_id: 'f4f5deab0a283cd0f3865a88d345d822',
//   signature: '1a01a3b91889ebbfcab951a1e85ef73cfe515bc1',
//   width: 612,
//   height: 792,
//   format: 'pdf',
//   resource_type: 'image',
//   created_at: '2023-11-29T17:16:35Z',
//   tags: [],
//   pages: 5,
//   bytes: 232995,
//   type: 'upload',
//   etag: '9f4ca6fbfb900d6e3fcfdc49d228bb08',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/the-clinic-app/image/upload/v1701278195/clinics/65615020a9ad9cf7a4dc1176.pdf.pdf',
//   secure_url: 'https://res.cloudinary.com/the-clinic-app/image/upload/v1701278195/clinics/65615020a9ad9cf7a4dc1176.pdf.pdf',
//   folder: 'clinics',
//   access_mode: 'public',
//   original_filename: '65615020a9ad9cf7a4dc1176',
//   api_key: '437826766744641'
// }

import { UploadApiResponse } from "cloudinary";

export class FileEntity {
  public fileId!: string;
  public fileUrl!: string;
  public sizeFile!: number;
  public format!: string;

  constructor(args: UploadApiResponse) {
    const { secure_url, bytes, format, public_id } = args;
    this.fileId = public_id ?? "";
    this.fileUrl = secure_url ?? "";
    this.sizeFile = bytes ?? 0;
    this.format = format ?? "";
  }

  static mapper(object: UploadApiResponse): FileEntity {
    const objectMapped = new FileEntity(object);
    return objectMapped;
  }
}
