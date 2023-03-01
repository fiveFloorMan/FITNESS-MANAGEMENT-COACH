import passport from 'passport';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/token';

import { UserModel } from '../models/user';

import { Request, Response, NextFunction } from 'express';

import { IUser, IsAdminLevel } from '../models/user'

import '../config/passport'

export const UserController = {
    userLogin: ( req: Request, res: Response) => {
        passport.authenticate('local', { session: false }, async (error: Error, user: any, info: any) => {
            if (error) {
                return res.status(500).json({ error: error.message });
                
            }
            if (!user) {
                return res.status(401).json({ error: info.message });
            }
        const token = await signToken({ sub: user.id }, process.env.JWT_SECRET as string, '24h');
        return res.json({ token });
        // 給予前端token之後讓前端自行處理跳轉
        }) (req, res)
    },
    userRegister: async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, gender, height, weight, isAdmin } = req.body;
        try {
            const existingUser = await UserModel.findOne({ email });
            
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists' });
            }
            
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const user = new UserModel({ name, email, password: hashedPassword, gender, height, weight, isAdmin });

            if (!Object.values(IsAdminLevel).includes(user.isAdmin)) {
                return res.status(400).json({ error: 'Level error.'})
            }

            const userTypeCheck: IUser = user;
            if (userTypeCheck) {
                await user.save();
            }

            return res.json({ message: `${user.name} is created successfully.`})
        } catch {
            return next(Error)
        }
    }
};