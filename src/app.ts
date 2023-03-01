import express from 'express';
import api from './routes/routesIndex'
import { connectDB } from './db/db.connection'
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();
const PORT = 3000;

connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`WEB IS RUNNING!`)
})