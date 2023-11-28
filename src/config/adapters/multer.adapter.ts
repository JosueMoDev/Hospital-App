import { Request } from "express";
import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import { UuidAdapter } from "./uuid.adapter";

type MulterFileCallBack = (error: Error | null, filename: string) => void;
export class MulterAdapter {

    private fileValidation = () => {

    }

    static moveFileToTempFolder() {

        const storage: StorageEngine = multer.diskStorage({
            destination: path.join(__dirname, "/src/uploads"),
            filename: (request: Request, file: Express.Multer.File, callback: MulterFileCallBack) => {
                const tempFileName = UuidAdapter.uuidv4() + file.originalname;
                callback(null, tempFileName);
            }

        });

        return multer({
            fileFilter: (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {

            },
            storage
        }).single("file");

    }

}