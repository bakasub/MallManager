"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.getAll = async () => {
            let list = await this.userRepo.find();
            return list;
        };
        this.register = async (user) => {
            let result = '';
            let usernameCheck = await this.userRepo.findOneBy({
                username: user.username
            });
            if (usernameCheck) {
                result = " username already existed!";
                return result;
            }
            else if (user.username === '' && user.password === '') {
                result = 'User name or password is empty!';
                return result;
            }
            else if (user.username.length < 6) {
                result = 'Invalid username!!';
                return result;
            }
            else if (user.password.length < 6 || user.password.length > 8) {
                result = 'Invalid password!!';
                return result;
            }
            else {
                user.password = await bcrypt_1.default.hash(user.password, 10);
                user = await this.userRepo.save(user);
                return user;
            }
        };
        this.login = async (user) => {
            let checkUser = {
                message: '',
                token: ''
            };
            let userResult = await this.userRepo.findOneBy({
                username: user.username
            });
            if (!userResult) {
                checkUser.message = 'Incorrect username';
                return checkUser;
            }
            else {
                let Check = await bcrypt_1.default.compare(user.password, userResult.password);
                if (!Check) {
                    checkUser.message = 'Incorrect password';
                    return checkUser;
                }
                else {
                    let payload = {
                        id: userResult.id,
                        username: userResult.username
                    };
                    let token = await jsonwebtoken_1.default.sign(payload, auth_1.SECRET, { expiresIn: 3600 });
                    checkUser.token = token;
                    checkUser.message = 'Login success';
                    return {
                        token: token,
                        user_id: userResult.id,
                        userName: userResult.username
                    };
                }
            }
        };
        this.changePassword = async (id, input) => {
            let result = '';
            const findUser = await this.userRepo.findOneBy({ id: id });
            if (!findUser) {
                result = 'User does not exist';
                return result;
            }
            else {
                let compare = await bcrypt_1.default.compare(input.oldPassword, findUser.password);
                if (!compare) {
                    result = 'Current password is incorrect';
                    return result;
                }
                else {
                    let password = await bcrypt_1.default.hash(input.newPassword, 10);
                    let query = `update user
                             set password = '${password}'
                             where id = '${findUser.id}'`;
                    await this.userRepo.query(query);
                    result = 'Successfully changed your password';
                    return result;
                }
            }
        };
        this.updateInfo = async (id, input) => {
            let result = '';
            const findUser = await this.userRepo.findOneBy({ id: id });
            if (!findUser) {
                result = 'User does not exist';
                return result;
            }
            else {
                let query = `update user
                         set phoneNumber = '${input.phoneNumber}',
                             email       = '${input.email}',
                             address     = '${input.address}'
                         where id = '${findUser.id}'`;
                await this.userRepo.query(query);
                result = this.userRepo.query(`select *
                                          from `);
                return result;
            }
        };
        this.removeUser = async (id) => {
            return await this.userRepo.delete(id);
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            console.log('Fetched user data');
            this.userRepo = await connection.getRepository(user_1.User);
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=user-service.js.map