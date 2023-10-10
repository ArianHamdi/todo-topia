import prisma from '@/lib/prisma';
import { todoListSchema } from '@/schema';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

// Define and export an async function as the API handler, wrapped in authorization middleware
export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // Extract the "id" parameter from the request query
  const idAsString = Array.isArray(id) ? id[0] : id; // Ensure "id" is a string

  try {
    switch (req.method) {
      case 'GET':
        // Handle HTTP GET request (fetch a todoList by ID)
        const todoList = await prisma.todoList.findUnique({
          where: {
            id: idAsString,
          },
          include: {
            tasks: true,
          },
        });

        res.status(200).json(todoList); // Respond with the fetched todoList
        break;

      case 'PUT':
        // Handle HTTP PUT request (update a todoList)
        const { title, categoryId, description } = req.body; // Extract updated todoList data from the request body

        // Validate the extracted data using the todoListSchema
        await todoListSchema.validate({
          title,
          categoryId,
        });

        // Update the todoList in the database
        await prisma.todoList.update({
          where: { id: idAsString },
          data: { title, categoryId, description },
        });

        res.status(201).json('success'); // Respond with a success message
        break;

      case 'DELETE':
        // Handle HTTP DELETE request (delete a todoList)
        await prisma.todoList.delete({
          where: {
            id: idAsString,
          },
        });

        res.status(204).json('Success'); // Respond with a success message
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during execution
    res.status(400).json('Error'); // Respond with a 400 status code and an error message
  }
});
