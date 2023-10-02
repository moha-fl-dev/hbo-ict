import type { NextApiRequest, NextApiResponse } from 'next';
import Jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Session } from '@supabase/supabase-js';
import { axionInstance } from '@hbo-ict/query-fns';

/**
 * work in progress
 * @param req
 * @param res
 * @returns
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.cookies;

  if (req.method === 'POST') {
    const token = req.headers.access_token;

    res.status(200).json(token);

    return;
  }

  if (!cookie) {
    res.status(401).json({ message: 'No cookie found' });
    return;
  }

  const { access_token } = cookie;

  if (!access_token) {
    res.status(401).json({ message: 'No access token found' });
    return;
  }

  try {
    const token = access_token.split(' ')[0];

    if (!token) {
      res.status(401).json({ message: 'No token found' });
      return;
    }

    const decodedToken = Jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET as string,
      {
        algorithms: ['HS256'],
      }
    );

    res.status(200).json(decodedToken);
    return;
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      const result = axionInstance.post('refresh-token', {
        headers: {
          noAuth: true,
        },
      });

      if (!result) {
        return res.status(401).json({ message: 'No refresh token found' });
      }

      return res.status(200).json({ message: 'Token refreshed' });
    }

    return res.status(401).send(error);
  }
}
