import express from 'express';
import { AppRouter } from './routes/routesIndex'
import { connectDB } from './db/db.connection'
import bodyParser from 'body-parser';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        connectDB();
        this.routes();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    private routes() {
        const appRouter = new AppRouter();
        this.app.use('/api', appRouter.getRouter());
    }

    public start() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`WEB IS RUNNING!`)
        })
    }
}

const app = new App();
app.start();