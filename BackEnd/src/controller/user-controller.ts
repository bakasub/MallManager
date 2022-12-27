import UserService from "../service/user-service";
import {Request, Response} from "express";

class UserController {
    displayAll = async (req: Request, res: Response) => {
        let list = await UserService.getAll()
        return res.status(200).json(list)
    }

    register = async (req: Request, res: Response) => {
        let user = req.body
        let result = await UserService.register(user)
        return res.status(200).json(result)
    }

    login = async (req: Request, res: Response) => {
        let user = req.body;
        let result = await UserService.login(user)
        return res.status(200).json(result)
    }

    changePassword = async (req: Request, res: Response) => {
        let userId = req.params.id
        let input = req.body;
        let result = await UserService.changePassword(userId, input)
        return res.status(200).json(result)
    }

    updateInfo = async (req: Request, res: Response) => {
        let userId = req.params.id
        let input = req.body
        let result = await UserService.updateInfo(userId, input)
        return res.status(200).json(result)
    }

    removeUser = async (req: Request, res: Response) => {
        let id = req.params.id
        await UserService.removeUser(id)
        return res.status(200).json({message:"Removed user"})
    }
}

export default new UserController();