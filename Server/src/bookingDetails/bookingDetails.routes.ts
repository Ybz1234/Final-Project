import { Router } from "express";
import {
  deleteBookingDetails,
  findAllBookingDetails,
  registerBookingDetails,
  loginBookingDetails,
  updateBookingDetails,
} from "./bookingDetails.controller";
const BookingDetailsRouter = Router();

export default BookingDetailsRouter.get("/", findAllBookingDetails)
  .post("/register", registerBookingDetails)
  .post("/login", loginBookingDetails)
  .put("/updateBookingDetails", updateBookingDetails)
  .delete("/deleteBookingDetails", deleteBookingDetails);
