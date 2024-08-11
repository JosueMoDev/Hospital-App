import { FromDtoToSchema } from '../fromDtoToSchema';
import { OpenAPIV3 } from 'openapi-types';

type AppointmentPaths = {
  create: OpenAPIV3.PathItemObject;
  update: OpenAPIV3.PathItemObject;
  find_one: OpenAPIV3.PathItemObject;
  find_many: OpenAPIV3.PathItemObject;
  delete: OpenAPIV3.PathItemObject;
};

export const appointment: AppointmentPaths = {
  create: {
    post: {
      tags: ['Appointment'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new appointment',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: FromDtoToSchema.getShemas().CreateAppointmentDto,
          },
        },
      },
      responses: {
        200: {
          description: 'User found',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  find_one: {
    get: {
      tags: ['Appointment'],
      summary: 'Find appointment by id',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User found',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  update: {
    patch: {
      tags: ['Appointment'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an appointment',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: FromDtoToSchema.getShemas().UpdateAppointmentDto,
          },
        },
      },
      responses: {
        200: {
          description: 'User found',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  find_many: {
    get: {
      tags: ['Appointment'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Find many appointments Paginated ',
      parameters: [
        {
          in: 'query',
          name: 'PaginationDto',
          schema: FromDtoToSchema.getShemas().PaginationDto,
        },
      ],
      responses: {
        200: {
          description: 'User found',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  delete: {
    delete: {
      tags: ['Appointment'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an Appointment by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          example: 'e21754E65Dff2ee9B2245b90',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User found',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
};
