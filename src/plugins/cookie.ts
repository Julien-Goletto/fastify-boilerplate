import cookie from '@fastify/cookie';
import { FastifyPluginCallback } from "fastify";
import plugin from 'fastify-plugin';

const cookiePlugin: FastifyPluginCallback = async (fastifyInstance, opts, done) => {
  fastifyInstance.register(cookie, { secret: process.env.COOKIE_SECRET });
  done();
};

export default plugin(cookiePlugin);
