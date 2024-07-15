import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { APIDOCSCHEMAS } from "./schemas.interface";

export class FromDtoToSchema  {
    static getShemas() {
        const schemas = validationMetadatasToSchemas();
        return schemas as APIDOCSCHEMAS;  
    }

}