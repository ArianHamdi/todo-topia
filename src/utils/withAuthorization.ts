import { validate } from "@twa.js/init-data-node";
import { NextApiRequest, NextApiResponse } from "next";
import getUser from "@/utils/getUser";
import prisma from "@/lib/prisma";

export default function withAuthorization(next: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      validate(req.headers.authorization!, process.env.BOT_API_TOKEN!);
      const urlParams = new URLSearchParams(req.headers.authorization);
      const userData = JSON.parse(urlParams.get("user")!);
      const user = await getUser(userData.id);

      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            userId: userData.id.toString(),
          },
        });

        next(req, res, newUser);
      } else {
        next(req, res, user);
      }
    } catch (error) {
      console.log("Unauthorized user");

      res.status(401).json({
        error: "Unauthorized user",
      });
    }
  };
}
