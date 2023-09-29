import withAuthorization from "@/utils/withAuthorization";
import { NextApiRequest, NextApiResponse } from "next";

export default withAuthorization(function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) {
  
    switch (req.method) {
        case 'GET':
            
            break;
    
        default:
            break;
    }






});
