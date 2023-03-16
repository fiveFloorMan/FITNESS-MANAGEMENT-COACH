import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

import { SingleTrainingModel } from '../models/singleTraining'

import { verifyToken } from '../utils/token';
import { UserDAO, FitnessActionDAO } from '../utils/search';
import mongoose from 'mongoose';

export class RecordService {
    static async getAllRecord( req: Request, res: Response ) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decodedToken = await verifyToken(token as string, process.env.JWT_SECRET as string);
            const allRecord = await SingleTrainingModel.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(decodedToken.sub)
                    }
                }
            ]);
            if (!allRecord || allRecord.length === 0) {
                return res.status(200).json({
                    message: '目前沒有任何紀錄, 現在就馬上開始創建一個新的吧!'
                })
            }
            return res.status(200).json({
                message: 'All records feteched successfully!',
                allRecord
            })
        } catch (error: any) {
            return res.status(500).json({
                message: 'Failed to fetch records!',
                error: error.message,
            });
        }
    }

    static async createRecord( req: Request, res: Response ) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decodedToken = await verifyToken(token as string, process.env.JWT_SECRET as string);
            const user =  await UserDAO.findById(decodedToken.sub);
            const trainingItem = await FitnessActionDAO.findById(req.body.trainingItemId);
            const singleTraining = new SingleTrainingModel({
                trainingDate: req.body.trainingDate,
                trainingItemId: trainingItem,
                userId: user,
                reps: req.body.reps,
                sets: req.body.sets,
                restTime: req.body.restTime,
                weightTraining: req.body.weightTraining,
            });
            await singleTraining.save();
            return res.status(201).json({
                message: 'Single training created successfully!',
                singleTraining,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: 'Failed to create single training!',
                error: error.message,
            });
        }
    }
    
    static async updateRecord( req: Request, res: Response ) {
        try {
            const trainingItem = await FitnessActionDAO.findById(req.body.trainingItemId)
            const updatedRecord = await SingleTrainingModel.findByIdAndUpdate(
                req.params.id,
                {
                    trainingDate: req.body.trainingDate,
                    trainingItemId: trainingItem,
                    reps: req.body.reps,
                    sets: req.body.sets,
                    restTime: req.body.restTime,
                    weightTraining: req.body.weightTraining,
                },
                { new: true },
            );
            return res.status(200).json({
                message: "Record updated successfully!",
                updatedRecord
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed to update record!",
                error: error.message,
            });
        }
    }

    static async deleteRecord( req: Request, res: Response ) {
        try {
            await SingleTrainingModel.deleteOne({ _id: req.params.id})
            return res.status(200).json({ message: "Record deleted successfully!" });
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed to deleted record!",
                error: error.message
            });
        }
    }
}