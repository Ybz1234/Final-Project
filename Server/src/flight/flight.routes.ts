import { Router } from "express";
import {
  deleteFlights,
  findAllFlights,
  registerFlights,
  loginFlights,
  updateFlights,
} from "./flight.controller";
const FlightsRouter = Router();

export default FlightsRouter.get("/", findAllFlights)
  .post("/register", registerFlights)
  .post("/login", loginFlights)
  .put("/updateFlights", updateFlights)
  .delete("/deleteFlights", deleteFlights);
