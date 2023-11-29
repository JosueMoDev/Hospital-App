import { FileDataSource } from "../../domain";

export class FileDataSourceImpl implements FileDataSource {

    async uploadFile(filePath: string): Promise<any> {

        return {
          fileId: "12lj1l2j1l21jl2",
          fileUrl: "www.cloudinary/65615020a9ad9cf7a4dc1176.png",
        };
    }
    async deleteFile(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}