"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class ConnectionToPg {
    constructor() {
        this.client = new pg_1.Client({
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
    static getInstance() {
        if (!ConnectionToPg.instance) {
            ConnectionToPg.instance = new ConnectionToPg();
        }
        return ConnectionToPg.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log('Conexão Inicializada');
            }
            catch (err) {
                console.error('Erro de conexão', err.stack);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.end();
                console.log('Conexão Encerrada.');
            }
            catch (err) {
                console.error('Erro de desconexão', err.stack);
            }
        });
    }
    getClient() {
        return this.client;
    }
}
exports.default = ConnectionToPg;
