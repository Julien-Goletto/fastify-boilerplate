import { FastifySchema } from "fastify";

export interface RouteSchemasCollection {
  [key: string]: FastifySchema;
}

const routesSchemas : RouteSchemasCollection = {
  getUsers : {
    response: {
      "200": {
        type: 'object',
        properties : {
          users : {
            type: 'array',
            items: {$ref: 'getUsers#/properties'},
          }
        }
      },
    },
  },
};

export default routesSchemas;