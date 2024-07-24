import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import { ExpressFileUploadAdapter } from '../config/adapters/expressFileUploadAdapter';
import { setupSwagger } from '../config';
import logger from '../config/adapters/winstonLogger.adapter';

interface serverConfig {
  port: number;
  routes: Router;
}

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true, // Habilita las cookies a través de las solicitudes CORS
  exposedHeaders: ['Authorization'], // Añade 'Authorization' a los encabezados expuestos
};

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(args: serverConfig) {
    const { port, routes } = args;

    (this.port = port), (this.routes = routes);
  }

  async start() {
    //* Middlewares
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //! x-www-form-urlencoded
    this.app.use(compression());
    this.app.use(ExpressFileUploadAdapter.configure());
    //* Routes
    this.app.use('/api', this.routes);
    // * Swagger Documentation API
    setupSwagger(this.app);
    this.serverListener = this.app.listen(this.port, () =>
      logger.info(`Server running on port ${this.port}`),
    );
  }

  public close() {
    this.serverListener?.close();
  }
}
