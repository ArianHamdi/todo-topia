import prisma from '@/lib/prisma';
import { todoListSchema } from '@/schema';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

// Define and export an async function as the API handler, wrapped in authorization middleware
export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  try {
    switch (req.method) {
      case 'POST':
        // Handle HTTP POST request (create a new todoList)
        const { title, categoryId, description } = req.body; // Extract todoList data from the request body

        // Validate the extracted data using the todoListSchema
        await todoListSchema.validate({ title, categoryId });

        // Create a new todoList in the database
        const todoList = await prisma.todoList.create({
          data: {
            userId,
            title,
            categoryId,
            description,
          },
        });

        res.status(201).json(todoList); // Respond with the newly created todoList
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during execution
    res.status(401).json('error'); // Respond with a 401 status code and an error message
  }
});
