import { MongoClient, ObjectId } from "mongodb";
import { IUser } from "./user.type";
import DBConnection, { DB_INFO } from "../DB/DBconnction";

// const DB_INFO = {
//   db: process.env.DB_NAME,
// };
const collection = "users";

export async function getUsers(query = {}, projection = {}) {
  let mongo = await DBConnection.getInstance();

  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .find(query, { projection })
      .toArray();
  } catch (error) {
    throw error;
  }
}

export async function getUserByIdDB(id: ObjectId) {
  let mongo = await DBConnection.getInstance();
  let query = { _id: new ObjectId(id) };
  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .findOne(query);
  } catch (error) {
    throw error;
  }
}

export async function addUser(user: IUser) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo.db(DB_INFO.db).collection(collection).insertOne(user);
  } catch (error) {
    throw error;
  }
}

export async function EditUser(id: string, user: IUser) {
  let mongo = await DBConnection.getInstance();

  try {
    const result = await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: user });
    //console.log(result);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function DeleteUserDB(id: string) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmailAndPasswordDB(email: string, password: string) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo
      .db(DB_INFO.db)
      .collection(collection)
      .findOne({ email, password });
  } catch (error) {
    throw error;
  }
}

export async function registerUserDB(user: IUser) {
  let mongo = await DBConnection.getInstance();
  try {
    return await mongo.db(DB_INFO.db).collection(collection).insertOne(user);
  } catch (error) {
    throw error;
  }
}
