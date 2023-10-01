import prisma from '@/lib/prisma';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  try {
    switch (req.method) {
      case 'GET':
        const data = await prisma.category.findMany({
          where: {
            userId,
          },
          include: {
            TodoList: true,
          },
        });
        res.status(200).json({
          data,
        });

        break;
      case 'POST':
        const { color, title } = req.body;

        const newCategory = await prisma.category.create({
          data: {
            color,
            title,
            userId,
          },
        });

        res.status(200).json({
          newCategory,
        });
        break;
    }
  } catch (error) {
    res.status(400).json({
      //should be fixed
      error: 'Error',
    });
  }
});
