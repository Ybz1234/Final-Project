import { Address } from "../types/Address";
import { IHotel } from "./hotel.type";
import { createHotelDB, getAllHotelsDb, getHotelByNameDB, getHotelsByCityDB } from "./hotels.db";

export async function addHotel(hotel: IHotel) {
  await createHotelDB(hotel);
}

export async function getAllHotelsM(){
  return await getAllHotelsDb();
}

export async function getHotelByNameM(name: string) {
  return await getHotelByNameDB(name);
}

export async function getHotelsByCityM(city: string) {
  return await getHotelsByCityDB(city);
}
