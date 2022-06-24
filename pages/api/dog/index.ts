import type { NextApiRequest, NextApiResponse } from "next";
import { IDog } from "@models/IDog";
import axios from "axios";

const getAllAvailable = async (
  page: number = 1,
  pageSize: number = 100
): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const token = process.env.NEXT_PUBLIC_RG_TOKEN;
  const tokenHash = process.env.NEXT_PUBLIC_RG_HASH;
  const resultStart = (page - 1) * pageSize;
  const resultEnd = page * pageSize;

  const response = await axios.post(API_URL, {
    token,
    tokenHash,
    objectType: "animals",
    objectAction: "search",
    search: {
      resultStart: resultStart,
      resultLimit: resultEnd,
      resultSort: "animalID",
      resultOrder: "asc",
      calcFoundRows: "Yes",
      filters: [
        {
          fieldName: "animalStatus",
          operation: "equal",
          criteria: "Available",
        },
        {
          fieldName: "animalSpecies",
          operation: "equal",
          criteria: "Dog",
        },
      ],
      fields: [
        "animalID",
        "animalName",
        "animalBreed",
        "animalColor",
        "animalSex",
        "animalBirthdate",
        "animalAltered",
      ],
    },
  });

  return response.data.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDog[]>
) {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  if (!process.env.NEXT_PUBLIC_RG_TOKEN || !process.env.NEXT_PUBLIC_RG_HASH) {
    res.status(400);
    return;
  }

  let animal = await getAllAvailable(page, pageSize);
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
