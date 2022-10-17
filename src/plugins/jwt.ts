import fastifyJWT, { JWT } from '@fastify/jwt';
import { FastifyInstance, FastifyPluginCallback, FastifyRequest, FastifyReply } from 'fastify';
import plugin from 'fastify-plugin';
import { access } from 'fs';

const accessTokenSecret = 'niceSecret3000';
const refreshTokenSecret = 'niceSecret4000';

interface Payload {
  id: number;
  pseudo: string;
  is_admin: boolean;
}

declare module '@fastify/jwt' {
  // interface FastifyJWT {
  //   payload: Payload;
  //   user: Payload;
  // }
  interface FastifyJwtSignOptions {
    key: string;
    expiresIn: string | number;
  }
}

const jwtPlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify
    .register(fastifyJWT, { secret: accessTokenSecret })
    .decorate(
      "authenticate",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify()
        }
        catch(err) {
          reply.send(err);
        }
      }
    );
  done();
};

export default plugin(jwtPlugin);

export const refreshTokens = async (payload: Payload,res: FastifyReply) => {
  const accessToken = await res.jwtSign(payload, { expiresIn: 300 } );
  const refreshToken = await res.jwtSign(payload, { key: refreshTokenSecret, expiresIn: '24h' });
  return [accessToken, refreshToken];
}