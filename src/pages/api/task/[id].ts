import prisma from '@/lib/prisma';
import { taskSchema } from '@/schema';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

// Define and export an async function as the API handler, wrapped in authorization middleware
export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  const { id } = req.query; // Extract the "id" parameter from the request query
  const idAsString = Array.isArray(id) ? id[0] : id; // Ensure "id" is a string

  try {
    switch (req.method) {
      case 'PUT':
        // Handle HTTP PUT request (update a task)
        const { title, description, deadline, repeat, todoListId, status } =
          req.body; // Extract task data from the request body

        // Validate the extracted data using the taskSchema
        await taskSchema.validate({
          title,
          description,
          deadline,
          repeat,
          status,
        });

        // Fetch the existing task from the database
        const task = await prisma.task.findUnique({
          where: {
            id: idAsString,
          },
        });

        // Check if the task's status has changed and update related todoList accordingly
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

        // Update the task in the database
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

        res.status(201).json('success'); // Respond with a success message
        break;

      case 'DELETE':
        // Handle HTTP DELETE request (delete a task)
        await prisma.task.delete({
          where: {
            id: idAsString,
          },
        });

        res.status(204).json('success'); // Respond with a success message
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during execution
    res.status(400).json('error'); // Respond with a 400 status code and an error message
  }
});
