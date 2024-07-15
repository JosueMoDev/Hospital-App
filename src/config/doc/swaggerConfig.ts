import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { Environment } from "../envs";
import { OpenAPIV3 } from "openapi-types";
import { FromDtoToSchema } from "./fromDtoToSchema";
import * as paths from './api';

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
  paths: {
    //! Authentication Paths
    "/authentication/login": paths.authentication.login,
    "/authentication/refresh-token": paths.authentication.refresh_token,

    // !Account Paths
    "/account/create": paths.account.create,
    "/account/update": paths.account.update,
    "/account/find-one/{id}": paths.account.find_one,
    "/account/find-by-document/{document}": paths.account.find_by_document,
    "/account/find-many": paths.account.find_many,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: FromDtoToSchema.getShemas() as any,
  },
};

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
};
