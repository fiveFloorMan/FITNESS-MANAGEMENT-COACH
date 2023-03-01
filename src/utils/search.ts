import { IUser, UserModel } from '../models/user';
import { IFitnessAction, FitnessActionModel} from '../models/fitnessActions';

export const findUser = (userId: string): Promise<IUser | null> => {
    return UserModel.findById(userId)
        .exec()  // 確保是查詢promise物件
        .then((user) => {
            if (user) {
                return user;
            } else {
                throw new Error('User not found.');
            }
        });
};

export const findFitnessAction = (trainingItemId: string): Promise<IFitnessAction | null> => {
    return FitnessActionModel.findById(trainingItemId)
        .exec()  // 確保是查詢promise物件
        .then((trainingItem) => {
            if (trainingItem) {
                return trainingItem;
            } else {
                throw new Error('Training Item not found.');
            }
        });
};