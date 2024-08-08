import { Router } from "express";
import {
  deleteUserAttraction,
  findAllUserAttraction,
  registerUserAttraction,
  loginUserAttraction,
  updateUserAttraction,
} from "./userAttraction.controller";
const UserAttractionRouter = Router();

export default UserAttractionRouter.get("/", findAllUserAttraction)
  .post("/register", registerUserAttraction)
  .post("/login", loginUserAttraction)
  .put("/updateUserAttraction", updateUserAttraction)
  .delete("/deleteUserAttraction", deleteUserAttraction);
