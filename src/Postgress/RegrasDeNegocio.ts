import ConnectionToPg from './ConnectionToPg';
interface Pessoa {
    idpessoas: number;  // Inteiro para 'idpessoas'
    cpf: string;        // String (character varying) para 'cpf'
    numero_celular: string;  // String para 'numero_celular'
    email: string;      // String para 'email'
}

export class RegrasDeNegocio {
    private dbConnection: ConnectionToPg;

    constructor() {
        this.dbConnection = ConnectionToPg.getInstance();
    }

    async inicializar() {
        await this.dbConnection.connect();
    }
    async desconectar() {
        await this.dbConnection.disconnect();
    }
    /* Esse método lista todos os itens de uma tabela, dado o schema e a tabela */
    async getTable(nome_tabela: string, schema: string): Promise<any[]> {
        const client = this.dbConnection.getClient();
        try {
            
    
            // Definir o search_path
            await client.query(`SET search_path TO ${schema}`);
            // Executar a consulta
            const res = await client.query(`SELECT * FROM ${nome_tabela}`);
    
            console.log(res.rows);
            return res.rows;
        } catch (err) {
            console.error(`Error de query na tabela ${nome_tabela}`, (err as any).stack);
            throw err;
        }
    }

    /* Esse método insere uma pessoa na tabela 'pessoas' */
    async inserirPessoa(pessoa: Pessoa, schema: string): Promise<void> {
        const client = this.dbConnection.getClient();
        try {
            await client.query('BEGIN');
            const res = await client.query(`SELECT cpf, idpessoas FROM ${schema}.pessoas WHERE cpf = $1 OR idpessoas = $2`, [pessoa.cpf, pessoa.idpessoas]);
            if (res.rows.length > 0) {
               return console.log('Pessoa já existe');
            }

            
            await client.query(`
                INSERT INTO ${schema}.pessoas (idpessoas, cpf, numero_celular, email)
                VALUES ($1, $2, $3, $4)
            `, [pessoa.idpessoas, pessoa.cpf, pessoa.numero_celular, pessoa.email]);
    
            await client.query('COMMIT');
            console.log('Pessoa inserida com sucesso!');
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Erro ao inserir pessoa', (err as any).stack);
            throw err;
        }
    }
    
    
}