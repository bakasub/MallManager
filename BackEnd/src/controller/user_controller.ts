import {UserService} from "../service/user_service";
import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService()
    }

    register = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let userFind = await this.userService.login(user.username);
            if (userFind.length) {
                res.status(200).json({
                    message: "Tài khoản đã tồn tại!!! "
                })
            } else {
                user.password = await bcrypt.hash(user.password, 10);
                let users = await this.userService.add(user);
                return res.status(201).json({message: "create done"})
            }
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let userFind = await this.userService.login(user.username);
            if (userFind.length == 0) {
                return res.status(200).json({
                    message: 'username or password wrong!!'
                })
            } else {
                let comparePassword = await bcrypt.compare(user.password, userFind[0].password)
                if (!comparePassword) {
                    return res.json({
                        message: 'Mật khẩu sai'
                    })

                } else {
                    let payload = {
                        user_id: userFind[0].user_id,
                        username: userFind[0].username
                    }

                    let secret = 'vu'
                    let token = jwt.sign(payload, secret, {
                        expiresIn: 36000
                    });
                    console.log(userFind[0])
                    return res.status(200).json({
                        token: token,
                        user_id: userFind[0].user_id,
                        userName: userFind[0].username,
                        message: 'success'
                    })
                }
            }
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    finByName = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let userFind = await this.userService.findByName(user.name);
            return res.status(201).json(userFind[0])
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let users = await this.userService.findAll();
            return res.status(200).json(users);
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    edit = async (req: Request, res: Response) => {
        try {
            await this.userService.edit(req, res);
            return res.status(201).json({
                message: "edit success"
            });
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    delete = async (req: Request, res: Response) => {
        try {
            let users = await this.userService.delete(req, res);
            return res.status(200).json(users)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new UserController();