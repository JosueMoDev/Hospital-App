import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { APIDOCSCHEMAS } from './schemas.interface';

class FromDtoToSchema {
  static getShemas() {
    const schemas = validationMetadatasToSchemas();
    schemas as APIDOCSCHEMAS;
    const {
      Doctors,
      GetDoctorsAssignedDto,
      UploadDto,
      Address,
      ...rest
    }: APIDOCSCHEMAS = schemas;
    const GloblaSchema = {
      ...rest,
      CreateClinicDto: {
        ...rest.CreateClinicDto,
        properties: {
          ...rest.CreateClinicDto.properties,
          address: { $ref: '#/components/schemas/AddressDto' },
        },
      },
      UpdateClinicDto: {
        ...rest.UpdateClinicDto,
        properties: {
          ...rest.UpdateClinicDto.properties,
          address: { $ref: '#/components/schemas/AddressDto' },
        },
      },
      ClinicAssignmentDto: {
        properties: {
          clinic: {
            type: 'string',
            example: '65615020a9ad9cf7a4dc1176',
          },
          doctors: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      AddressDto: Address,
      UploadFileDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          file: {
            type: 'string',
            format: 'binary',
          },
          updatedBy: {
            type: 'string',
          },
        },
        required: ['id', 'file', 'updatedBy'],
      },
      DeleteFileDto: UploadDto,
    };
    return GloblaSchema;
  }
}

export const GlobasSchemas: APIDOCSCHEMAS = FromDtoToSchema.getShemas();
