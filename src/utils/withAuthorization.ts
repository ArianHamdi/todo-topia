import { validate } from '@tma.js/init-data-node';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

// This function is a middleware that adds authorization checks to your Next.js API route.
export default function withAuthorization(next: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      // Validate the authorization header using the BOT_API_TOKEN.
      validate(req.headers.authorization!, process.env.BOT_API_TOKEN!);

      // Parse the user data from the authorization header.
      const urlParams = new URLSearchParams(req.headers.authorization);
      const userData = JSON.parse(urlParams.get('user')!);
      console.log(userData.id);

      if (req.cookies.token) {
        // If a token exists in cookies, verify it using the BOT_API_TOKEN.
        const decoded = jwt.verify(
          req.cookies.token,
          process.env.BOT_API_TOKEN!
        ) as JwtPayload;
      } else {
        // If there's no token in cookies, create a new token and associate it with the user.
        const signToken = jwt.sign(
          { id: userData.id },
          process.env.BOT_API_TOKEN!
        );

        // Check if the user exists in the database, and create if not.
        const user = await prisma.user.findUnique({
          where: {
            userId: userData.id.toString(),
          },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              userId: userData.id.toString(),
              categories: {
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

        // Set the newly created token in cookies for future requests.
        res.setHeader('Set-Cookie', `token=${signToken}; Path=/; HttpOnly`);
      }

      // Call the next middleware or API handler with the user's ID.
      next(req, res, userData.id.toString());
    } catch (error) {
      console.log(error);
      console.log('Unauthorized user');

      // Respond with a 401 Unauthorized status and an error message.
      res.status(401).json({
        error: 'Unauthorized user',
      });
    }
  };
}
