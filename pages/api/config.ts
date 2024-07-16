import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

const getRedisClient = () => {
  return new Redis(process.env.REDIS_URL!, {
    connectTimeout: 3000,
  });
};

const getSurgeon = async () => {
  const client = getRedisClient();
  const surgeon = await client.get('surgeon');
  return surgeon;
};

const setSurgeon = async (surgeon: string) => {
  try {
    const client = getRedisClient();
    await client.set('surgeon', surgeon);
  } catch (e) {
    console.log(e);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const json = JSON.parse(req.body);
    await setSurgeon(json.surgeon);
    res.status(200).send('OK');
  } else {
    const surgeon = await getSurgeon();
    res.status(200).json({ surgeon: surgeon });
  }
}
