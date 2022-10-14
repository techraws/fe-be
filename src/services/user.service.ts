import 'reflect-metadata';
import 'dotenv/config';
import { createConnection, getRepository, DeleteResult, getConnection } from 'typeorm';
import { isEmpty } from "class-validator";
import HttpException from "../exceptions/HttpException";
import Users from '../entity/user.entity';

class Userservice {

    public async createUser(users: Users): Promise<Users> {
        const userRepository = getRepository(Users);
        const userToAdd = users;
        const createServices = await userRepository.save(userToAdd);
        return createServices;
    }

    public async findAllUser(): Promise<Users[]> {
        const userRepository = getRepository(Users);

        const allUsers: Users[] = await userRepository.find();

        return allUsers;
    }

    public async findUserById(Id: string): Promise<Users> {
        const userRepository = getRepository(Users);
        const findUser = await userRepository.findOne({ where: { user_id: Id } });
        if (!findUser) throw new HttpException(409, "This User is not found");
        return findUser;
    }

    public async updateUser(Id: string, productData: Users): Promise<Users> {
        const userRepository = getRepository(Users);
        const findUser = await userRepository.findOne(Id);
        if (!findUser) throw new HttpException(409, "This User is not found");

        await userRepository.update(Id, findUser);

        const updateUser = await userRepository.findOne(Id)
        return updateUser;
    }

    public async deleteaUser(id: string): Promise<DeleteResult> {
        const userRepository = getRepository(Users);
        const findUser = await userRepository.findOne({ where: { user_id: id } });
        if (!findUser) throw new HttpException(409, "This User is not found");
        let result = userRepository.delete({ user_id: id });
        return result;
    }
}

export default Userservice;




