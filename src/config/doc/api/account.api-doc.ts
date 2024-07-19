import { OpenAPIV3 } from "openapi-types";
import { GlobasSchemas } from "../fromDtoToSchema";

type AccountPaths = {
  create: OpenAPIV3.PathItemObject;
  update: OpenAPIV3.PathItemObject;
  find_one: OpenAPIV3.PathItemObject;
  find_by_document: OpenAPIV3.PathItemObject;
  find_many: OpenAPIV3.PathItemObject;
  change_status: OpenAPIV3.PathItemObject;
  change_password: OpenAPIV3.PathItemObject;
  confirm_password: OpenAPIV3.PathItemObject;
  delete_photo: OpenAPIV3.PathItemObject;
  upload_photo: OpenAPIV3.PathItemObject;
};

export const account: AccountPaths = {
  create: {
    post: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Register a new user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: GlobasSchemas.CreateAccountDto,
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
  find_one: {
    get: {
      tags: ["Account"],
      summary: "Find an existent account by id",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
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
  find_by_document: {
    get: {
      tags: ["Account"],
      summary:
        "Find an existent account by Document Number(DUI) - ONLY WORKS For accounts to belogs a patitient",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "document",
          example: "000000000",
          required: true,
          schema: {
            type: "string",
            pattern: "^d{9}$",
          },
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
  update: {
    patch: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update a existent user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: GlobasSchemas.UpdateAccountDto,
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
  find_many: {
    get: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Find many accounts Paginated ",
      parameters: [
        {
          in: "query",
          name: "PaginationDto",
          schema: GlobasSchemas.PaginationDto,
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
  change_status: {
    patch: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary:
        "This endpoint has de functionallity to change an account status",
      parameters: [
        {
          in: "path",
          name: "id",
          example: "e21754E65Dff2ee9B2245b90",
          required: true,
          schema: {
            type: "string",
          },
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
  change_password: {
    patch: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary:
        "This endpoint has de functionallity to change an account password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: GlobasSchemas.ChangePasswordDto,
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
  confirm_password: {
    post: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary:
        "This endpoint has de functionallity to confirm your account password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: GlobasSchemas.ConfirmPasswordDto,
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
  delete_photo: {
    delete: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "This endpoint delete your account photo",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: GlobasSchemas.DeleteFileDto,
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
  upload_photo: {
    patch: {
      tags: ["Account"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "This endpoint upload your account photo",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: GlobasSchemas.UploadFileDto,
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

