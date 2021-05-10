const conexao = require('../infraestrutura/conexao')

class Atendimento {

    adiciona(atendimento){
        const sql = 'INSERT INTO atendimentos set ?';
        
        conexao.query(sql, atendimento, (erro, resultado) => {
            if(erro) {
                console.log(erro)
            }else{
                console.log(`ID: ${resultado.insertId}, status: ${resultado.serverStatus}`)
            }
        })
    }
}

module.exports = new Atendimento