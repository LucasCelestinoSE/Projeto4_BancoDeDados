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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegrasDeNegocio = void 0;
const ConnectionToPg_1 = __importDefault(require("./ConnectionToPg"));
class RegrasDeNegocio {
    constructor() {
        this.dbConnection = ConnectionToPg_1.default.getInstance();
    }
    inicializar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection.connect();
        });
    }
    desconectar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection.disconnect();
        });
    }
    /* Esse método lista todos os itens de uma tabela, dado o schema e a tabela */
    queryTable(nome_tabela, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dbConnection.getClient();
            try {
                // Definir o search_path
                yield client.query(`SET search_path TO ${schema}`);
                // Executar a consulta
                const res = yield client.query(`SELECT * FROM ${nome_tabela}`);
                console.log(res.rows);
                return res.rows;
            }
            catch (err) {
                console.error(`Error de query na tabela ${nome_tabela}`, err.stack);
                throw err;
            }
        });
    }
    /* Esse método insere uma pessoa na tabela 'pessoas' */
    inserirPessoa(pessoa, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dbConnection.getClient();
            try {
                yield client.query('BEGIN');
                const res = yield client.query(`SELECT cpf, idpessoas FROM ${schema}.pessoas WHERE cpf = $1 OR idpessoas = $2`, [pessoa.cpf, pessoa.idpessoas]);
                if (res.rows.length > 0) {
                    return console.log('Pessoa já existe');
                }
                // Consulta usando os valores da interface
                yield client.query(`
                INSERT INTO ${schema}.pessoas (idpessoas, cpf, numero_celular, email)
                VALUES ($1, $2, $3, $4)
            `, [pessoa.idpessoas, pessoa.cpf, pessoa.numero_celular, pessoa.email]);
                yield client.query('COMMIT');
                console.log('Pessoa inserida com sucesso!');
            }
            catch (err) {
                yield client.query('ROLLBACK');
                console.error('Erro ao inserir pessoa', err.stack);
                throw err;
            }
        });
    }
}
exports.RegrasDeNegocio = RegrasDeNegocio;
