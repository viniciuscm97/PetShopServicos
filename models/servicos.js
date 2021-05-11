const conexao = require('../infraestrutura/conexao');

class Servico {
    lista(res){
        const sql = 'select * from servicos'

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    adiciona(dados, res){
        const sql = 'insert into servicos set ?';

        conexao.query(sql,dados, (erro,resultado) =>{
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({'idInserido':resultado.insertId, 'valores': dados})
            }
        })
    }

    deleta(id,res){

        const sql = `delete from servicos where id = ${id}`;

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })

    }

    listaPorId(id,res){

        const sql = 'select * from servicos where id = ?'

        conexao.query(sql,id, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })

    }

    altera(dados,id,res){

        const sql = `update servicos set ? where ?`;
        
        conexao.query(sql,[dados,id],(erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })

    }

}

module.exports = new Servico