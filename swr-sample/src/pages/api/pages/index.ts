// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  data: any;
};

type Page = {
  page: number;
};

type PromiseAll = {
  promise: Promise<any>[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const page = query.page || 1;

  const start = req.query.page ? Number(page) * 6 - 5 : 1;
  const end = req.query.page ? Number(page) * 6 : 6;

  const promiseAll: Promise<any>[] = [];
  for (let i = start; i <= end; i++) {
    console.log(`https://jsonplaceholder.typicode.com/posts/${i}`);
    promiseAll.push(
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${i}`)
        .then((res) => res.data)
    );
  }

  await Promise.all(promiseAll).then((data) => {
    res.status(200).json(data);
  });
}
