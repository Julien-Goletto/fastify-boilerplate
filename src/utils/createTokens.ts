import Payload from '../types/TokensPayload';
import { FastifyReply } from 'fastify';

const createTokens = async (payload: Payload,res: FastifyReply) => {
  const accessToken = await res.jwtSign(payload, { expiresIn: 300 } );
  // ! operator allowed thanks to env check plugin
  const refreshToken = await res.jwtSign(payload, { key: process.env.REFRESH_TOKEN_SECRET!, expiresIn: '24h' });
  return [accessToken, refreshToken];
};

export default createTokens;

