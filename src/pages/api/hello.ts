// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withAuthorization from "@/utils/withAuthorization";

type Data = {
  message: string;
};

export default withAuthorization(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  user: any
) {
  // const urlParams = new URLSearchParams(req.headers.authorization);
  // const user = await getUser(urlParams.get("user"));
  console.log(user);
  res.status(200).json({
    message: "OK",
  });
});
