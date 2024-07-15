import { OpenAPIV3 } from "openapi-types";
import { FromDtoToSchema } from "../fromDtoToSchema";
import { format } from "date-fns";

type AccountPaths = {
  create: OpenAPIV3.PathItemObject;
  update: OpenAPIV3.PathItemObject;
  find_one: OpenAPIV3.PathItemObject;
  find_by_document: OpenAPIV3.PathItemObject;
  find_many: OpenAPIV3.PathItemObject;
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
            schema: FromDtoToSchema.getShemas().CreateAccountDto as Object,
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
            schema: FromDtoToSchema.getShemas().UpdateAccountDto as Object,
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
          schema:  FromDtoToSchema.getShemas().PaginationDto as Object
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
};
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmNmOWRmMmFkMWIwZjkzZTk2MTczYSIsImlhdCI6MTcyMTA2MjY3MiwiZXhwIjoxNzIxMDY5ODcyfQ.YJ95kuRXaLCtlrexPKP0kHT3VJvyLZQHNFUv2PMCESY`;
