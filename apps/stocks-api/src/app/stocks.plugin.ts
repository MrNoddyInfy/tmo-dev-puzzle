'use strict';

import * as Wreck from '@hapi/wreck';
import { environment } from "../environments/environment";
import { ROUTES } from './stocks.constants';

export const stocksPlugin = {
    name: 'stocksPlugin',
    register: async function(server) {

        // get data from api
        async function getStockData(symbol: string, period: string, token: string) {
            const url = `${
            environment.apiURL
            }/beta/stock/${symbol}/chart/${period}?token=${token}`;
            const { res, payload } = await Wreck.get(url);
            return payload.toString();
        }
        
        // caching using server method
        server.method('getStockData', getStockData, {
            cache: {
                cache: 'stocks_cache',
                expiresIn: 600000, // 10 min
                generateTimeout: 10000 // 10 sec
            },
            generateKey: function(symbol, period) {
                return `${symbol}:${period}`;
            }
        });

        // handle route to api/stocks
        server.route({
            method: 'POST',
            path: ROUTES.STOCKS,
            handler: (request, h) => {
                const token = request.headers.authorization;
                if(!token) {
                    return h.response('Authentication Failed').code(401);
                }
                const { symbol, period } = request.payload;
                return server.methods.getStockData(symbol, period, token);
            }
        })
    }
}