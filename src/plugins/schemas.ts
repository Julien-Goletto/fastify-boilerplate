import { schemasCollection } from "../modules";
import { FastifyPluginCallback } from "fastify";
import plugin from 'fastify-plugin';

const schemasPlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  for (const schemaCategory of schemasCollection){
    for (const schema in schemaCategory){
      fastify.addSchema({...schemaCategory[schema]});
    }
  }
  done();
};

export default plugin(schemasPlugin);
