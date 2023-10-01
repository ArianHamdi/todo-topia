import prisma from '@/lib/prisma';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      const idAsString = Array.isArray(id) ? id[0] : id;
      const TodoList = prisma.todoList.findUnique({
        where: {
          id: idAsString,
        },
      });

      res.status(200).json({
        data: TodoList,
      });
      break;

    case 'POST':
      break;
  }
});
