import { APIDOCSCHEMAS } from './schemas.interface';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class FromDtoToSchema {
  static getShemas(): APIDOCSCHEMAS {
    const schemas = validationMetadatasToSchemas();
    schemas as APIDOCSCHEMAS;
    const {
      Doctors,
      GetDoctorsAssignedDto,
      UploadDto,
      Address,
      ...rest
    }: APIDOCSCHEMAS = schemas;

    const GloblaSchema: APIDOCSCHEMAS = {
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
    }
    return GloblaSchema;
  }
}
