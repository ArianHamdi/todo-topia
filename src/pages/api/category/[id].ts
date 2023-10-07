import prisma from '@/lib/prisma';
import { categorySchema } from '@/schema';
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
        const { color, title } = req.body;
        await categorySchema.validate({ color, title });

        await prisma.category.update({
          where: {
            id: idAsString,
          },
          data: {
            color,
            title,
          },
        });

        res.status(201).json('success');
        break;

      case 'DELETE':
        await prisma.category.delete({
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
