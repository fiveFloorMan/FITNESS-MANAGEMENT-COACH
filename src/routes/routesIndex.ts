import express, { Router } from 'express';
import { UserService } from '../services/userService';
import { RecordService } from '../services/recordService';
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
        this.router.post('/login', UserService.userLogin);
        this.router.post('/register', UserService.userRegister);
        // this.router.post('/logout'); 交由前端刪除token

        this.router.get('/record', AuthMiddleware.verifyUserToken, RecordService.getAllRecord);
        this.router.post('/record', AuthMiddleware.verifyUserToken, RecordService.createRecord);
        this.router.put('/record/:id', AuthMiddleware.verifyUserToken, RecordService.updateRecord);
        this.router.delete('/record/:id', AuthMiddleware.verifyUserToken, RecordService.deleteRecord);
    }
}