var mongoose = require('mongoose');
var connection;

module.exports = function(uri) {
  if(!connection){
    connection = mongoose.createConnection(uri);
  }
  return connection;

  mongoose.connect(uri);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose! Conectado em ' + uri);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose! Desconectado de ' + uri);
  });

  mongoose.connection.on('error', function() {
    console.log('Mongoose! Erro na conexão: ' + erro);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose! Desconectado pelo término da aplicação');
      process.exit(0);
    })
  })
}