import mongoose from 'mongoose';

require('dotenv').config();

import { connectDB } from '../db/db.connection';

import { FitnessActionModel } from '../models/fitnessActions';

import fitnessActionSeeds from './fitnessActionSeed.json'

(async () => {
    await connectDB();

    try {
        for (const seed of fitnessActionSeeds) {
            const { trainingName, trainingPart } = seed;
            const singleSeed = new FitnessActionModel({
                // 因為是種子資料所以不會限制trainingPart的type範圍
                trainingName: trainingName,
                trainingPart: trainingPart
            })
            await singleSeed.save()
        }
        console.log('Fitness-Action-Seed is successfully Create.');
    } catch (error) {
        console.error('Error was happened when build Fitness-Action-Seed', error);
    } finally {
        mongoose.connection.close();
    }
})();