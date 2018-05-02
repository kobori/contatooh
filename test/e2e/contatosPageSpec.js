var ContatosPage = new require('./pages/contatosPage');

describe('Página principal', function() {

  var pagina = new ContatosPage();

  beforeEach(function() {
    pagina.visitar();
  }); 

  it('Deve remover um contato da lista', function() {

    var totalAntes = pagina.obterTotalDeItensDaLista();
    pagina.removerPrimeiroItemDaLista();
    var totalDepois = pagina.obterTotalDeItensDaLista();
    expect(totalDepois).toBeLessThan(totalAntes);
  });
  
});
