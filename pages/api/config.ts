import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const surgeon = process.env.SURGEON_NAME || 'David Smith, D.V.M. #6901005915';
    res.status(200).json({ surgeon});
  }
  else {
    res.status(405).send('Method Not Allowed');
  }
}
