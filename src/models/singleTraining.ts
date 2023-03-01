import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export interface ISingleTranning {
    trainingDate: Date;
    trainingItemId: ObjectId;
    userId: ObjectId;
    reps: number; // 次數
    sets: number; // 組數
    restTime: number; // 休息時間
    weightTraining: number; // 重量
}

const SingleTrainingSchema  = new mongoose.Schema<ISingleTranning>({
    trainingDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    trainingItemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FitnessAction'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reps: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    restTime: {
        type: Number,
        required: true,
    },
    weightTraining: {
        type: Number,
        required: true,
    },
});

export const SingleTrainingModel  = mongoose.model('SingleTraining', SingleTrainingSchema);