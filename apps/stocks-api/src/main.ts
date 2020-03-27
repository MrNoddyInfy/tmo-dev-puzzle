import { Server } from 'hapi';
import { stocksPlugin } from './app/stocks.plugin';
import { SERVER_CONFIG, ROUTES } from './app/stocks.constants';

const init = async () => {
  const server = new Server(SERVER_CONFIG);

  server.route({
    method: 'GET',
    path: ROUTES.HOME,
    handler: (request, h) => {
      return h.response("Stocks API serving...");
    }
  })
  
  await server.register(stocksPlugin);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();