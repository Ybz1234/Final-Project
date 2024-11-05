import { ObjectId } from "mongodb";
import { DeleteUserDB, EditUser, addUser, getUserByIdDB, getUsers, findUserByEmailAndPasswordDB, registerUserDB, getIdByEmailDB } from "./user.db";
import { IUser } from "./user.type";

export async function getAll() {
  console.log("not for public...");
  return await getUsers();
}

export async function getById(id: ObjectId) {
  return await getUserByIdDB(id);
  // return users.find((user) => user._id?.toString() === id);
}

export async function getIdByEmailM(email: string) {
  const userId = await getIdByEmailDB(email);
  return userId ? { _id: userId } : null;
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string
) {
  let newUser: IUser = {
    _id: new ObjectId(),
    firstName,
    lastName,
    email,
    role: "user",
  };
  return await addUser(newUser);
}

export async function update(id: string, user: IUser) {
  return await EditUser(id, user);
}

export async function deleteByIdM(id: string) {
  return await DeleteUserDB(id);
}

export async function findUserByEmailAndPasswordM(email: string, password: string) {
  return await findUserByEmailAndPasswordDB(email, password);
}

export async function registerUserM(user: IUser) {
  return await registerUserDB(user);
}
