import { FastifyInstance } from "fastify";
import userHandler from "./user.handler";
import routesSchemas from "./user.route.schema";

const userRoutes = async (server: FastifyInstance) => {
  server
    .route({
      method: 'GET',
      url: '/',
      schema: routesSchemas.getUsers,
      handler: userHandler.getUsers,
    })
};

export default userRoutes;