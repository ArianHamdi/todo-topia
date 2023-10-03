import prisma from '@/lib/prisma';
import { categorySchema } from '@/schema';
import { ICategory } from '@/types';
import withAuthorization from '@/utils/withAuthorization';
import { Category } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  try {
    console.log('category', userId);
    switch (req.method) {
      case 'GET':
        const data = await prisma.category.findMany({
          where: {
            userId,
          },
          include: {
            todoLists: true,
          },
        });

        res.status(200).json(data);
        break;

      case 'POST':
        const { color, title } = req.body;

        await categorySchema.validateAsync({ color, title });

        const newCategory = await prisma.category.create({
          data: {
            color,
            title,
            userId,
          },
        });

        res.status(201).json(newCategory);
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json('Error');
  }
});
