var Exame = require('../models/exame')


module.exports.list = () => {
    return Exame.find({},{_id:1, nome:1, data: 1, resultado: 1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            console.log(erro)
        })

}

module.exports.getLista = id => {
    return Exame.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                console.log(erro)
            })
}

module.exports.modalidades = () => {
    return Exame.distinct("modalidade")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.listOk = () => {
    return Exame.find({resultado: true})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            console.log(erro)
        })

}

module.exports.listModalidade = mod => {
    return Exame.find({modalidade: mod})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            console.log(erro)
        })

}

module.exports.atletasFem = gen => {
    return Exame.aggregate([{$match: {género: gen}}, {$project: {nomeCompleto: {$concat: ["$nome.primeiro", " ", "$nome.último"]}, _id: 0}}]).sort({nomeCompleto: 1})       
        .then(dados => {
            return dados
        })
        .catch(erro => {
            console.log(erro)
        })
}

module.exports.clube = c => {
    return Exame.aggregate([{$match: {clube: c}}, {$project: {nomeCompleto: {$concat: ["$nome.primeiro", " ", "$nome.último"]}, _id: 0}}]).sort({nomeCompleto: 1})       
        .then(dados => {
            return dados
        })
        .catch(erro => {
            console.log(erro)
        })
}


