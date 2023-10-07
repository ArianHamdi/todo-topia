import prisma from '@/lib/prisma';
import { todoListSchema } from '@/schema';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const idAsString = Array.isArray(id) ? id[0] : id;

  try {
    switch (req.method) {
      case 'GET':
        const todoList = await prisma.todoList.findUnique({
          where: {
            id: idAsString,
          },
          include: {
            tasks: true,
          },
        });

        res.status(200).json(todoList);
        break;

      case 'PUT':
        {
          const { title, categoryId } = req.body;

          await todoListSchema.validate({
            title,
            categoryId,
          });

          await prisma.todoList.update({
            where: { id: idAsString },
            data: { title, categoryId },
          });
        }

        res.status(201).json('success');
        break;

      case 'DELETE':
        await prisma.todoList.delete({
          where: {
            id: idAsString,
          },
        });

        res.status(204).json('Success');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json('Error');
  }
});
