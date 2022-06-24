import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const getSurgeon = async () => {
  const client = new Redis(process.env.REDIS_URL!);
  const surgeon = await client.get('surgeon');
   //await client.disconnect();
  return surgeon;
  //return "David Smith, D.V.M., #6901005915";
}

const setSurgeon = async (surgeon: string) => {
  try {
    const client = new Redis(process.env.REDIS_URL!);
    await client.set('surgeon', surgeon);
  } catch (e) {
    console.log(e);
  }
  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const json = JSON.parse(req.body);
    await setSurgeon(json.surgeon);
    res.status(200).send('OK');
  } else {
    const surgeon = await getSurgeon();
    res.status(200).json({ surgeon: surgeon});
  }
}
