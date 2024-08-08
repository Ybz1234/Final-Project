import { Router } from "express";
import {
  allAirportsNames,
  deleteAirport,
  findAllAirport,
  getAirPortByCity,
  loginAirport,
  updateAirport,
} from "./airport.controller";
const AirportRouter = Router();

AirportRouter.get("/findAllAirport", findAllAirport)
  .get("/allAirportsName", allAirportsNames)
  .get("/getAirPortByCity", getAirPortByCity)
  .post("/login", loginAirport)
  .put("/updateAirport", updateAirport)
  .delete("/deleteAirport", deleteAirport);

export default AirportRouter;
