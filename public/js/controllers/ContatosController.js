/*
A função controller recebe como primeiro parâmetro o nome do controller, o segundo, a função que o de dirá. Se o papel do controller é disponibilizar para a view o dado de que ela precisa, vamos criar a variável total:
*/

var app = angular.module('contatooh');
app.controller('ContatosController', 
  function(Contato, $scope) {
    
    $scope.contatos = [];

    $scope.filtro = "";

    $scope.mensagem = {texto: " "};

    function buscarContato(){ 
      Contato.query(
        function(contatos) {
          $scope.contatos = contatos;
          $scope.mensagem = {};
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = {
            texto: 'Não foi possivel obter a lista'
          };
        }
      );
    }
    buscarContato();

    $scope.remove = function(contato) {
      Contato.delete({id: contato._id},
        buscarContato,
        function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possivel remover o contato'
          }
          console.log(erro);
        }
      );
    };

    $scope.mensagem = {texto: ''};

   

  });