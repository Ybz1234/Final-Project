import { Address } from "../types/Address";
import {
  addAirPort,
  getAirportByCityDB,
  getAirportByIataDB,
  getAllAirportsDB,
} from "./airport.db";
import { IAirPort } from "./airport.type";

export async function createAirport(
  address: Address,
  name: string,
  city: string,
  country: string,
  iata: string,
  icao: string
) {
  let newAirport: IAirPort = {
    address,
    name,
    city,
    country,
    iata,
    icao,
  };
  return await addAirPort(newAirport);
}

export async function getAllAirports() {
  return await getAllAirportsDB();
}

export async function getAirportByIata(iata: string) {
  return await getAirportByIataDB(iata);
}
export async function getAirportByCityM(city: string) {
  return await getAirportByCityDB(city);
}
