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
        const { title, description, deadline, repeat, todoListId } = req.body;
        const newTask = await prisma.task.create({
          data: {
            title,
            description,
            deadline,
            repeat,
            todoListId,
          },
        });

        res.status(201).json(newTask);
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(401).json('error');
  }
});
