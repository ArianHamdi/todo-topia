// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validate } from "@twa.js/init-data-node";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    validate(req.headers.authorization!, process.env.BOT_API_TOKEN!);
  } catch (err) {
    console.log("err", err);
  }
  res.status(200).json({ name: "John Doe" });
}
