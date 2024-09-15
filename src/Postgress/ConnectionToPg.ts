import { Client } from 'pg';

class ConnectionToPg {
    private static instance: ConnectionToPg;
    private client: Client;

    private constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'atividadescriptsql.cbaz9kiqzhal.us-east-1.rds.amazonaws.com',
            database: 'biblioteca',
            password: 'lucas123',
            port: 5432,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

    public static getInstance(): ConnectionToPg {
        if (!ConnectionToPg.instance) {
            ConnectionToPg.instance = new ConnectionToPg();
        }
        return ConnectionToPg.instance;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Conexão Inicializada');
        } catch (err) {
            console.error('Erro de conexão', (err as any).stack);
        }
    }

    async disconnect() {
        try {
            await this.client.end();
            console.log('Conexão Encerrada.');
        } catch (err) {
            console.error('Erro de desconexão', (err as any).stack);
        }
    }

    getClient() {
        return this.client;
    }
}

export default ConnectionToPg;