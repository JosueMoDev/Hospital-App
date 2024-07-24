import { OpenAPIV3 } from 'openapi-types';
import { GlobasSchemas } from '../fromDtoToSchema';

type AuthenticationPath = {
  login: OpenAPIV3.PathItemObject;
  refresh_token: OpenAPIV3.PathItemObject;
};
export const authentication: AuthenticationPath = {
  login: {
    post: {
      summary:
        'This endpoint lets you authenticate a user and get an access token',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: GlobasSchemas.Address,
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
  refresh_token: {
    get: {
      summary: 'This endpoint lets you refresh your access token',
      tags: ['Authentication'],
      security: [
        {
          bearerAuth: [],
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
