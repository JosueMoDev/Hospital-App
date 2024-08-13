# 🏥 The Clinic - Backend System

A simulation of a clinic management system where users can manage appointments, patients, and medical staff. The system includes roles for Administrators, Doctors, and Patients, allowing them to perform tasks such as scheduling appointments, managing patient records, and more.

## ✨ Features

- **Administrator Role:**
  - Manage users (doctors, patients) with roles, permissions, and credentials.
  - Oversee clinic operations and generate reports.
  - Add and manage medical services provided by the clinic.

- **Doctor Role:**
  - View their appointment schedule.
  - Manage patient records, including medical history, prescriptions, and notes.
- **Patient Role:**
  - Schedule appointments with available doctors.
  - View their medical records and appointment history.

## 🛠️ Technologies

- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
  - MongoDB
  - Prisma ORM
  - Swagger for API documentation
  - Class-validator and class-transformer for data validation and transformation

## ⚙️ Setup

### 1. **Clone the repository:**

  ```bash
  git clone https://github.com/JosueMoDev/node-express-api-rest
  cd node-express-api-rest
  ```

### 2. **Install dependencies:**

  ```bash
  yarn install
  ```

### 3. **Rename the `.env.template` file to `.env` and configure the following variables:**

  ```env
    PORT=
    SECRET_KEY_JWT=
    
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    MONGO_URL=
  ```

# Obtain Cloudinary Credentials

1. **Create a Cloudinary Account**

   If you don't have an account yet, sign up at [Cloudinary](https://cloudinary.com/). Complete the registration process by providing your email and creating a password.

