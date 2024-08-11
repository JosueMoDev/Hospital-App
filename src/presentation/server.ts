import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import { ExpressFileUploadAdapter, WinstonLogger,  } from '@config';
import { Server as HttpServer } from 'http';
import { setupSwagger } from '@api-documentation';

interface serverConfig {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: HttpServer;
  private readonly port: number;
  private readonly routes: Router;

  constructor(args: serverConfig) {
    const { port, routes } = args;

    (this.port = port), (this.routes = routes);
  }

  async start() {
    try {
      //* Middlewares
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(compression());
      this.app.use(ExpressFileUploadAdapter.configure());
      //* Routes
      this.app.use('/api', this.routes);
      // * Swagger Documentation API
      setupSwagger(this.app);
      this.serverListener = this.app.listen(this.port, () => ({
        port: WinstonLogger.Logger.info(`Server running on port ${this.port}`),
        link: WinstonLogger.Logger.info(`http://localhost:${this.port}/api-docs`),
      }));
    } catch (error) {
      WinstonLogger.Logger.error(error);
    }
  }

  public close() {
    this.serverListener?.close();
  }
}
