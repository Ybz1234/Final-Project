import { IFlight } from "./flight.type";
import DBConnection, { DB_INFO } from "../DB/DBconnction";
import { ObjectId } from "mongodb";
import { query } from "express";

// const DB_INFO = {
//   host: process.env.CONNECTION_STRING as string,
//   db: process.env.DB_NAME,
// };

const collection = "flights";

export async function getFlightsDB(query = {}, projection = {}) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .find(query, { projection })
      .toArray();
  } catch (error) {
    throw error;
  }
}

export async function createFlightDB(flight: IFlight) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo.db(DB_INFO.db).collection(collection).insertOne(flight);
  } catch (error) {
    throw error;
  }
}
export async function createFlightsDB(flights: IFlight[]) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .insertMany(flights);
  } catch (error) {
    throw error;
  }
}

export async function getFlightsByDate(
  departureAirportId: ObjectId,
  arrivalAirportId: ObjectId,
  date: Date
) {
  let mongo = await DBConnection.getInstance();

  // give us the whole date day and not the exact time date
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));

  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const query = {
    Departure_Id: departureAirportId,
    Arrival_Id: arrivalAirportId,
    From_Time: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  };

  // console.log(query);

  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .find(query)
      .toArray();
  } catch (error) {
    throw error;
  }
}
