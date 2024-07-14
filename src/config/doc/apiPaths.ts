import { OpenAPIV3 } from "openapi-types";
import { createAccountDtoSchema, updateAccountDtoSchema } from "../../domain";

export const apiPath: OpenAPIV3.PathsObject<{}, {}> = {
  "/authentication/login": {
    post: {
      summary:
        "This endpoint lets you authenticate a user and get an access token",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email of the user",
                },
                password: {
                  type: "string",
                  description: "The password of the user",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "User found",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },
  "/authentication/refresh-token": {
    get: {
      summary: "This endpoint lets you refresh your access token",
      tags: ["Authentication"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "User found",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },
  "/account/create": {
    post: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Register a new user account",
      description: "Let register a new user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: createAccountDtoSchema as Object,
          },
        },
      },
      responses: {
        200: {
          description: "User found",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },
  "/account/update": {
    patch: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update a existent user account",
      description: "Let update user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: updateAccountDtoSchema as Object,
          },
        },
      },
      responses: {
        200: {
          description: "User found",
        },
        404: {
          description: "User not found",
        },
      },
    },
  },
};
