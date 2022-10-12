import { FastifyInstance } from "fastify";
import userHandler from "./user.handler";

const userRoutes = async (server: FastifyInstance) => {
  server
    .route({
      method: 'GET',
      url: '/',
      schema: server.getSchemas(),
      handler: userHandler.getUsers
    })
};

export default userRoutes;