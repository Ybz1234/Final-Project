import { Router } from "express";
import { sendScheduledNotification } from "./timer.controller";

const timerRouter = Router();

export default timerRouter
  .post("/sendScheduledNotification", sendScheduledNotification);
