import express, { Router } from 'express';
import { UserController } from '../controller/userController';
import { RecordController } from '../controller/recordController';
import { AuthMiddleware } from '../middleware/auth';

export class AppRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    public getRouter() {
        return this.router;
    }

    private setupRoutes() {
        this.router.post('/login', UserController.userLogin);
        this.router.post('/register', UserController.userRegister);
        // this.router.post('/logout'); 交由前端刪除token

        this.router.get('/record', AuthMiddleware.verifyUserToken, RecordController.getAllRecord);
        this.router.post('/record', AuthMiddleware.verifyUserToken, RecordController.createRecord);
        this.router.put('/record/:id', AuthMiddleware.verifyUserToken, RecordController.updateRecord);
        this.router.delete('/record/:id', AuthMiddleware.verifyUserToken, RecordController.deleteRecord);
    }
}