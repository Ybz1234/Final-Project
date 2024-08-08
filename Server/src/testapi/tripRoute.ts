import { Router } from "express";
import { createTrip } from "./tripController";

const tripRouter = Router();

tripRouter.post("/", createTrip);
export default tripRouter;
