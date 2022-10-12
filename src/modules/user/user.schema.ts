import { FastifySchema } from "fastify";

export interface RouteSchemasCollection {
  [key: string]: FastifySchema;
}
export interface SchemasCollection {
  [key: string]: {
    $id: string;
    type: string;
    properties: {
      [key: string]: string,
    };
    required: string[];
  }
}

const userSchemas : SchemasCollection = {
  getUsers : {
    $id: 'getUsers',
    type: 'object',
    properties:{
      id: 'number',
      pseudo: 'string',
      mail: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
    required: [ 'id', 'pseudo', 'mail', 'createdAt', 'updatedAt' ],
  },
};

export const routesSchemas : RouteSchemasCollection = {
  getUsers : {
    response: {
      200: {
        type: 'array',
        properties: {
          id: 'int',
          pseudo: 'string',
          mail: 'string',
          createdAt: 'DateTime',
          updatedAt: 'DateTime',
        }
      }
    }
  },
};

export default userSchemas;