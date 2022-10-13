import { schemas } from "../modules";
import { FastifyPluginCallback } from "fastify";
import plugin from 'fastify-plugin';

const schemasPlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  for (const schemasCollection of schemas){
    for (const schema in schemasCollection){
      fastify.addSchema({...schemasCollection[schema]});
    }
    done();
  }
};

export default plugin(schemasPlugin);
