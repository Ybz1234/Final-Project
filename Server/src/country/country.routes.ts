import { Router } from "express";
import {
  deleteCountry,
  findAllCountry,
  registerCountry,
  loginCountry,
  updateCountry,
} from "./country.controller";
const CountryRouter = Router();

export default CountryRouter.get("/", findAllCountry)
  .post("/register", registerCountry)
  .post("/login", loginCountry)
  .put("/updateCountry", updateCountry)
  .delete("/deleteCountry", deleteCountry);
