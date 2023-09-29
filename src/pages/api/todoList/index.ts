import prisma from "@/lib/prisma";
import withAuthorization from "@/utils/withAuthorization";
import { NextApiRequest, NextApiResponse } from "next";

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: any
) {
  switch (req.method) {
    case "POST":
      const { title, categoryId } = req.body;
      const TodoList = prisma.todoList.create({
        data: {
          userId,
          title,
          catrgoryId: categoryId,
        },
      });

      res.status(200).json({
        data: TodoList,
      });
      break;

    default:
      break;
  }
});
