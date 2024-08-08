import { ObjectId } from "mongodb";
import { Address } from "../types/Address";

export type IAttraction = {
  _id?: ObjectId;
  name: string;
  address: Address;
  city: string;
  country: string;
  description: string;
  image?: string;
};
