const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send("servidor rodando, na porta GET")
    })

    app.post('/atendimentos', (req,res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento);

        res.send(`server rodando em POST`); 
    })
};