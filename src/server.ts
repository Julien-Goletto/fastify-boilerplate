import Fastify from "fastify";
import { routes } from "./modules";
import prismaPlugin from "./plugins/prisma";
import schemasPlugin from './plugins/schemas';

const createServer = () => {
  const fastifyInstance = Fastify({ logger: false });
  //Schemas
  fastifyInstance.register(schemasPlugin);
  //Plugins
  fastifyInstance.register(prismaPlugin);
  //Routes
  for (const routeSubCategory of routes){
    fastifyInstance.register(routeSubCategory.routes, {prefix: routeSubCategory.prefix});
  }
  fastifyInstance.get('/api/ping', async () => ({status: 'API ready for requests', schemas: fastifyInstance.getSchemas()}));

  return fastifyInstance;
};

export default createServer;