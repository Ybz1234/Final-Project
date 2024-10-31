import { ObjectId } from "mongodb";
import { IUser } from "../user/user.type";
import DBConnection, { DB_INFO } from "../DB/DBconnction";

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

export async function EditUser(id: string, user: IUser) {
    let mongo = await DBConnection.getInstance();
    try {
        const result = await mongo
            .db(DB_INFO.db)
            .collection(collection)
            .updateOne({ _id: new ObjectId(id) }, { $set: user });
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
