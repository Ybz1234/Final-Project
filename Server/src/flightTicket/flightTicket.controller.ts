import { Request, Response } from "express";
import {
  createFlightTicket,
  getAllFlightTickets,
  getFlightTicketInfoM,
  userFlightTicketsFromDateM,
  userUpToDateFlightTicketsM,
} from "./flightTicket.model";
import { ObjectId } from "mongodb";
import { getAirportByCityM } from "../airport/airport.model";
import { IAirPort } from "../airport/airport.type";
import { DateInterval } from "../types/DateInterval";
import { log } from "console";

export async function findAllFlightTicket(req: Request, res: Response) {
  try {
    const flightTicket = await getAllFlightTickets();
    return res.status(200).json({ flightTicket });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getFlightTicketById(req: Request, res: Response) {
  try {
    // Extract flightId from the request body and convert it to ObjectId
    let { flightId } = req.body;
    if (!ObjectId.isValid(flightId)) {
      return res.status(400).json({ error: "Invalid flight ID format" });
    }
    let information = await getFlightTicketInfoM(new ObjectId(flightId));
    return res.status(200).json({ information });
  } catch (error) {
    throw error;
  }
}

export async function registerFlightTicket(req: Request, res: Response) {
  let { userId, airportNameArr, startDate, daysArr } = req.body;
  console.log(
    "controllerrrrrrrrrrrr",
    userId,
    airportNameArr,
    startDate,
    daysArr
  );

  if (!userId || !airportNameArr || !startDate || !daysArr) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    //transform airport name array to airport array
    const airportArr = [];
    for (let i = 0; i < airportNameArr.length; i++) {
      let airport: any = (await getAirportByCityM(airportNameArr[i]))[0];
      console.log(airport);

      let IAirPort = {
        name: airport.name,
        city: airport.city,
        address: airport.address,
        country: airport.country,
        iata: airport.iata,
        icao: airport.icao,
      } as IAirPort;
      airportArr.push(IAirPort);
    }
    airportArr.push(airportArr[0]);
    // transform start date and Days array to DateInterval array
    const dateInt = [] as DateInterval[];
    let tempDate = new Date(startDate);
    for (let i = 0; i < daysArr.length; i++) {
      const startDate2 = new Date(tempDate);
      const endDate2 = new Date(
        tempDate.setDate(tempDate.getDate() + daysArr[i])
      );
      dateInt.push({
        startDate: startDate2,
        endDate: endDate2,
      });
      tempDate = endDate2;
    }
    dateInt.push({
      startDate: dateInt[dateInt.length - 1].endDate,
      endDate: dateInt[dateInt.length - 1].endDate,
    });
    //?loop through one of the array in order to create flight ticket in each iteration
    const flightTickets = [];
    for (let i = 0; i < airportArr.length - 1; i++) {
      flightTickets.push(
        await createFlightTicket(
          userId,
          airportArr[i],
          airportArr[i + 1],
          dateInt[i]
        )
      );
    }
    return res
      .status(200)
      .json({ message: "Flight ticket created", flightTickets });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function userUpToDateFlightTickets(req: Request, res: Response) {
  let { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    let flightTickets = await userUpToDateFlightTicketsM(new ObjectId(userId));
    return res.status(200).json({ flightTickets });
  } catch (error) {
    throw error;
  }
}

export async function userFlightTicketsFromDate(req: Request, res: Response) {
  let { userId, startDate } = req.body;
  if (!userId || !startDate) {
    return res.status(400).json({ error: "userId and startDate are required" });
  }
  try {
    const userObjectId = new ObjectId(userId);
    const startDateObj = new Date(startDate);
    let flightTickets = await userFlightTicketsFromDateM(
      userObjectId,
      startDateObj
    );
    return res.status(200).json({ flightTickets });
  } catch (error) {
    console.error("Error in userFlightTicketsFromDate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
