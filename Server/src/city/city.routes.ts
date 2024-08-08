import { Router } from "express";
import {
  deleteCity,
  findAllCity,
  registerCity,
  loginCity,
  updateCity,
} from "./city.controller";
const CityRouter = Router();

export default CityRouter.get("/", findAllCity)
  .post("/register", registerCity)
  .post("/login", loginCity)
  .put("/updateCity", updateCity)
  .delete("/deleteCity", deleteCity);
