import prisma from '@/lib/prisma';
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
      case 'DELETE':
        const deletedTask = await prisma.task.delete({
          where: {
            id: idAsString,
          },
        });

        res.status(201).json('success');
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json('error');
  }
});
