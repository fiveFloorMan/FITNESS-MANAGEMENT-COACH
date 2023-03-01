import express from 'express';
import { UserController } from '../controller/userController';
import { RecordController } from '../controller/recordController';
import { verifyUserToken } from '../middleware/auth';

const router = express.Router();

router.post('/login', UserController.userLogin);
router.post('/register', UserController.userRegister);
// router.post('/logout'); 交由前端刪除token

router.get('/record', verifyUserToken, RecordController.getAllRecord);
router.post('/record', verifyUserToken, RecordController.createRecord);
router.put('/record/:id', verifyUserToken, RecordController.updateRecord);
router.delete('/record/:id', verifyUserToken, RecordController.deleteRecord);

export default router;