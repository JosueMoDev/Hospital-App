import 'reflect-metadata';
import { AppRoutes, Server } from './presentation';
import { Environment } from './config';

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: Environment.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
