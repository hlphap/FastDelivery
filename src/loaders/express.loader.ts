import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from '../configs/env';
import routeConfig from '../apis/routes/v1';
import { catchErrorNotFound, errorConverter, errorHandler } from '../middlewares/error';

export default () => {
    const app: Application = express();

    // set log request
    app.use(morgan('dev'));

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // sanitize request data
    app.use(mongoSanitize());

    // gzip compression
    app.use(compression());

    // set cors blocked resources
    app.use(cors());
    app.options('*', cors);

    /** Rules of API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE PUT POST');
            return res.status(200).json({});
        }

        return next();
    });

    // setup limits
    if (env.isProduction) {
        // app.use('/v1/auth', customizeLimiter)
    }

    // api routes
    app.use(env.app.routePrefix, routeConfig);

    // handle error not found
    app.use(catchErrorNotFound);

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);

    app.listen(env.app.port);

    return app;
};
