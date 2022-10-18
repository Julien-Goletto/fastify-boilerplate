import fastifyJWT from '@fastify/jwt';
import { FastifyPluginCallback, FastifyRequest, FastifyReply } from 'fastify';
import plugin from 'fastify-plugin';
import TokensPayload from '../types/TokensPayload';

declare module '@fastify/jwt' {
  interface FastifyJwtSignOptions {
    key: string;
    expiresIn: string | number;
  }
  interface VerifyOptions {
    onlyCookie: boolean;
  }
  interface FastifyJWT {
    user: TokensPayload;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    accessTokenVerify: (req: FastifyRequest, res: FastifyReply) => void;
    accessRefreshVerify: (req: FastifyRequest, res: FastifyReply) => void;
    checkAuthorization: (req: FastifyRequest, res: FastifyReply) => void;
  }
}

// Attention l'opérateur ! sur le 
const jwtPlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify
    // ! Operator allowed due to envCheck plugin
    .register(fastifyJWT, { secret: process.env.ACCESS_TOKEN_SECRET! })
    .decorate(
      "accessTokenVerify",
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          await req.jwtVerify()
        }
        catch(err) {
          res.send(err);
        }
      }
    )
    .decorate(
      "refreshTokenVerify",
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          await req.jwtVerify({ onlyCookie: true })
        }
        catch(err) {
          res.send(err);
        }
      }
    )
    .decorate(
      "checkAuthorization",
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          await req.jwtVerify();
          if (!req.user.pseudo){
            res.status(403);
            throw new Error('Access restricted to administrators.')
          } 
        }
        catch(err) {
          res.send(err);
        }
      }
    )
  done();
};

export default plugin(jwtPlugin);