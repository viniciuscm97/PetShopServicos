const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {

    listaPorId(id,res){
        const sql = `select * from atendimentos where id= ${id}`;

        conexao.query(sql, (erro,resultado)=>{
            const atendimento = resultado[0];

            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    lista(res){
        const sql = 'select * from atendimentos';

        conexao.query(sql,(erro,resultado) => {
            if(erro) {
                res.status(400).json(erro)
            }else{
                if(resultado)
                res.status(201).json(resultado)
            }
        });

    }

    adiciona(dados, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(dados.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = dados.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        }else{
            const atendimento = {...dados, dataCriacao,data};
    
            const sql = 'INSERT INTO atendimentos set ?';
            
            conexao.query(sql, atendimento, (erro, resultado) => {
                if(erro) {
                    res.status(400).json(erro)
                }else{
                    if(resultado)
                    res.status(201).json({'ID do usuário': resultado.insertId, 'dados enviados': atendimento})
                }
            })

        }

    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = `update atendimentos set ? where id = ?`;
        
        conexao.query(sql,[valores,id], (erro,resultado) =>{
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores,id})
            }
        })
    }

    deleta(id,res){
        const sql = `delete from atendimentos where id = ?`;

        conexao.query(sql,id,(erro,resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({'id removido':id})
            }
        })
    }
}

module.exports = new Atendimento