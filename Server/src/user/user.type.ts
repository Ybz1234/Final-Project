import { ObjectId } from "mongodb";

export type IUser = {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
