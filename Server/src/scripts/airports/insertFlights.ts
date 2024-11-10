import { getAllAirports as getAllAirports } from "../../airport/airport.model";
import { createFlights } from "../../flight/flight.model";
import "dotenv/config";

export const insertFlights = async (date: Date) => {
  console.log("starting");

  const Aps = await getAllAirports();
  console.log("running", Aps.length * Aps.length, "times");
  let flights = [];
  for (let i = 0; i < Aps.length; i++) {
    console.log("generating", Aps[i].name, date);
    for (let j = 0; j < Aps.length; j++) {
      if (i !== j) {
        const { startDate, endDate } = generateFlightDate(date);

        flights.push({
          Departure_Id: Aps[i]._id,
          Arrival_Id: Aps[j]._id,
          From_Time: startDate,
          Until_Time: endDate,
        });
      }
    }
  }

  await createFlights(flights);
};

const generateFlightDate = (baseDate: Date) => {
  let hoursToAdd = Math.floor(Math.random() * 6) + 1;
  let flightTime = Math.floor(Math.random() * 8) + 1;

  let startDate = new Date(baseDate.getTime() + hoursToAdd * 60 * 60 * 1000);
  let endDate = new Date(
    baseDate.getTime() + (hoursToAdd + flightTime) * 60 * 60 * 1000
  );

  return { startDate, endDate };
};

const iterateFlights = async () => {
  let hoursToAdd = 8;
  for (let i = 0; i < 360; i++) {
    console.log("new inserted", i);
    hoursToAdd = 8 + 24 * i;
    //flight base will always be 8 hours
    let date = new Date(new Date().getTime() + hoursToAdd * 60 * 60 * 1000);
    await insertFlights(date);
  }
  console.log("DONE");
};
iterateFlights();
