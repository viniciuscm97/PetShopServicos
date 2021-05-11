const Servicos = require('../models/servicos')

module.exports = app => {

    app.get('/servicos',(req,res) => {
        Servicos.lista(res)
    })

    app.get('/servicos/:id', (req,res) => {
        Servicos.listaPorId(parseInt(req.params.id),res)
    })

    app.post('/servicos', (req,res) => {
        Servicos.adiciona(req.body,res)
    })

    app.delete('/servicos/:id', (req,res) => {
        Servicos.deleta(parseInt(req.params.id), res)

    })

    app.put('/servicos/:id', (req,res) => {

        Servicos.altera(req.body,parseInt(req.params.id),res)
    })
}