import cookie from '@fastify/cookie';
import { FastifyPluginCallback } from "fastify";
import plugin from 'fastify-plugin';

const signature = 'MySecretRecipe';

const cookiePlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.register(cookie, { secret: signature });
  done();
};

export default plugin(cookiePlugin);