2. **Log in to the Cloudinary Dashboard**

   Once you have created your account, log in to [your Cloudinary account](https://cloudinary.com/console) using your credentials.

3. **Access the Settings Panel**

   In the Cloudinary dashboard, click on the user icon (usually in the upper right corner) and select **"Account"**.

4. **Obtain the Cloud Name (CLOUDINARY_CLOUD_NAME)**

   - Go to the **"Dashboard"** tab in the left sidebar.
   - Look for the **"Cloud name"** section. There you will find your **CLOUDINARY_CLOUD_NAME**.

5. **Obtain the API Key (CLOUDINARY_API_KEY)**

   - Within the same **"Dashboard"** section, look for **"API Key"**. Copy the key value, which will be your **CLOUDINARY_API_KEY**.

6. **Obtain the API Secret (CLOUDINARY_API_SECRET)**

   - In the **"Settings"** tab in the left sidebar, go to the **"Security"** section.
   - In **"API Secret"**, you will see your **CLOUDINARY_API_SECRET**. For security reasons, you may need to click **"Show"** to see the full value.

7. **Store the Credentials Securely**

   Make sure to store **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, and **CLOUDINARY_API_SECRET** in a safe place. You can save them in a `.env` file for use in your application.

   ```env
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
    ```
 ## 5. **Generate Prisma Client:**

  ```bash
  npx prisma generate
  ```

## 6. **Run the seed script:**

  ```bash
  yarn seed
  ```

  **Important:** Running the seed script is crucial as it populates the database with initial data required for the application to function correctly. This includes default users, medical services, and other necessary records to get started.

  ```bash
  {
    "email": "admin@clinic.com",
    "password": "Admin@123"
  }
  ```

    You can log in with this user to start managing the clinic system right away.

## 7. **Run the development server:**

  ```bash
  yarn dev
  ```

## 🚀 Usage

- Access the API at [http://localhost:3000](http://localhost:3000)
- Use the provided Postman collection to test the endpoints.

## 📜 API Documentation

The API is documented using Swagger. You can access the documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📄 License

This project is licensed under the MIT License.

# Package Information

Claro, aquí tienes la lista de dependencias y devDependencies con los números corregidos:

## Dependencies

1. **@prisma/client**
   - Description: Prisma Client is an auto-generated query builder for TypeScript and Node.js.
   - Version: 5.5.2
   - [Yarn Page](https://yarnpkg.com/package/@prisma/client)

2. **@types/compression**
   - Description: Type definitions for compression middleware.
   - Version: ^1.7.5
   - [Yarn Page](https://yarnpkg.com/package/@types/compression)

3. **@types/swagger-ui-express**
   - Description: Type definitions for swagger-ui-express, middleware to serve Swagger API documentation.
   - Version: ^4.1.6
   - [Yarn Page](https://yarnpkg.com/package/@types/swagger-ui-express)

4. **@typescript-eslint/eslint-plugin**
   - Description: ESLint plugin for TypeScript code linting.
   - Version: ^7.17.0
   - [Yarn Page](https://yarnpkg.com/package/@typescript-eslint/eslint-plugin)

5. **@typescript-eslint/parser**
   - Description: ESLint parser to lint TypeScript code.
   - Version: ^7.17.0
   - [Yarn Page](https://yarnpkg.com/package/@typescript-eslint/parser)

6. **bcryptjs**
   - Description: Library for hashing passwords.
   - Version: ^2.4.3
   - [Yarn Page](https://yarnpkg.com/package/bcryptjs)

7. **class-transformer**
   - Description: Library to transform objects between classes and plain objects.
   - Version: ^0.5.1
   - [Yarn Page](https://yarnpkg.com/package/class-transformer)

8. **class-validator**
   - Description: Library to validate class objects using decorators.
   - Version: ^0.14.0
   - [Yarn Page](https://yarnpkg.com/package/class-validator)

9. **class-validator-jsonschema**
   - Description: Class-validator extension for JSON Schema.
   - Version: ^5.0.1
   - [Yarn Page](https://yarnpkg.com/package/class-validator-jsonschema)

10. **cloudinary**
    - Description: Cloudinary library for managing cloud-based image and video storage.
    - Version: ^1.41.0
    - [Yarn Page](https://yarnpkg.com/package/cloudinary)

11. **compression**
    - Description: Middleware to compress HTTP responses.
    - Version: ^1.7.4
    - [Yarn Page](https://yarnpkg.com/package/compression)

12. **cors**
    - Description: Middleware to enable Cross-Origin Resource Sharing.
    - Version: ^2.8.5
    - [Yarn Page](https://yarnpkg.com/package/cors)

13. **date-fns**
    - Description: Modern JavaScript date utility library.
    - Version: ^2.30.0
    - [Yarn Page](https://yarnpkg.com/package/date-fns)

14. **env-var**
    - Description: Library to parse and validate environment variables.
    - Version: ^7.4.1
    - [Yarn Page](https://yarnpkg.com/package/env-var)

15. **eslint**
    - Description: Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
    - Version: 9.x
    - [Yarn Page](https://yarnpkg.com/package/eslint)

16. **express**
    - Description: Web application framework for Node.js.
    - Version: ^4.18.2
    - [Yarn Page](https://yarnpkg.com/package/express)

17. **express-fileupload**
    - Description: Middleware for handling file uploads.
    - Version: ^1.4.3
    - [Yarn Page](https://yarnpkg.com/package/express-fileupload)

18. **jsonwebtoken**
    - Description: Library to sign, verify, and decode JSON Web Tokens.
    - Version: ^9.0.2
    - [Yarn Page](https://yarnpkg.com/package/jsonwebtoken)

19. **module-alias**
    - Description: Library to handle module aliasing.
    - Version: ^2.2.3
    - [Yarn Page](https://yarnpkg.com/package/module-alias)

20. **openapi-types**
    - Description: Type definitions for OpenAPI specification.
    - Version: ^12.1.3
    - [Yarn Page](https://yarnpkg.com/package/openapi-types)

21. **prettier**
    - Description: Code formatter to ensure consistent style.
    - Version: ^3.3.3
    - [Yarn Page](https://yarnpkg.com/package/prettier)

22. **reflect-metadata**
    - Description: Metadata reflection API for TypeScript.
    - Version: ^0.1.13
    - [Yarn Page](https://yarnpkg.com/package/reflect-metadata)

23. **swagger-ui-express**
    - Description: Middleware to serve Swagger API documentation.
    - Version: ^5.0.1
    - [Yarn Page](https://yarnpkg.com/package/swagger-ui-express)

24. **tsconfig-paths**
    - Description: TypeScript utility to resolve module paths based on `tsconfig.json`.
    - Version: ^4.2.0
    - [Yarn Page](https://yarnpkg.com/package/tsconfig-paths)

25. **winston**
    - Description: A logging library for Node.js.
    - Version: ^3.13.1
    - [Yarn Page](https://yarnpkg.com/package/winston)

## DevDependencies

1. **@eslint/js**
   - Description: Provides a JavaScript code analysis tool to identify problematic patterns in JavaScript code.
   - Version: ^9.7.0
   - [Yarn Page](https://yarnpkg.com/package/@eslint/js)

2. **@types/bcryptjs**
   - Description: Type definitions for bcryptjs, a library to hash passwords.
   - Version: ^2.4.6
   - [Yarn Page](https://yarnpkg.com/package/@types/bcryptjs)

3. **@types/cors**
   - Description: Type definitions for cors middleware.
   - Version: ^2.8.17
   - [Yarn Page](https://yarnpkg.com/package/@types/cors)

4. **@types/express-fileupload**
   - Description: Type definitions for express-fileupload middleware.
   - Version: ^1.4.4
   - [Yarn Page](https://yarnpkg.com/package/@types/express-fileupload)

5. **@types/jest**
   - Description: Type definitions for Jest, a JavaScript testing framework.
   - Version: ^29.5.6
   - [Yarn Page](https://yarnpkg.com/package/@types/jest)

6. **@types/jsonwebtoken**
   - Description: Type definitions for jsonwebtoken library.
   - Version: ^9.0.5
   - [Yarn Page](https://yarnpkg.com/package/@types/jsonwebtoken)

7. **@types/node**
   - Description: Type definitions for Node.js.
   - Version: ^20.8.7
   - [Yarn Page](https://yarnpkg.com/package/@types/node)

8. **jest**
   - Description: A JavaScript testing framework.
   - Version: ^29.7.0
   - [Yarn Page](https://yarnpkg.com/package/jest)

9. **prisma**
   - Description: Prisma is an open-source ORM for Node.js and TypeScript.
   - Version: 5.5.2
   - [Yarn Page](https://yarnpkg.com/package/prisma)

10. **rimraf**
    - Description: Utility for removing files and directories.
    - Version: ^5.0.5
    - [Yarn Page](https://yarnpkg.com/package/rimraf)

11. **supertest**
    - Description: SuperAgent driven library for testing HTTP servers.
    - Version: ^6.3.3
    - [Yarn Page](https://yarnpkg.com/package/supertest)

12. **ts-jest**
    - Description: A Jest transformer that lets you use TypeScript with Jest.
    - Version: ^29.1.1
    - [Yarn Page](https://yarnpkg.com/package/ts-jest)

13. **ts-node-dev**
    - Description: Fast TypeScript execution with automatic restarting.
    - Version: ^2.0.0
    - [Yarn Page](https://yarnpkg.com/package/ts-node-dev)

14. **typescript**
    - Description: A strongly typed programming language that builds on JavaScript.
    - Version: ^5.2.2
    - [Yarn Page](https://yarnpkg.com/package/typescript)

15. **typescript-eslint**
    - Description: TypeScript and ESLint integration.
    - Version: ^7.17.0
    - [Yarn Page](https://yarnpkg.com/package/typescript-eslint)
