import prisma from '@/lib/prisma';
import { categorySchema } from '@/schema';
import withAuthorization from '@/utils/withAuthorization';
import { NextApiRequest, NextApiResponse } from 'next';

// Define and export an async function as the API handler, wrapped in authorization middleware
export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  try {
    console.log('category', userId); // Log the user ID for debugging

    // Use a switch statement to handle different HTTP methods
    switch (req.method) {
      case 'GET':
        // Handle HTTP GET request
        // Fetch categories associated with the user and include associated todoLists
        const data = await prisma.category.findMany({
          where: {
            userId,
          },
          include: {
            todoLists: true,
          },
        });

        res.status(200).json(data); // Respond with the fetched data
        break;

      case 'POST':
        // Handle HTTP POST request
        const { color, title } = req.body; // Extract color and title from the request body

        // Validate the extracted data using the categorySchema
        await categorySchema.validate({ color, title });

        // Create a new category in the database
        const newCategory = await prisma.category.create({
          data: {
            color,
            title,
            userId,
          },
        });

        res.status(201).json(newCategory); // Respond with the newly created category
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during execution
    res.status(400).json('Error'); // Respond with a 400 status code and an error message
  }
});
