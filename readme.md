# Projeto Biblioteca

Este projeto é um exemplo de aplicação Node.js que se conecta a um banco de dados PostgreSQL para inserir e consultar dados de uma tabela.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente incluído com o Node.js)
- Banco de dados PostgreSQL

## Passos para Inicialização

### 1. Instalar Node.js e npm

Se você ainda não tem o Node.js instalado, siga as instruções no site oficial para instalar o Node.js e o npm: [Node.js Downloads](https://nodejs.org/en/download/)

### 2. Clonar o Repositório

Clone este repositório para sua máquina local usando o comando:

```sh
git clone https://github.com/LucasCelestinoSE/Projeto4_BancoDeDados.git
cd Projeto4_BancoDeDados
npm install
```

### 3. Instale as dependências do projeto usando o npm:
```
npm install
```

### 4. Configurar o Banco de Dados
Certifique-se de que você tem um banco de dados PostgreSQL em execução e que as credenciais no código (index.js) estão corretas. As configurações atuais são:
```

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
```
### 5. Executar o Código.
node index.js
