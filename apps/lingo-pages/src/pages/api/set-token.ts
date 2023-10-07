import type { NextApiRequest, NextApiResponse } from 'next';
import Jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { setAxiosToken } from '@hbo-ict/query-fns';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = req.cookies;

  if (req.method === 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { access_token } = cookie;

    const { header, payload, signature } =
      extractSignedTokenParts(access_token);

    const token = `${header}.${payload}.${signature}`;

    Jwt.verify(token, process.env.SUPABASE_JWT_SECRET as string, {
      algorithms: ['HS256'],
    });

    setAxiosToken(token);

    res.status(200);
    return;
  } catch (error: unknown) {
    console.log(error);
    res.status(401).json({ message: 'Token invalid', error });
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
