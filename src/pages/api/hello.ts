// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withAuthorization from "@/utils/withAuthorization";
import prisma from "@/lib/prisma";

type Data = {
  message: string;
};

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  user: any
) {
  // console.log(user);

  // // const newCategory = await prisma.category.create({
  // //   data: {
  // //     color: "test",
  // //     title: "test",
  // //     userId: user.userId,
  // //   },
  // // });

  // const data = await prisma.user.findUnique({
  //   where: {
  //     userId: user.userId,
  //   },
  //   include: {
  //     category: true,
  //   },
  // });

  res.status(200).json({
    message: "OK",
  });
});
