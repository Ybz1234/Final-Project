import { Router } from "express";
import { deleteUsersFlightsTicket } from "./devEnv.controller";

const devEnvRouter = Router();

devEnvRouter.delete("/deleteUsersFlightsTickets", deleteUsersFlightsTicket);

export default devEnvRouter