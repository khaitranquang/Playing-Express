import * as express from 'express';
import * as Debug from 'debug';

import * as Boobs from "./api/BoobsApi";


export class Application {
//Declare express instance as a global var
    static expressInstance = express();

    static debug = Debug('application');

    port = process.env.PORT || 8080;

    constructor() {

        let apiRouter = express.Router();

        Boobs.apply(apiRouter);

        Application.expressInstance.use('/api', apiRouter)

        Application.expressInstance.listen(this.port);
        Application.debug('Magic start at %s', this.port);
    }
}


new Application();
