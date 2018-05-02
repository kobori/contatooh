// Módulo com AngularJs
/*
Criamos um módulo através da função angular.module. 
Ela recebe dois parâmetros: o primeiro é o nome do módulo; o segundo, um array com todas as suas dependências. Se não temos nenhuma dependência por enquanto, ainda assim, precisamos passar o array vazio como parâmetro.
*/

var app = angular.module('contatooh', ['ngRoute', 'ngResource']); //angular-route so funcionou na versão 1.3
                                                                  //angular-resource so funcionou na versão 1.3  

app.config(function($routeProvider) {

  $routeProvider
  .when('/contatos', {
    templateUrl: 'partials/contatos.njk',
    controller: 'ContatosController'
  })

  .when('/contato/:contatoId', {
    templateUrl: 'partials/contato.njk',
    controller: 'ContatoController'
  })

  .when('/contato', {
    templateUrl: 'partials/contato.njk',
    controller: 'ContatoController'
  })

  .otherwise({redirectTo: '/contatos'})

});