import type { NextApiRequest, NextApiResponse } from 'next';
import Jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import https from 'https';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = req.cookies;

  if (req.method != 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (!cookie) {
    res.status(401).json({ message: 'No cookie' });
    return;
  }

  const { refresh_token, access_token } = cookie;

  //  refresh token has no expiry date but can only be used once. but it must be present.
  if (!refresh_token || typeof refresh_token === undefined) {
    console.log('no refresh token');
    res.status(401).json({ message: 'No refresh token' });
    return;
  }

  try {
    if (!access_token) {
      throw new JsonWebTokenError('Token expired');
    }

    const { header, payload, signature } =
      extractSignedTokenParts(access_token);

    const token = `${header}.${payload}.${signature}`;

    Jwt.verify(token, process.env.SUPABASE_JWT_SECRET as string, {
      algorithms: ['HS256'],
    });
    console.log('Token has not expired');

    res.setHeader('Authorization', `Bearer ${token}`);
    res.setHeader('refresh_token', refresh_token);

    res.status(200).json({ message: 'Token has not expired' });
    return;
  } catch (error: unknown) {
    // if (
    //   error instanceof TokenExpiredError ||
    //   error instanceof JsonWebTokenError
    // ) {
    //   try {
    //     const httpsAgent = new https.Agent({
    //       rejectUnauthorized: false,
    //     });

    //     const result = await axios.get('auth/refresh-token', {
    //       baseURL: process.env.NEXT_PUBLIC_API_URL,
    //       headers: {
    //         cookie: `refresh_token=${refresh_token}`,
    //       },
    //       withCredentials: true,
    //       httpsAgent,
    //     });

    //     res.setHeader('Authorization', `Bearer ${result.data.access_token}`);
    //     console.log('Token refreshed', { newToken: result.data.access_token });
    //     res.status(result.status).json({ message: result.data.message });
    //     return;
    //   } catch (error: unknown) {
    //     res.status(400).json({ message: 'Token invalid', error });
    //     return;
    //   }
    // }

    res.status(401).json({ message: 'Token Expired', error });
    return;
  }
}

/**
 * Extract the signed token parts from the access token.
 * @param access_token string
 */
function extractSignedTokenParts(access_token: string | undefined) {
  /**
   * Check if the token is present and if it is a signed token.
   * If not throw an error.
   */
  if (!access_token || !access_token.includes('s:')) {
    throw new JsonWebTokenError('Malformed token');
  }

  /**
   * Split the token on the s: part.
   * The first part(s:) indicates that the token is signed.
   */
  const [, signedToken] = access_token.split('s:');

  /**
   * check if the token contains the required parts.
   * first 3 parts are required.
   * the 4th part is optional. it is the encoding of the signature.
   */
  if (!signedToken || signedToken.split('.').length !== 4) {
    throw new Error('Malformed signed token');
  }

  /**
   * Split the token on the .
   * The first part is the header.
   * The second part is the payload.
   * The third part is the signature.
   * The fourth part is the signature encoding.
   */
  const [header, payload, signature, signatureEncoding] =
    signedToken.split('.');

  return { header, payload, signature, signatureEncoding };
}
