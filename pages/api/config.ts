import { NextApiRequest, NextApiResponse } from "next";

const getSurgeon = async () => {
  return "David Smith, D.V.M., #6901005915";
}

const setSurgeon = async (surgeon: string) => {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const value = req.body.surgeon;
    await setSurgeon(value);
    res.status(200).send('OK');
  } else {
    const surgeon = await getSurgeon();
    res.status(200).json({ surgeon: surgeon});
  }
}
