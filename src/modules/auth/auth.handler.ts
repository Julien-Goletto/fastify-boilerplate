import { FastifyRequest, FastifyReply  } from "fastify";
import createTokens from '../../utils/createTokens';

type CustomRequest = FastifyRequest<{
  Body: {
    pseudo: string;
    password: string;
  };
}>;

const authHandler = {
  async register (req: CustomRequest, res: FastifyReply) {
    try {
      const { prisma } = req;
      const { pseudo, password } = req.body;

      const user = await prisma.user.findFirst({ where: { pseudo } });
      if (user) {
        res.code(409);
        throw new Error('This pseudo is already registered.');
      }

      // Verification contrainte PW ---------------------------------------------------------------------
      // Hashage du PW ----------------------------------------------------------------------------------

      await prisma.user.create({ data: {pseudo, password, is_admin: false} });
      res
        .code(201)
        .send( { message: `User ${pseudo} created. Please log in.`});
    }
    catch(err){
      res.send(err);
    }
  },
  async login (req: CustomRequest, res: FastifyReply) {
    try {
      const { prisma } = req;
      const { pseudo, password } = req.body;

      const user = await prisma.user.findUnique(
        { 
          where: { pseudo },
          select: { id: true, pseudo: true, password: true, is_admin: true },
        });
      if (!user) {
        res.code(404);
        throw new Error('This user is not registered yet.');
      }
      // remplacer par vérification du hashage
      if (password !== user.password){
        res.code(401);
        throw new Error('Wrong password, please retry.');
      }
      const userObject = {
        id: user.id,
        pseudo: user.pseudo,
        is_admin: user.is_admin || false,
      };
      const [accessToken, refreshToken] = await createTokens(userObject, res);
      res
        .code(200)
        .cookie('refreshToken', refreshToken)
        .send( { user: userObject, accessToken, response: `Welcome back ${pseudo}.` });
    }
    catch(err){
      res.send(err);
    }
  },
}

export default authHandler;