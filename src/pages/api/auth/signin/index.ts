import { UnauthorizedError } from '@/errors/api';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  user: Pick<User, 'id' | 'email' | 'name'> | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const email = req.body?.email || '';
    const password = req.body?.password || '';
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    const matched = bcrypt.compareSync(password, user.hashed_password || '');
    if (matched) {
      const { id, email, name } = user;
      res.status(200).json({
        user: {
          id,
          email,
          name,
        },
      });
    } else {
      throw new UnauthorizedError();
    }
  } catch (_error) {
    res.status(401).json({
      user: null,
    });
  }
}
