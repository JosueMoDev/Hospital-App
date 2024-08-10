import { UploadApiResponse } from 'cloudinary';

export class FileEntity {
  public fileId!: string;
  public fileUrl!: string;
  public sizeFile!: number;
  public format!: string;

  constructor(args: UploadApiResponse) {
    const { secure_url, bytes, format, public_id } = args;
    this.fileId = public_id ?? '';
    this.fileUrl = secure_url ?? '';
    this.sizeFile = bytes ?? 0;
    this.format = format ?? '';
  }

  static mapper(object: UploadApiResponse): FileEntity {
    const objectMapped = new FileEntity(object);
    return objectMapped;
  }
}
