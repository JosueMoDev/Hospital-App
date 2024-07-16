import { OpenAPIV3 } from "openapi-types";
import { FromDtoToSchema } from "../fromDtoToSchema";

type ClinicPaths = {
  create: OpenAPIV3.PathItemObject;
  update: OpenAPIV3.PathItemObject;
  find_one: OpenAPIV3.PathItemObject;
  find_many: OpenAPIV3.PathItemObject;
  change_status: OpenAPIV3.PathItemObject;
  upload_photo: OpenAPIV3.PathItemObject;
  delete_photo: OpenAPIV3.PathItemObject;
};

export const clinic: ClinicPaths = {
  create: {
    post: {
      tags: ["Clinic"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Create a new clinic",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: FromDtoToSchema.getShemas().CreateClinicDto as Object,
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
      tags: ["Clinic"],
      summary: "Find clinic by id",
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
  update: {
    patch: {
      tags: ["Clinic"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update a clinic",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: FromDtoToSchema.getShemas().UpdateClinicDto as Object,
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
      tags: ["Clinic"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Find many clinics Paginated ",
      parameters: [
        {
          in: "query",
          name: "PaginationDto",
          schema: FromDtoToSchema.getShemas().PaginationDto as Object,
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
      tags: ["Clinic"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Change status for clinic",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: FromDtoToSchema.getShemas().UpdateClinicDto as Object,
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
      tags: ["Clinic"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "This endpoint delete your clinic photo",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: FromDtoToSchema.getShemas().UploadDto as Object,
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
      tags: ["Clinic"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "This endpoint upload your clinic photo",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              title: "photo",
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                file: {
                  type: "string",
                  format: "binary",
                },
              },
              required: ["id", "file"],
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
};
