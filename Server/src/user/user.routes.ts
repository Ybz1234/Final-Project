import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  testy,
  signInUser,
  signUpUser,
} from "./user.controller";

const UserRouter = Router();

UserRouter
  .get("/getAllUsers", getAllUsers)
  .get("/getById", getUserById)
  // .post("/createUser", addUser)
  .put("/updateUser/:id", updateUser)
  .delete("/deleteUser", deleteUser)
  .get("/test", testy)
  .post("/signIn", signInUser)
  .post("/signUp", signUpUser);

export default UserRouter;
