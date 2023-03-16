import mongoose, { Model, Document, Types } from 'mongoose';


export enum TrainingPart {
    CHEST = 'chest',
    BACK = 'Back',
    SHOURLDER = 'shoulder',
    TRICEPS = 'triceps',
    BICEPS = 'biceps',
    ABS = 'abs',
    HIPS = 'hips',
    THIGH = 'thigh',
    CALF_MUSCLE = 'calf muscle'
}

export interface IFitnessAction extends Document{
    trainingName: String;
    trainingPart: TrainingPart; // 邏輯處理部分
}

const FitnessActionSchema  = new mongoose.Schema<IFitnessAction>({
    trainingName: {
        type: String,
        required: true,
    },
    trainingPart: {
        type: String,
        required: true,
    }
});

export const FitnessActionModel: Model<IFitnessAction>  = mongoose.model('FitnessAction', FitnessActionSchema);