import fileUpload from 'express-fileupload';
interface FileUploadConfig {
    limits: { fileSize: number };
    preserveExtension: boolean;
    abortOnLimit: boolean;
    responseOnLimit: string;

}

export class ExpressFileUploadAdapter {
    static configure() {
        const fileUploadConfig: FileUploadConfig = {
            limits: { fileSize: 5 * 1024 * 1024 }, // Establecer límite de tamaño a 5MB
            preserveExtension: true,
            abortOnLimit: true,
            responseOnLimit: 'File size limit has been reached',
        };

        const fileUploadInstance = fileUpload(fileUploadConfig);

        return fileUploadInstance;
    }
}