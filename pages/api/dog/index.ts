import type { NextApiRequest, NextApiResponse } from 'next';
import { IDog } from '@models/IDog';
import axios from 'axios';

const getAllAvailable = async (
  page: number = 1,
  pageSize: number = 100
): Promise<any> => {
  const API_URL = process.env.API_URL || '';
  const token = process.env.RG_TOKEN;
  const tokenHash = process.env.RG_HASH;
  const resultStart = (page - 1) * pageSize;
  const resultEnd = page * pageSize;

  const response = await axios.post(API_URL, {
    token,
    tokenHash,
    objectType: 'animals',
    objectAction: 'search',
    search: {
      resultStart: resultStart,
      resultLimit: resultEnd,
      resultSort: 'animalID',
      resultOrder: 'asc',
      calcFoundRows: 'Yes',
      filters: [
        {
          fieldName: 'animalStatus',
          operation: 'equal',
          criteria: 'Available',
        },
        {
          fieldName: 'animalSpecies',
          operation: 'equal',
          criteria: 'Dog',
        },
      ],
      fields: [
        'animalID',
        'animalName',
        'animalBreed',
        'animalColor',
        'animalSex',
        'animalBirthdate',
        'animalAltered',
      ],
    },
  });

  return response.data.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDog[]>
) {
  if (!process.env.RG_TOKEN || !process.env.RG_HASH) {
    res.status(400);
    return;
  }

  let animal = await getAllAvailable();
  let result = Object.values(animal).map((x: any) => {
    return {
      id: x.animalID,
      name: x.animalName,
      breed: x.animalBreed,
      color: x.animalColor,
      gender: x.animalSex,
      bornOn: x.animalBirthdate,
      altered: x.animalAltered,
    } as IDog;
  });

  res.status(200).json(result);
}
