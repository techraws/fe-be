import 'reflect-metadata';
import express from 'express';
import Routes from './interfaces/routes.interface'
import { createConnection } from 'typeorm';
import dbConnection from './database/database';
import { logger, stream } from './utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';
import mongoose from 'mongoose';


var bodyParser = require("body-parser");
const path = require('path');

class App {

    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    public listen() {
        // const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster7.0mijtry.mongodb.net/${process.env.MONGO_DB}`
        // const options = { useNewUrlParser: true, useUnifiedTopology: true }
        // mongoose.set("useFindAndModify", false)
        
        createConnection(dbConnection).then(() => {

            logger.info(' The database is connected');
        }).catch((error: Error) => {
            logger.info(`unable to connect to the database:${error}.`);
        }).then(() => this.app.listen(this.port, () => {
            logger.info(`🚀 App listening on the port ${this.port}`);

        })).catch(error => {
            throw error;
        });

    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(morgan('combined', { stream }));
            this.app.use(cors());
        } else if (this.env === 'development') {
            this.app.use(morgan('dev', { stream }));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        this.app.use(hpp());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());

        }
}


export default App;