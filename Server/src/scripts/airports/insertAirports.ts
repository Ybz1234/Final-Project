import { createAirport } from "../../airport/airport.model";
import airports from "../../data/airports";

import "dotenv/config";

export const insertAirports = async () => {
  for (let i = 0; i < airports.length; i++) {
    await createAirport(
      airports[i].address,
      airports[i].name,
      airports[i].city,
      airports[i].country,
      airports[i].iata,
      airports[i].icao
    );
    console.log("new airport created", airports[i].name);
  }
  console.log("DONE");
};
insertAirports();
