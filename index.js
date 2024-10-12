const { Client } = require('pg');

// Funções de Regras de Negócio

async function connectToDatabase() {
    const client = new Client({
        user: 'postgres',
        host: 'db-biblioteca.c3bw53fs79fm.us-east-1.rds.amazonaws.com',
        database: 'biblioteca',
        password: 'aluno123',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Conexão Inicializada');
        return client;
    } catch (err) {
        console.error('Erro de conexão', err.stack);
        throw err;
    }
}

async function disconnectFromDatabase(client) {
    try {
        await client.end();
        console.log('Conexão Encerrada.');
    } catch (err) {
        console.error('Erro de desconexão', err.stack);
        throw err;
    }
}

async function getTable(client, nome_tabela, schema) {
    try {
        // Definir o search_path
        await client.query(`SET search_path TO ${schema}`);
        // Executar a consulta
        const res = await client.query(`SELECT * FROM ${nome_tabela}`);
        console.log(res.rows);
        return res.rows;
    } catch (err) {
        console.error(`Error de query na tabela ${nome_tabela}`, err.stack);
        throw err;
    }
}

async function inserirPessoa(client, pessoa, schema) {
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
        console.error('Erro ao inserir pessoa', err.stack);
        throw err;
    }
}

// MAIN

async function app() {
    const schema = 'mydb';
    const pessoa = {
        idpessoas: 10,
        cpf: '01528984622',
        numero_celular: 1234567890,
        email: 'lucas@example.com'
    };

    let client;
    try {
        // Inicializar conexão
        client = await connectToDatabase();
        await inserirPessoa(client, pessoa, schema);

        // Consultar dados da tabela
        const tableData = await getTable(client, 'pessoas', schema);
    } catch (err) {
        console.error('Erro durante a inserção e consulta:', err);
    } finally {
        // Fechar a conexão
        if (client) {
            await disconnectFromDatabase(client);
        }
    }
}

async function runApp() {
    try {
        await app();
    } catch (err) {
        console.error('Erro ao executar a aplicação:', err);
    }
}

runApp();