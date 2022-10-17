import { FastifyInstance } from "fastify";
import userHandler from "./user.handler";
import userRoutesSchemas from "./user.route.schema";

const userRoutes = async (server: FastifyInstance) => {
  server
    .route({
      method: 'GET',
      url: '/',
      schema: userRoutesSchemas.getUsers,
      handler: userHandler.getUsers,
    })
};

export default userRoutes;