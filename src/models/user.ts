import mongoose, { Model, Document, Types } from 'mongoose';

export enum IsAdminLevel {
    MEMBER = 'member',
    ADMIN = 'admin',
}

export interface IUser {
    name: String;
    email: String;
    password: String;
    gender: Boolean;
    height: Number;
    weight: Number;
    isAdmin: IsAdminLevel;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: Boolean,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: String,
        required: true,
    }
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);