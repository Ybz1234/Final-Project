import { deleteUsersFlightsTicketM } from "./devEnv.model";
import { Request, Response } from "express";

export async function deleteUsersFlightsTicket(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        let result = await deleteUsersFlightsTicketM(userId);
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).json(error);
    }
}