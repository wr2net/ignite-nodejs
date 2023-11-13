# Criando API REST com Node.js

## TO DO LIST

### RF
- [x] O usuário deve poder criar uma nova transação;
- [ ] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

### RN
- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [ ] Deverá ser possível identificarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações as quais ele criou;

## Iniciando servidor:
```bash
node src/server.js
```

## Dependêcias
* knex - banco de dados

## Como criar uma migration:
```bash
npm run knex -- migrate:make create-nomeDaTabela
```
