import express from 'express';
import { deleteUserById, fetchUserByPhone, login, saveUser, updateUser } 
from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/Auth.js';

const userRouter=express.Router();
userRouter.post('/users',saveUser);
userRouter.get('/users/phone/:phone',verifyToken,fetchUserByPhone);
userRouter.delete('/users/:id',verifyToken,deleteUserById);
userRouter.put('/users/:id',verifyToken,updateUser);
userRouter.post('/users/login',login);
export default userRouter;