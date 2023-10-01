import type { NextApiRequest, NextApiResponse } from 'next';
import Jwt from 'jsonwebtoken';
import { Session } from '@supabase/supabase-js';

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

    console.log({ token });

    const decodedToken = Jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET as string,
      {
        algorithms: ['HS256'],
      }
    );

    res.status(200).json(decodedToken);
    return;
  } catch (error) {
    return res.status(401).send(error);
  }
}
