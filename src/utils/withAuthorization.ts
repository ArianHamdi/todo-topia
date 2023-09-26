import { validate } from "@twa.js/init-data-node";
import { NextApiRequest, NextApiResponse } from "next";

export default function withAuthorization(next: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      validate(req.headers.authorization!, process.env.BOT_API_TOKEN!);
      next(req);
    } catch (error) {
      console.log("Unauthorized user");
      res.status(401).json({
        error: "Unauthorized user",
      });
    }
  };
}
