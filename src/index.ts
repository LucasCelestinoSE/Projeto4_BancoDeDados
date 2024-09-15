import { RegrasDeNegocio } from './Postgress/BusinessRules';
import ConnectionToPg from './Postgress/ConnectionToPg';

async function app() {
    const regrasDeNegocio = new RegrasDeNegocio();
    const schema = 'mydb';
    const pessoa = {
        idpessoas: 12,
        cpf: '1234352343',
        numero_celular: '1234567890',
        email: 'example@example.com'
    };

    try {
        // Inicializar conexão
        await regrasDeNegocio.inicializar();
        await regrasDeNegocio.inserirPessoa(pessoa, schema);

        // Consultar dados da tabela
        const tableData = await regrasDeNegocio.queryTable('pessoas', schema);
    } catch (err) {
        console.error('Erro durante a inserção e consulta:', err);
    } finally {
        // Fechar a conexão
        const connection = ConnectionToPg.getInstance();
        await connection.disconnect();
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
