// import { ObjectId } from "mongodb";
// import DBConnection, { DB_INFO } from "../DB/DBconnction";

// const flight_ticket_collection = "flight_ticket";

// export async function deleteUsersFlightsTicketDB(id: string) {
//     let mongo = await DBConnection.getInstance();
//     try {
//         console.log(`Attempting to delete ticket with id: ${id}`);
        
//         const result = await mongo
//             .db(DB_INFO.db)
//             .collection(flight_ticket_collection)
//             .deleteMany({ _id: new ObjectId(id) });

//         console.log(`Delete operation result:`, result);
        
//         return result;
//     } catch (error) {
//         console.error(`Error occurred while deleting ticket with id: ${id}`, error);
//         throw error;
//     }
// }