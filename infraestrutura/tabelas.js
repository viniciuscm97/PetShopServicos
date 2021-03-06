class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarAtendimentos()
        this.criarServicos()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE if not exists atendimentos (id int not null auto_increment primary key, cliente varchar(50) not null, pet varchar(20), servico varchar(20) not null, data datetime not null, dataCriacao datetime not null, status varchar(20) not null, observacoes text)';
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela atendimentos criada com sucesso')
            }
        })
    }

    criarServicos(){
        const sql = 'create table if not exists servicos (id int not null auto_increment primary key, nome varchar(20), preco float)'
        
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela servicos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas