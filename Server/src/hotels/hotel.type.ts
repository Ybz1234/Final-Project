import { ObjectId } from "mongodb";
import { Address } from "../types/Address";

export type IHotel = {
  _id?: ObjectId;
  name: string;
  city: string;
  country: string;
  address: Address;
};
