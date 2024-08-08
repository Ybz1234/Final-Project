import { ObjectId } from "mongodb";
import { IAirPort } from "../airport/airport.type";
import { DateInterval } from "../types/DateInterval";
import {
  createFlightDB,
  createFlightsDB,
  getFlightsByDate,
  getFlightsDB,
} from "./flight.db";
import { IFlight } from "./flight.type";

export async function getFlight(
  departure: IAirPort,
  arrival: IAirPort,
  dates: DateInterval
) {
  await getFlightsDB({});
}

export async function createFlight(flight: IFlight) {
  await createFlightDB(flight);
}
export async function createFlights(flights: IFlight[]) {
  await createFlightsDB(flights);
}

export async function getFlights(
  departureAirportId: ObjectId,
  arrivalAirportId: ObjectId,
  date: Date
) {
  return await getFlightsByDate(departureAirportId, arrivalAirportId, date);
}
