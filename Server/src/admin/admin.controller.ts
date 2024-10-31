import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as dotenv from 'dotenv';
import { getAll, update, deleteByIdM } from "./admin.model";
dotenv.config();

export async function getAllUsers(req: Request, res: Response) {
    try {
        let users = await getAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let user = req.body;
        if (!user || !id) {
            return res
                .status(403)
                .json({ message: "User ID and update data are required" });
        }
        let result = await update(id, user);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(403).json({ message: "User ID is required" });
        }
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        if (id.length !== 24) {
            return res.status(400).json({ message: "ID must be 24 characters long" });
        }

        const result = await deleteByIdM(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json(error);
    }
}
