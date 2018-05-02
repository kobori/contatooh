var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _idProcurando = new ObjectID('5ad353b6ac026399e6fbc608');

MongoClient.connect('mongodb://127.0.0.1:27017/app-contatooh', function(erro, db) {
  if(erro) throw err;
  db.collection('contatos').findOne({_id : _idProcurando}, 
    function(erro, contato) {
      if(erro) throw err;
      console.log(contato);
    }
  )
})
