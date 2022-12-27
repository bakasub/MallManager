import {Router} from "express";
import UserController from "../controller/user-controller";

export const userRouter = Router();
userRouter.get('/all', UserController.displayAll);
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.put('/change-pw/:id', UserController.changePassword);
userRouter.put('/update-info/:id', UserController.updateInfo);
userRouter.delete('/delete/:id',UserController.removeUser);