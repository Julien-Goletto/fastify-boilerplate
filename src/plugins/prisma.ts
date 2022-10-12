import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { FastifyPluginCallback } from "fastify";
import plugin from 'fastify-plugin';

export type FastifyPrismaClientOptions = Omit<PrismaClientOptions, "__internal">;

const defaultPrismaOptions : FastifyPrismaClientOptions = {
  log: ['query', 'info', 'warn', 'error'],
  };

const prismaPlugin : FastifyPluginCallback< FastifyPrismaClientOptions > = async (fastifyInstance, opts = defaultPrismaOptions, done) => {
  if (fastifyInstance.prisma){
    return console.log('prismaPlugin already registered in this fastify instance.');
  }

  const prisma = new PrismaClient(opts);
  await prisma.$connect();

  fastifyInstance
    .decorate('prisma', prisma)
    .decorateRequest('prisma', {getter: () => fastifyInstance.prisma})
    .addHook('onClose', async(fastifyInstance, done) => {
      await fastifyInstance.prisma.$disconnect();
      done();
    })
  done();
}

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient;
  }
}

export default plugin(prismaPlugin);