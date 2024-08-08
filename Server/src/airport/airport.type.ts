import { ObjectId } from "mongodb";
import { Address } from "../types/Address";

export type IAirPort = {
  _id?: ObjectId;
  address: Address;
  name: string;
  city: string;
  country: string;
  iata: string;
  icao: string;
};
