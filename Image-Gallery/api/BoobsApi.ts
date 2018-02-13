import * as express from "express";
import * as Debug from 'debug';

import {Dictionary} from 'typescript-collections';

import {IRestMapping} from './ApiFactory';


const GiphyAPI = {
    apiEndpoint: 'https://api.giphy.com/v1/gifs/random?api_key=TDRCTI3YEJhUl5N7sIuaNFT2e8aca0OH&tag=boobs'
};

class BoobsApi implements IRestMapping {

    static debug = Debug('BoobsAPI');

    private api = (): Dictionary<string, express.RequestHandler> => {
        let dict = new Dictionary<string, express.RequestHandler>();
        dict.setValue(this.getBoobsPrefix, this.getBoobs);
        return dict;
    };

    getBoobsPrefix = '/get';

    getBoobs = (req, res) => {
        let url = GiphyAPI.apiEndpoint;
        res.json({
            'link': url
        });
    };

    apiRoot = (req, res, next) => {
        BoobsApi.debug("Received a boobs request.");
        next();
    };


    apiPrefix: string = '/boobs';
}

let api = new BoobsApi();

export let apply = (router: express.Router) => {
    router.get(api.apiPrefix, api.apiRoot);
    router.get(api.apiPrefix + api.getBoobsPrefix, api.getBoobs)
};