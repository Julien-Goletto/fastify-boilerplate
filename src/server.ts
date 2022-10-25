import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./modules";
import cookiePlugin from './plugins/cookie';
import envCheckPlugin from './plugins/envCheck';
import jwtPlugin from './plugins/jwt';
import prismaPlugin from "./plugins/prisma";
import schemasPlugin from './plugins/schemas';

const createServer = async (fastifyInstance: FastifyInstance) => {
  // const fastifyInstance = Fastify({ logger: false });
  //Plugins
  fastifyInstance
    .register(cookiePlugin)
    .register(envCheckPlugin)
    .register(jwtPlugin)
    .register(prismaPlugin)
    .register(schemasPlugin);

  //Routes
  for (const routeSubCategory of routes){
    fastifyInstance.register(routeSubCategory.routes, {prefix: routeSubCategory.prefix});
  }
  fastifyInstance.get('/api/ping', async () => (
    {
      status: 'API ready for requests',
      schemas: fastifyInstance.getSchemas(),
    }
  ));

  return fastifyInstance;
};
export default createServer;