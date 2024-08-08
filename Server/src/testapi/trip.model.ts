//array of airports code and dates and prefrences

import { IAirPort } from "../airport/airport.type";
import { getAttraction } from "../attractionRecomendation/attractionRecomendation.model";
import { createFlightTicket } from "../flightTicket/flightTicket.model";
import { DateInterval } from "../types/DateInterval";

export async function buildTrip(
  userId: string,
  sourceAirport: IAirPort,
  airports: IAirPort[],
  dates: DateInterval[]
) {
  if (!Array.isArray(airports)) {
    throw new Error("airports must be an array");
  }

  airports.unshift(sourceAirport);
  airports.push(sourceAirport);

  for (let i = 0; i < airports.length - 2; i++) {
    //console.log("???", userId, airports[i], airports[i + 1], dates[i]);

    await buildDestination(userId, airports[i], airports[i + 1], dates[i]);
  }

  //book a fligft home
  await createFlightTicket(
    userId,
    airports[airports.length - 2],
    airports[airports.length - 1],

    {
      startDate: new Date(dates[dates.length - 1].endDate.setHours(0, 0, 0, 0)),
      endDate: new Date(
        dates[dates.length - 1].endDate.setHours(23, 59, 59, 0)
      ),
    }
  );
  return true;
}

export async function buildDestination(
  userId: string,
  departure: IAirPort,
  arrival: IAirPort,
  dates: DateInterval
) {
  return await createFlightTicket(userId, departure, arrival, dates);
  // getHotel(userId, arrival.address, dates);
  // getAttraction(userId, arrival.address, dates);
}
