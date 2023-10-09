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
  try {
    switch (req.method) {
      case 'POST':
        // Handle HTTP POST request (create a new task)
        const { title, description, deadline, todoListId } = req.body; // Extract task data from the request body

        // Validate the extracted data using the taskSchema
        await taskSchema.validate({
          title,
          description,
          deadline,
          status: false,
        });

        // Create a new task in the database
        const newTask = await prisma.task.create({
          data: {
            ...req.body,
            userId: userId,
          },
        });

        // Update the 'left' count of the associated todoList
        await prisma.todoList.update({
          where: {
            id: todoListId.toString(),
          },
          data: {
            left: {
              increment: 1,
            },
          },
        });

        res.status(201).json(newTask); // Respond with the newly created task
        break;

      case 'GET':
        // Handle HTTP GET request (fetch tasks for a user)
        const data = await prisma.task.findMany({
          where: {
            userId: userId,
          },
        });

        res.status(200).json(data); // Respond with the fetched task data
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during execution
    res.status(401).json('error'); // Respond with a 401 status code and an error message
  }
});
