import { ObjectId } from "mongodb";

export type IFlight = {
  _id?: ObjectId;
  Departure_Id: ObjectId; //airport
  Arrival_Id: ObjectId; //airport
  From_Time: Date;
  Until_Time: Date;
};
