import { Router } from "express";
import {
  findAllHotels,
  findHotelByName,
  findHotelsByCity,
} from "./hotels.controller";
const hotelsRouter = Router();

export default hotelsRouter
  .get("/findAllHotels", findAllHotels)
  .get("/findHotelByName", findHotelByName)
  .post("/findHotelsByCity", findHotelsByCity);