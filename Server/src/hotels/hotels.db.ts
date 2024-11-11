import DBConnection, { DB_INFO } from "../DB/DBconnction";
import "dotenv/config";
import { IHotel } from "./hotel.type";
const collection = "hotels";
export async function createHotelDB(hotel: IHotel) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo.db(DB_INFO.db).collection(collection).insertOne(hotel);
  } catch (error) {
    throw error;
  }
}
export async function getAllHotelsDb() {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo.db(DB_INFO.db).collection(collection).find({}).toArray();
  } catch (error) {
    throw error;
  }
}

export async function getHotelByNameDB(hotelName: string) {
  let mongo = await DBConnection.getInstance();
  const query = { name: hotelName };
  try {
    return await mongo.db(DB_INFO.db).collection(collection).findOne(query);
  } catch (error) {
    throw error;
  }
}

export async function getHotelsByCityDB(city: string) {
  let mongo = await DBConnection.getInstance();
  const query = { city: city };
  const projection = { _id: 1, city: 1, country: 1, name: 1, address: {full_address: 1}, rating: 1, night_cost: 1 };
  try {
    return await mongo.db(DB_INFO.db).collection(collection).find(query, {projection}).toArray();
  } catch (error) {
    throw error;
  }
}