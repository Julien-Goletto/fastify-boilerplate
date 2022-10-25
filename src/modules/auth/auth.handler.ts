import { FastifyRequest, FastifyReply  } from "fastify";
import createTokens from '../../utils/createTokens';
import TokensPayload from '../../types/TokensPayload';

type CustomRequest = FastifyRequest<{
  Body: {
    pseudo: string;
    password: string;
  };
}>;

const passwordRegExp = '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{12,}$';

// Using HTTPS allows to uncomment secure: true option
const cookieConfig = { signed: true, /*secure: true,*/ httpOnly: true, sameSite: true };

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
      // Password strength check
      if(!password.match(passwordRegExp)){
        res.code(400);
        throw new Error('Unsufficient password strength. The password should contain at least 12 characters, no space, one uppercase, one number and one special character among these ones: ! @ # $ % ^ & * ( ) \ -_ + .')
      }
      const hashedPassword = await req.bcryptHash(password);
      await prisma.user.create({ data: {pseudo, password: hashedPassword, is_admin: false} });
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
      const { prisma, body: {pseudo, password} } = req;
      const user = await prisma.user.findUnique(
        { 
          where: { pseudo },
          select: { id: true, pseudo: true, password: true, is_admin: true },
        });
      if (!user) {
        res.code(404);
        throw new Error('This user is not registered yet.');
      }
      if (await req.bcryptCompare(user.password, password)){
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
        .setCookie('refreshToken', refreshToken, { ...cookieConfig })
        .send( { user: userObject, accessToken, response: `Welcome back ${pseudo}.` });
    }
    catch(err){
      res.send(err);
    }
  },
  async refreshTokens (req: FastifyRequest, res: FastifyReply) {
    try{
      //First safeguard : token validation on router-side
      const { prisma, user: {id, pseudo, is_admin, iat: refreshTokenIAT} } = req;
      // Second safeguard : are tokens emmitted at the same time ?
      const {iat: accessTokenIAT} : TokensPayload = await req.jwtDecode();
      if(refreshTokenIAT !== accessTokenIAT){
        res.code(401);
        throw new Error('Compromised authentication.')
      }
      // Third safeguard : is the user still a registered member ?
      const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, pseudo: true, is_admin: true},
      });
      if (!user || user.pseudo !== pseudo || user.is_admin !== is_admin) {
        res.code(401);
        throw new Error('Compromised authentication.');
      }
      const [accessToken, refreshToken] = await createTokens({id, pseudo, is_admin}, res);
      res
        .code(200)
        .setCookie('refreshToken', refreshToken, { ...cookieConfig})
        .send( { accessToken, response: `Tokens successfully refreshed.` });
    }
    catch(err){
      res.send(err);
    }
  },
}

export default authHandler;