import { Address } from "../types/Address";
import { DateInterval } from "../types/DateInterval";
import { IAttraction } from "./attaracionRecomendation.type";
import { createAttractionDB, getAllAttractionsDB, getAttractionDB, getAttractionsByCityDB } from "./attractionRecomendation.db";

export function getAttraction(
  userId: string,
  address: Address,
  dates: DateInterval
) {}

export async function addAttraction(attaracionRecomendation: IAttraction) {
  await createAttractionDB(attaracionRecomendation);
}

export async function getAllAttractionsM() { return await getAllAttractionsDB(); }

export async function getAttractionM() { return await getAttractionDB(); }

export async function getAttractionByCityM(city: string) { 
  return await getAttractionsByCityDB(city);
}
