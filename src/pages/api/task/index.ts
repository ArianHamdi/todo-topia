import prisma from '@/lib/prisma';
import { taskSchema } from '@/schema';
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
        await taskSchema.validate({
          title,
          description,
          deadline,
          repeat,
        });
        console.log('USER', userId);
        const newTask = await prisma.task.create({
          data: {
            title,
            description,
            deadline,
            repeat,
            todoListId,
            userId: userId,
          },
        });

        await prisma.todoList.update({
          where: {
            id: todoListId.toString(),
          },
          data: {
            left: {
              increment: 1,
            },
          },
        });

        res.status(201).json(newTask);
        break;

      case 'GET':
        const data = await prisma.task.findMany({
          where: {
            userId: userId,
          },
        });

        res.status(200).json(data);

        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(401).json('error');
  }
});
