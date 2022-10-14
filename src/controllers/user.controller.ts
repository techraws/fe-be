import { NextFunction, Request, Response } from 'express';
import Userservice from '../services/user.service';
import { CreateUsersDto } from '../dtos/user.dtos';
import { DeleteResult } from 'typeorm';
import Users from '../entity/user.entity';

class UserController {
    public Users = new Users();
    public Userservice =new Userservice()
    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUserData: Users[] = await this.Userservice.findAllUser();
            res.status(200).json({ data: findAllUserData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public createUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const userData: CreateUsersDto = req.body;
            const user = new Users();
            user.user_name = userData.user_name;
            user.email = userData.email;
            user.user_location = userData.user_location;
            // user.updated_on = userData.updated_on;
            user.mobile_number = userData.mobile_number;

            const newService = await this.Userservice.createUser(user);
            res.status(201).json({ data: newService, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = String(req.params.id);
            const findOneProductData = await this.Userservice.findUserById(productId);
            res.status(200).json({ data: findOneProductData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
        try {

            const productId = String(req.params.id);
            const productData = req.body;
            const updateProduct = await this.Userservice.updateUser(productId, productData);

            res.status(200).json({ data: updateProduct, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = String(req.params.id);

            const deleteProduct: DeleteResult = await this.Userservice.deleteaUser(productId);
            res.status(200).json({ data: deleteProduct, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };

}

export default UserController;
