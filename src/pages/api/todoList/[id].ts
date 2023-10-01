import prisma from '@/lib/prisma';
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

        res.status(201).json(todoList);
        break;

      case 'DELETE':
        const deletedTodoList = await prisma.todoList.delete({
          where: {
            id: idAsString,
          },
        });

        res.status(200).json('Success');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json('Error');
  }
});
