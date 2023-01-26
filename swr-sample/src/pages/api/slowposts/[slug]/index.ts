// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${req.query.slug}`)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        res.status(200).json({ data });
      }, 5000);
    });
}
