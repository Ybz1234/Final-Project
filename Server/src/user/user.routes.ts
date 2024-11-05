import { Router } from "express";
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  signInUser, 
  signUpUser, 
  signOutUser, 
  getIdByEmail
} from "./user.controller";
import { authenticateToken } from "./auth.utils";

const router = Router();

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.get('getIdByEmail', getIdByEmail)
router.put('/user/:id', updateUser);
router.delete('/user', deleteUser);
router.post('/signin', signInUser);
router.post('/signup', signUpUser);
router.post('/signout', authenticateToken, signOutUser); // This requires authentication, but it's optional

export default router;
