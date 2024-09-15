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
const BusinessRules_1 = require("./Postgress/BusinessRules");
const ConnectionToPg_1 = __importDefault(require("./Postgress/ConnectionToPg"));
function app() {
    return __awaiter(this, void 0, void 0, function* () {
        const regrasDeNegocio = new BusinessRules_1.RegrasDeNegocio();
        const schema = 'mydb';
        const pessoa = {
            idpessoas: 12,
            cpf: '1234352343',
            numero_celular: '1234567890',
            email: 'example@example.com'
        };
        try {
            // Inicializar conexão
            yield regrasDeNegocio.inicializar();
            yield regrasDeNegocio.inserirPessoa(pessoa, schema);
            // Consultar dados da tabela
            const tableData = yield regrasDeNegocio.queryTable('pessoas', schema);
        }
        catch (err) {
            console.error('Erro durante a inserção e consulta:', err);
        }
        finally {
            // Fechar a conexão
            const connection = ConnectionToPg_1.default.getInstance();
            yield connection.disconnect();
        }
    });
}
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield app();
        }
        catch (err) {
            console.error('Erro ao executar a aplicação:', err);
        }
    });
}
runApp();
