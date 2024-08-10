import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import { ExpressFileUploadAdapter } from '../config/adapters/expressFileUploadAdapter';
import { setupSwagger } from '../config';
import logger from '../config/adapters/winstonLogger.adapter';
import { Server as HttpServer } from 'http';

interface serverConfig {
  port: number;
  routes: Router;
}

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  exposedHeaders: ['Authorization'],
};

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
        port: logger.info(`Server running on port ${this.port}`),
        link: logger.info(`http://localhost:${this.port}/api-docs`),
      }));
    } catch (error) {
      console.log(error)
      logger.error(error);
    }
  }

  public close() {
    this.serverListener?.close();
  }
}
