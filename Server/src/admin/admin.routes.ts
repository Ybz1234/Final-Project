import { Router } from "express";
import {
    getAllUsers,
    updateUser,
    deleteUser,
} from "./admin.controller";

const router = Router();

router.get('/users', getAllUsers); // add get by mail
router.put('/user/:id', updateUser);
router.delete('/user', deleteUser);

export default router;
