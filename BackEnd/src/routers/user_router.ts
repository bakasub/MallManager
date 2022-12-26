import {Router} from "express";
import user_controller from "../controller/user_controller";

export const user_router = Router();
user_router.post('/register', user_controller.register);
user_router.post('/login', user_controller.login);
user_router.get('/users', user_controller.getAll);
user_router.put('/:id',user_controller.edit);
user_router.delete('/:id',user_controller.delete);
user_router.post('/find-by-name',user_controller.finByName);