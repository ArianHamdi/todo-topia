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
      case 'POST':
        const { title, categoryId } = req.body;
        const todoList = await prisma.todoList.create({
          data: {
            userId,
            title,
            categoryId,
          },
        });
        res.status(201).json(todoList);
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(401).json('error');
  }
});
