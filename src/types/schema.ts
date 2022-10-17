import { FastifySchema } from "fastify";

export interface Schema {
  $id: string;
  type: string;
  properties: object;
  required: string [];
}

export interface SchemasCollection {
  [key: string] : Schema;
}

export interface RouteSchemasCollection {
  [key: string]: FastifySchema;
}