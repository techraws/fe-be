import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import UserController from '../controllers/user.controller';

class UserRoute implements Route {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() { 
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.userController.getUsers);
    this.router.get(`${this.path}/:id(*)`,  this.userController.createUsers);

    this.router.post(`${this.path}/create`,this.userController.getUserById);
    this.router.put(`${this.path}/update/:id(*)`,this.userController.updateUser);

    this.router.delete(`${this.path}/:id(*)`, this.userController.deleteUser);    


  }
}

export default UserRoute;



