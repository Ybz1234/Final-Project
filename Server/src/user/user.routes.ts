import { Router } from "express";
import { 
  testy, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  signInUser, 
  signUpUser, 
  signOutUser 
} from "./user.controller";
import { authenticateToken } from "./auth.utils";

const router = Router();

router.get('/testy', testy);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user', deleteUser);
router.post('/signin', signInUser);
router.post('/signup', signUpUser);
router.post('/signout', authenticateToken, signOutUser); // This requires authentication, but it's optional

export default router;
