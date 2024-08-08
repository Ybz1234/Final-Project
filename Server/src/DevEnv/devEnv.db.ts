import { ObjectId } from "mongodb";
import DBConnection, { DB_INFO } from "../DB/DBconnction";

const flight_ticket_collection = "flight_ticket";

export async function deleteUsersFlightsTicketDB(userId: string) {
    let mongo = await DBConnection.getInstance();
    try {
        console.log(`Attempting to delete tickets for user with id: ${userId}`);
        
        // Delete all documents with the specified userId
        const result = await mongo
            .db(DB_INFO.db)
            .collection(flight_ticket_collection)
            .deleteMany({ userId: new ObjectId(userId) });

        console.log(`Delete operation result:`, result);
        
        return result;
    } catch (error) {
        console.error(`Error occurred while deleting tickets for user with id: ${userId}`, error);
        throw error;
    }
}
