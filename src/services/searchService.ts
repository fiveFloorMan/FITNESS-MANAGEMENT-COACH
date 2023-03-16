import { Model } from 'mongoose';
import { IUser, UserModel } from '../models/user';
import { IFitnessAction, FitnessActionModel } from '../models/fitnessActions';

export class UserDAO {
    static model = UserModel;

    constructor(private model: Model<IUser> = UserModel) {}

    static async findById(id: string): Promise<IUser | null> {
        try {
            const user = await this.model.findById(id).exec();
            if (user) {
                return user;
            } else {
                throw new Error('User not found.');
            }
        } catch (err) {
            throw err;
        }
    }
}

export class FitnessActionDAO {
    static model = FitnessActionModel;

    constructor(private model: Model<IFitnessAction> = FitnessActionModel) {}

    static async findById(id: string): Promise<IFitnessAction | null> {
        try {
            const fitnessAction = await this.model.findById(id).exec();
            if (fitnessAction) {
                return fitnessAction;
            } else {
                throw new Error('Fitness Action not found.');
            }
        } catch (err) {
            throw err;
        }
    }
}

// export const findUser = (userId: string): Promise<IUser | null> => {
//     return UserModel.findById(userId)
//         .exec()  // 確保是查詢promise物件
//         .then((user) => {
//             if (user) {
//                 return user;
//             } else {
//                 throw new Error('User not found.');
//             }
//         });
// };

// export const findFitnessAction = (trainingItemId: string): Promise<IFitnessAction | null> => {
//     return FitnessActionModel.findById(trainingItemId)
//         .exec()  // 確保是查詢promise物件
//         .then((trainingItem) => {
//             if (trainingItem) {
//                 return trainingItem;
//             } else {
//                 throw new Error('Training Item not found.');
//             }
//         });
// };
