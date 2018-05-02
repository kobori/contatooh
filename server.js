#!/usr/bin/env node

// Dependências do módulo.
var app = require('./app');
var debug = require('debug')('app-contatooh:server');
var http = require('http');

// Obtenha porta do ambiente e armazene no Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Crie um servidor HTTP.
var server = http.createServer(app);

// Ouça na porta fornecida, em todas as interfaces de rede.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize uma porta em um número, string ou false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener para o evento "error" do servidor HTTP.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Lidar com erros de escuta específicos com mensagens amigáveis
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

// Ouvinte de eventos para o evento "escuta" do servidor HTTP.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
