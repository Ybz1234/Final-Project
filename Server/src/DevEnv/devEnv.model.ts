import { deleteUsersFlightsTicketDB } from "./devEnv.db";

export async function deleteUsersFlightsTicketM(id: string){
    return await deleteUsersFlightsTicketDB(id);
}