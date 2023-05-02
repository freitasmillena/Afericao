var express = require('express');
var router = express.Router();
var Exame = require('../controllers/exame')


/* Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado"; */
router.get('/api/emd', function(req, res, next) {
  if(req.query.res){
    Exame.listOk()
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção dos exames com resultado válido")
    })
  }
  else if (req.query.modalidade){
    Exame.listModalidade(req.query.modalidade)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção dos exames na modalidade")
    })
  }
  else {
    Exame.list()
    .then(exames => {
      console.log(req.query.res)
      res.jsonp(exames)
    })
    .catch(erro => {
      console.log("Erro na obtenção da lista de exames: " + erro)
    })
  }
  
});


/* GET /api/emd/:id - Devolve a informação completa de um EMD; */
router.get('/api/emd/:id', function(req, res) {
  Exame.getLista(req.params.id)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção do exame: " + erro)
    })
});

/* GET /api/modalidades - Devolve a lista de modalidades, sem repetições; */
router.get('/api/modalidades', function(req, res) {
  Exame.modalidades()
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção das modalidades")
    })
});

/* GET /api/atletas?gen=F - Devolve uma lista ordenada alfabeticamente com os nomes dos
atletas de género feminino;*/
router.get('/api/atletas', function(req, res) {
  if(req.query.gen){
    Exame.atletasFem(req.query.gen)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção dos atletas por género")
    })
  }
  else if(req.query.clube){
    Exame.clube(req.query.clube)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção dos atletas por clube")
    })
  }
  
});

module.exports = router;
