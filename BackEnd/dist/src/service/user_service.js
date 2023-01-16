"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../model/user");
class UserService {
    constructor() {
        this.findAll = async () => {
            let users = await this.userRepository.find();
            return users;
        };
        this.login = async (username) => {
            let users = await this.userRepository.query(`select * from users where username = '${username}'`);
            return users;
        };
        this.findByName = async (username) => {
            let users = await this.userRepository.query(`select * from users where username = '%${username}%'`);
            return users;
        };
        this.add = async (user) => {
            let users = await this.userRepository.save(user);
            return users;
        };
        this.edit = async (req, res) => {
            let id = +req.params.user_id;
            let users = req.body;
            return await this.userRepository.update({ user_id: id }, users);
        };
        this.delete = async (req, res) => {
            let id = +req.params.id;
            let users = await this.userRepository.delete(id);
            return users;
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user_service.js.map