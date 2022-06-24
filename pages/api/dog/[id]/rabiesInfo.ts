import { DataParser } from "@utils/dataParser";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getRabiesInfo = async (animalId: string): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const token = process.env.NEXT_PUBLIC_RG_TOKEN;
  const tokenHash = process.env.NEXT_PUBLIC_RG_HASH;
  const response = await axios.post(API_URL, {
    token,
    tokenHash,
    objectType: "animalsJournalEntries",
    objectAction: "search",
    search: {
      resultStart: "0",
      resultLimit: "100",
      resultSort: "journalEntryID",
      resultOrder: "asc",
      filters: [
        {
          fieldName: "journalEntryAnimalID",
          operation: "equals",
          criteria: animalId,
        },
        {
          fieldName: "journalEntrytypeDescription",
          operation: "equals",
          criteria: "Rabies",
        },
      ],
      filterProcessing: "0",
      fields: [
        "journalEntryID",
        "journalEntryAnimalID",
        "journalEntryDate",
        "journalEntryEntrytypeID",
        "journalEntrytypeDescription",
        "journalEntrytypeCategoryName",
        "journalEntryDueDate",
        "journalEntryComment",
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
  }

  let rabiesInfo = await getRabiesInfo(animalId);
  let result = Object.values(rabiesInfo).map((x: any) => {
    let rabiesDetail = DataParser.rabiesMetaParser(x.journalEntryComment);

    return {
      id: x.journalEntryID,
      vaccinatedOn: x.journalEntryDate,
      dueOn: x.journalEntryDueDate,
      expiresOn: rabiesDetail.expiration,
      serialNumber: rabiesDetail.serial,
      manufacturer: rabiesDetail.manufacturer,
    };
  });

  res.send(result[0]);
}
