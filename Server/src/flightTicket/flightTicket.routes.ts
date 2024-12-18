import { Router } from "express";
import {
  findAllFlightTicket,
  getFlightTicketById,
  registerFlightTicket,
  userFlightTicketsFromDate,
  userUpToDateFlightTickets,
} from "./flightTicket.controller";

const FlightTicketRouter = Router();

FlightTicketRouter.get("/getAllFlightTickets", findAllFlightTicket)
  .get("/getFlightTicketInformationById", getFlightTicketById)
  .get("/getFlightTicket")
  .post("/", registerFlightTicket)
  .post("/userUpToDateFlightTickets", userUpToDateFlightTickets)
  .post("/userFlightTicketsFromDate", userFlightTicketsFromDate);

export default FlightTicketRouter;
