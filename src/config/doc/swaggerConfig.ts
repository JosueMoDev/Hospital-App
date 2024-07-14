import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { Environment } from "../envs";
import { OpenAPIV3 } from "openapi-types";
import { apiPath } from "./apiPaths";
import { createAccountDtoSchema, updateAccountDtoSchema } from "../../domain";

const swaggerOptions: OpenAPIV3.Document = {
  openapi: "3.1.1",
  info: {
    title: "THE CLINIC API - BUILD CON NODE AND EXPRESS.JS",
    version: "1.0.1",
    description:
      "This is the official documentation for a RESTful API built with Node.js, Express and MongoDB. It uses Prisma ORM and TypeScript, strictly following domain-driven design (DDD) principles.",
  },
  servers: [
    {
      url: `http://localhost:${Environment.PORT}/api/`,
      description: "Development server",
    },
  ],
  paths: apiPath,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      CreateAccountDto: createAccountDtoSchema as Object,
      UpdateAccountDto: updateAccountDtoSchema as Object,
    },
  },
};


export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
};
