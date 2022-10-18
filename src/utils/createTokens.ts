import Payload from '../types/TokensPayload';
import { FastifyReply } from 'fastify';

const refreshTokenSecret = 'niceSecret4000';

const createTokens = async (payload: Payload,res: FastifyReply) => {
  const accessToken = await res.jwtSign(payload, { expiresIn: 300 } );
  const refreshToken = await res.jwtSign(payload, { key: refreshTokenSecret, expiresIn: '24h' });
  return [accessToken, refreshToken];
};

export default createTokens;

