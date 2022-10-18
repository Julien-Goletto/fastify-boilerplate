import { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';

console.log(process.env.ACCESS_TOKEN_SECRET);

// Attention l'opérateur ! sur le 
const envCheckPlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify
    try {
      if (!process.env.DATABASE_URL) throw new Error ('Env variable DATABASE_URL could not be found.');
      if (!process.env.ACCESS_TOKEN_SECRET) throw new Error ('Env variable ACCESS_TOKEN_SECRET could not be found.');
      if (!process.env.REFRESH_TOKEN_SECRET) throw new Error ('Env variable REFRESH_TOKEN_SECRET could not be found.');
    }
    catch(err){
      console.error(err);
    }
  done();
};

export default plugin(envCheckPlugin);