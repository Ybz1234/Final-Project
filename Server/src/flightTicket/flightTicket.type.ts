import { ObjectId } from "mongodb";

export type IFlightTicket = {
  _id?: ObjectId;
  flightId: ObjectId;
  userId: ObjectId;
};
