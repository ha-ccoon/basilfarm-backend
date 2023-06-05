import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  isAccessTokenExpired,
  isRefreshTokenExpired,
  issueAccessToken,
  getTokens,
} from './verify-tokens.js';
dotenv.config();

export const verifySignInStatus = (req, res, next) => {
  const { accessToken, refreshToken } = getTokens(req, res);

  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);

  isAccessTokenExpired(accessToken, refreshToken, req, res, next);
};
