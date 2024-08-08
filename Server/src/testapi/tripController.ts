import { Request, Response } from "express";
import { buildTrip } from "./trip.model";
import { DateInterval } from "../types/DateInterval";

export async function createTrip(req: Request, res: Response) {
  try {
    const { userId, sourceAirport, airports, dates } = req.body;

    const dateInt: DateInterval[] = updateDate(dates);

    const success = await buildTrip(userId, sourceAirport, airports, dateInt);
    if (!success) {
      return res.status(400).json({ message: "error" });
    }
    res.status(200).json({ success: success });
  } catch (error) {
    res.status(500).json(error);
  }
}
type requestDate = {
  startDate: string;
  endDate: string;
};

const updateDate = (dates: requestDate[]) => {
  const dateInt: DateInterval[] = [];
  for (let i = 0; i < dates.length; i++) {
    dateInt.push({
      startDate: new Date(dates[i].startDate),
      endDate: new Date(dates[i].endDate),
    });
  }
  return dateInt;
};
//whatabout source flight
