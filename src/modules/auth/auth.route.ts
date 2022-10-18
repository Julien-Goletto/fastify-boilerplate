import { FastifyInstance } from "fastify";
import authHandler from './auth.handler';
import authRoutesSchemas from "./auth.route.schema";

const authRoutes = async (server : FastifyInstance) => {
  server
    .route({
      method: 'POST',
      url: '/register',
      schema: authRoutesSchemas.register,
      handler: authHandler.register,
    })
    .route({
      method: 'POST',
      url: '/login',
      schema: authRoutesSchemas.login,
      handler: authHandler.login,
    })
  .route({
    method: 'GET',
    url: '/refreshTokens',
    schema: authRoutesSchemas.refreshTokens,
    handler: authHandler.refreshTokens,
    onRequest: [server.refreshTokenVerify],
  });
};

export default authRoutes;