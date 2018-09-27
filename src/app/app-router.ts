import * as cors from 'cors';
import { Application } from 'express';
import { Server } from 'typescript-rest';

import PlaceService from '@app/places/place.service';

export default class AppRouter {

    private static readonly API_URL = 'http://localhost:8000';

    constructor(
        app: Application,
    ) { this.config(app); }

    private config(app: Application) {
        const options: cors.CorsOptions = {
          allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
          credentials: true,
          methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
          origin: AppRouter.API_URL,
          preflightContinue: false
        };

        app.use(cors(options));

        Server.buildServices(app,
            PlaceService
        );

        app.options('*', cors(options));
    }

}
