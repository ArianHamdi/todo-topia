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
  const { id } = req.query; // Extract the "id" parameter from the request query
  const idAsString = Array.isArray(id) ? id[0] : id; // Ensure "id" is a string

  try {
    switch (req.method) {
      case 'PUT':
        // Handle HTTP PUT request (update category)
        const { color, title } = req.body; // Extract color and title from the request body

        // Validate the extracted data using the categorySchema
        await categorySchema.validate({ color, title });

        // Update the category in the database
        await prisma.category.update({
          where: {
            id: idAsString,
          },
          data: {
            color,
            title,
          },
        });

        res.status(201).json('success'); // Respond with a success message
        break;

      case 'DELETE':
        // Handle HTTP DELETE request (delete category)
        await prisma.category.delete({
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
