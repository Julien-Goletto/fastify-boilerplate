import bcrypt from 'fastify-bcrypt';
import { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';

const bcryptPlugin: FastifyPluginCallback = async (fastifyInstance, opts, done) => {
  fastifyInstance.register(bcrypt, { saltWorkFactor: 12 });
};

export default plugin(bcryptPlugin);
