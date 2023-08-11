[🇧🇷](#pt-br) / [🇺🇸](#en-us) 

<a id="pt-br"></a>
# Nolan - Server 
Este é o meu projeto final para o curso de engenharia de computação para a Universidade Federal de Goiás.

## Sobre
A ideia do projeto foi montar um pequeno software capaz de gerir um cinema, tanto na parte administrativa quanto nas vendas.
Ele é dividido em 3 módulos: <br>
* [Nolan Server](https://github.com/CaioZirretta/nolan-server)
* [Nolan Adm](https://github.com/CaioZirretta/nolan-adm)
* [Nolan Customer](https://github.com/CaioZirretta/nolan-customer)


## Tecnologias
* TypeScript
* Express
* Prisma ORM

## Instação
Para rodar o projeto, basta configurar suas variáveis de ambiente conforme o arquivo <i>typings.d.ts</i>
e executar o comando 
```
npm run dev
```

## Exemplos

### Requisição para criar um usuário
``` json
{
    "username": "teste",
    "password": "teste",
    "createdAt": "2023-01-01T00:00:00.000Z"
}
```
<br>
<hr>

<a id="en-us"></a>
# Nolan - Server
This is my final project for my engineering bachelor degree for Universidade Federal de Goiás (Goiás' Federal University)

## About
The ideia for the project is to buil a small software capable of managing a cinema both in the administrative aspect and the sales one.
<br>It is divided in 3 modules: <br>
* [Nolan Server](https://github.com/CaioZirretta/nolan-server)
* [Nolan Adm](https://github.com/CaioZirretta/nolan-adm)
* [Nolan Customer](https://github.com/CaioZirretta/nolan-customer)


## Technologies
* TypeScript
* Express
* Prisma ORM

## Instação
To run the project, it's only needed to setup the environment variables as in <i>typings.d.ts</i>
and execute the following command:
```
npm run dev
```

## Exemples

### Request to create an user 
``` json
{
    "username": "teste",
    "password": "teste",
    "createdAt": "2023-01-01T00:00:00.000Z"
}
```

