import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";

class UserService {
    userRepo: any

    constructor() {
        AppDataSource.initialize().then(async connection => {
            console.log('Fetched user data')
            this.userRepo = await connection.getRepository(User)
        })
    }

    getAll = async () => {
        let list = await this.userRepo.find()
        return list
    }

    register = async (user) => {
        let result = ''
        let usernameCheck = await this.userRepo.findOneBy({
            username: user.username
        })
        if (usernameCheck) {
            result = " username already existed!"
            return result
        } else if (user.username === '' && user.password === '') {
            result = 'User name or password is empty!'
            return result
        } else if (user.username.length < 6) {
            result = 'Invalid username!!'
            return result
        } else if (user.password.length < 6 || user.password.length > 8) {
            result = 'Invalid password!!'
            return result
        } else {
            user.password = await bcrypt.hash(user.password, 10)
            user = await this.userRepo.save(user)
            return user
        }
    }

    login = async (user) => {
        let checkUser = {
            message: '',
            token: ''
        }
        let userResult = await this.userRepo.findOneBy({
            username: user.username
        })
        if (!userResult) {
            checkUser.message = 'Incorrect username'
            return checkUser
        } else {
            let Check = await bcrypt.compare(user.password, userResult.password)
            if (!Check) {
                checkUser.message = 'Incorrect password'
                return checkUser
            } else {
                let payload = {
                    id: userResult.id,
                    username: userResult.username
                }
                let token = await jwt.sign(payload, SECRET, {expiresIn: 3600})
                checkUser.token = token
                checkUser.message = 'Login success'
                return checkUser
            }
        }
    }

    changePassword = async (id, input) => {
        let result = ''
        const findUser = await this.userRepo.findOneBy({id: id})
        if (!findUser) {
            result = 'User does not exist'
            return result
        } else {
            let compare = await bcrypt.compare(input.oldPassword, findUser.password)
            if (!compare) {
                result = 'Current password is incorrect'
                return result
            } else {
                let password = await bcrypt.hash(input.newPassword, 10)
                let query = `update user
                             set password = '${password}'
                             where id = '${findUser.id}'`
                await this.userRepo.query(query)
                result = 'Successfully changed your password'
                return result
            }
        }
    }

    updateInfo = async (id, input) => {
        let result = ''
        const findUser = await this.userRepo.findOneBy({id: id})
        if (!findUser) {
            result = 'User does not exist'
            return result
        } else {
            let query = `update user
                         set phoneNumber = '${input.phoneNumber}',
                             email       = '${input.email}',
                             address     = '${input.address}'
                         where id = '${findUser.id}'`
            await this.userRepo.query(query)
            result = this.userRepo.query(`select *
                                          from `)
            return result
        }
    }

    removeUser = async (id) => {
        return await this.userRepo.delete(id)
    }
}

export default new UserService();