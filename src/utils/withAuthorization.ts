import { validate } from '@twa.js/init-data-node';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function withAuthorization(next: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      validate(req.headers.authorization!, process.env.BOT_API_TOKEN!);
      const urlParams = new URLSearchParams(req.headers.authorization);
      const userData = JSON.parse(urlParams.get('user')!);

      if (req.cookies.token) {
        const decoded = jwt.verify(
          req.cookies.token,
          process.env.BOT_API_TOKEN!
        ) as JwtPayload;
      } else {
        const signToken = jwt.sign(
          { id: userData.id },
          process.env.BOT_API_TOKEN!
        );

        const user = await prisma.user.findUnique({
          where: {
            userId: userData.id.toString(),
          },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              userId: userData.id.toString(),
              category: {
                create: [
                  { title: 'Personal', color: '#0BF33E' },
                  { title: 'Work', color: '#0C6CC0' },
                  { title: 'Sport', color: '#FF5C01' },
                  { title: 'Other', color: '#F0DC28' },
                ].map(el => ({
                  title: el.title,
                  color: el.color,
                })),
              },
            },
          });
        }

        res.setHeader('Set-Cookie', `token=${signToken}; Path=/; HttpOnly`);
      }

      next(req, res, userData.userId);
    } catch (error) {
      console.log(error);
      console.log('Unauthorized user');

      res.status(401).json({
        error: 'Unauthorized user',
      });
    }
  };
}
