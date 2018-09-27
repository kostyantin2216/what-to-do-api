import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import AppRouter from './app-router';

class App {

    private static readonly MONGO_URL = 'mongodb://localhost:27017/whattodo';

    public app: express.Application;
    public router: AppRouter;

    constructor() {
        this.app = express();
        this.router = new AppRouter(this.app);
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.configMongo();
    }

    private configMongo(): void {
        mongoose.connect(App.MONGO_URL);
    }

}

export default new App().app;
