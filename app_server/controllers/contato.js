var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var Contato = app.models.contato;

  var controller = {};

  // listaContatos
  controller.listaContatos = (req, res) => {
    Contato.find().populate('emergencia').exec()
      .then((contatos) => {
          res.json(contatos);
        },
        function(erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      );
  };

  // obtemContato
  controller.obtemContato = (req, res) => {
    var _id = req.params.id;
    Contato.findById(_id).exec()
      .then((contato) => {
          if(!contato) throw new Error("Contato não encontrado");
          res.json(contato);
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro);
        }
      )
  };

  // removeContato
  controller.removeContato = (req, res) => {
   var _id = sanitize(req.params.id);
   Contato.remove({"_id" : _id}).exec()
    .then(() => {
        res.status(204).end();
      },
      function(erro) {
        return console.error(erro);
      }
    )
  };

  // salvaContato
  controller.salvaContato = function(req, res) {
    var _id = req.body._id;
    var dados = {
      "nome" : req.body.nome,
      "email" : req.body.email,
      "emergencia" : req.body.emergencia = req.body.emergencia || null
    }  
    if(_id) {
      Contato.findByIdAndUpdate(_id, req.body).exec()
        .then((contato) => {
            res.json(contato);
          },
          function(erro) {
            console.error(erro);
            res.status(500).json(erro);
          }
        );
    } else {
      Contato.create(req.body)
        .then((contato) => {
            res.status(201).json(contato);
          },
          function(erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        )
    }
  };
 
  return controller;
}