import Payload from '../types/TokensPayload';
import { FastifyReply } from 'fastify';

const createTokens = async (payload: Payload,res: FastifyReply) => {
  // Destructuring is compulsary for passing payload props to serialized JSON format
  const accessToken = await res.jwtSign({ ...payload });
  // ! operator allowed thanks to env check plugin
  const refreshToken = await res.jwtSign({ ...payload }, { key: process.env.REFRESH_TOKEN_SECRET!, expiresIn: '1d' });
  return [accessToken, refreshToken];
};

export default createTokens;

