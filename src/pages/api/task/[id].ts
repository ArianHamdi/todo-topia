import prisma from '@/lib/prisma';
import { taskSchema } from '@/schema';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  const { id } = req.query;
  const idAsString = Array.isArray(id) ? id[0] : id;

  try {
    switch (req.method) {
      case 'PUT':
        const { title, description, deadline, repeat, todoListId, status } =
          req.body;
        await taskSchema.validate({
          title,
          description,
          deadline,
          repeat,
        });

        const task = await prisma.task.findUnique({
          where: {
            id: idAsString,
          },
        });

        if (task?.status !== status && status === true) {
          await prisma.todoList.update({
            where: {
              id: todoListId.toString(),
            },
            data: {
              left: {
                decrement: 1,
              },
              completed: {
                increment: 1,
              },
            },
          });
        } else if (task?.status !== status && status === false) {
          await prisma.todoList.update({
            where: {
              id: todoListId.toString(),
            },
            data: {
              left: {
                increment: 1,
              },
              completed: {
                decrement: 1,
              },
            },
          });
        }

        await prisma.task.update({
          where: {
            id: idAsString,
          },
          data: {
            title,
            description,
            deadline,
            repeat,
            todoListId,
            status,
          },
        });

        res.status(201).json('success');

        break;
      case 'DELETE':
        await prisma.task.delete({
          where: {
            id: idAsString,
          },
        });

        res.status(204).json('success');
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json('error');
  }
});
