import { IDog } from "@models/IDog";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getDogById = async (animalId: string): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const token = process.env.NEXT_PUBLIC_RG_TOKEN;
  const tokenHash = process.env.NEXT_PUBLIC_RG_HASH;
  const response = await axios.post(API_URL, {
    token,
    tokenHash,
    objectType: "animals",
    objectAction: "search",
    search: {
      resultStart: 0,
      resultLimit: 2,
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
        {
          fieldName: "animalID",
          operation: "equal",
          criteria: animalId,
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
  res: NextApiResponse
) {
  const animalId = req.query.id as string;

  if (!animalId) {
    res.send("You must specify and animalId");
    return;
  }

  let animal = await getDogById(animalId);
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

  res.send(result[0]);
}
