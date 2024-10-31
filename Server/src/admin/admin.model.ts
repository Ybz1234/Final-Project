import { DeleteUserDB, EditUser, getUsers, findUserByEmailAndPasswordDB } from "./admin.db";
import { IUser } from "../user/user.type";

export async function getAll() {
    return await getUsers();
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