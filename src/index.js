import express from 'express';

// import config from './config';
import generateGameServer from './app'

async function startServer() {

  var server_ids = ['0001', '0002'];
  var config = {
    port: 8000,
  }

  const app = express()
  const http = require('http').Server(app);
  for (var i = 0; i < server_ids.length; i++) {
    var server_id = server_ids[i];
    let gameServerApp = await generateGameServer();
    app.use(`/gs/${ server_id }`, gameServerApp);
  }
  
  const server = http.listen(config.port);
  server.on('error', onError);
  server.on('listening', () => onListening(server));
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(server) {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.debug('Listening on ' + bind);
}

startServer()
