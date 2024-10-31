import { Router } from "express";
import {
    getAllUsers,
    updateUser,
    deleteUser,
} from "./admin.controller";

const router = Router();

router.get('/getAllUsers', getAllUsers); // add get by mail
router.put('/admin/:id', updateUser);
router.delete('/admin', deleteUser);

export default router;
