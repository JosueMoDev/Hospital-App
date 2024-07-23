import { OpenAPIV3 } from "openapi-types";
import { GlobasSchemas } from "../fromDtoToSchema";

type ClinicAssignmentPaths = {
  create: OpenAPIV3.PathItemObject;
  update: OpenAPIV3.PathItemObject;
  assigned_doctors: OpenAPIV3.PathItemObject;
  assignable_doctors: OpenAPIV3.PathItemObject;
  delete: OpenAPIV3.PathItemObject;

};

export const clinicAssignment: ClinicAssignmentPaths = {
  create: {
    post: {
      tags: ["Clinic Assignment"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Assing doctor for a clinic",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: GlobasSchemas.ClinicAssignmentDto,
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
  update: {
    patch: {
      tags: ["Clinic Assignment"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Update assigned doctor for clinic",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: GlobasSchemas.ClinicAssignmentDto,
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
  assignable_doctors: {
    get: {
      tags: ["Clinic Assignment"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Get all doctor who are avialable to assign a clinic",
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
  assigned_doctors: {
    patch: {
      tags: ["Clinic Assignment"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: "Get doctors assigned to a clinic",
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
  delete: {
    patch: {
      tags: ["Clinic Assignment"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary:
        "This endpoint let you delete a sigle doctor assigned a clinic or many them",
      requestBody: {
        required: true,
        content: {
          "application/json": {

            schema: GlobasSchemas.ClinicAssignmentDto
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
