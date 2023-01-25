// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((d) => {
      res.status(200).json({ data: d });
    });
}
