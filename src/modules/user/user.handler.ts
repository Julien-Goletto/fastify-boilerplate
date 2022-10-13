import { FastifyReply, FastifyRequest } from "fastify";

const userHandler = {
  async getUsers(req: FastifyRequest, res: FastifyReply) {
    try {
      const { prisma } = req;
      const users = await prisma.user.findMany({
        orderBy: {id: 'asc'},
        select: {
          id: true,
          pseudo: true,
          is_admin: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.send({users: users});
    }
    catch(err){
      console.error(err);
    }
  },
}

export default userHandler;