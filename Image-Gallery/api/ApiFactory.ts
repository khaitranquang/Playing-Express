import * as Collections from 'typescript-collections';
import * as Debug from 'debug';
import * as express from 'express';

let debug = Debug('Application-APIs');

export interface IRestMapping {
    apiPrefix: string
}