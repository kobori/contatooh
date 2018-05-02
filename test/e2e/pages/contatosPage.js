var contatosPage = function() {

  this.visitar = function() {
    browser.get('http://localhost:3000/#/contatos');
  };

  this.obterTotalDeItensDaLista = function() {
    return element.all(by.repeater('contato in contatos')).count();
  };

  this.removerPrimeiroItemDaLista = function() {
    element(by.repeater("contato in contatos").row(0)).element(by.css('.btn')).click();
  };

}
module.exports = contatosPage;