import { validate } from "@twa.js/init-data-node";
import { NextApiRequest, NextApiResponse } from "next";
import getUser from "@/utils/getUser";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";

export default function withAuthorization(next: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      validate(req.headers.authorization!, process.env.BOT_API_TOKEN!);
      const urlParams = new URLSearchParams(req.headers.authorization);
      const userData = JSON.parse(urlParams.get("user")!);

      if (req.cookies.token) {
        const decoded = jwt.verify(
          req.cookies.token,
          process.env.BOT_API_TOKEN!
        ) as JwtPayload;
      } else {
        const signToken = jwt.sign(
          { id: userData.id },
          process.env.BOT_API_TOKEN!
        );

        const user = await prisma.user.findUnique({
          where: {
            userId: userData.id.toString(),
          },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              userId: userData.id.toString(),
            },
          });
        }

        res.setHeader("Set-Cookie", `token=${signToken}; Path=/; HttpOnly`);
      }

      next(req, res);
    } catch (error) {
      console.log(error);
      console.log("Unauthorized user");

      res.status(401).json({
        error: "Unauthorized user",
      });
    }
  };
}
