# **Projeto Labook**

## 📖 Introdução

O Projeto Labook é uma API de posts onde é possível criar uma conta ou logar nela onde é possível também criar posts.

Os conteúdos principais a serem estudados são:

- Conceito de TypeScript.
- Criação de uma API.
- Conter todos os principais métodos: get, post, put e delete.
- Arquitetura em camadas.
- Programação Orientada a Objeto.
- Autenticação.

## 🔗Link de Acesso

- Documentação: [clique aqui!](https://documenter.getpostman.com/view/25826643/2s93eYUBv1).

## 📄Concepção do Projeto

### Instalando

```bash
# Instalando dependências
npm install

# executando o projeto
npm run dev e npm run start.

#obs: Para o funcionamento da API é necessário estar com a porta 3003 aberta dando o npm start no projeto.
```

### Funcionalidades

```bash
. Requisições:
-SignUp: criar um usuario na API com o método post.
-Login: Entrar com usuário na API com o método post.

-GetPosts: Chamar todos os posts da API, mas só se informar o token criado no login ou
signup, com o método get.
-CreatePost: Pode criar um post na API, mas só se informar o token criado no login ou
signup, com o método post.
-EditPost: Pode editar um post na API, mas só se informar o token criado no login ou
signup e o id do post a ser editado, com o método put.
-DeletePost: Pode deletar um post na API, mas só se informar o token criado no login ou
signup e o id do post a ser deletado, com o método delete.
-LikeOrDislikePost - Mecânica de like ou dislike da API, mas só se for informado o token
adquirido no login ou signup e o id do post a ser curtido, também será necessário informar
no body o true ou false, onde true é like e false deslike.
```

### Bibliotecas Utilizadas

```bash
#dependencies:
bcryptjs,
cors,
dotenv,
express,
jsonwebtoken,
knex,
sqlite3,
uuid,
zod

#devDependencies:
@types/bcryptjs,
@types/cors,
@types/express,
@types/jsonwebtoken,
@types/knex,
@types/node,
@types/uuid,
ts-node-dev,
typescript

```

## 💡Programas utilizados:

- VSCode
- PostMan

## 💻Tecnologias

![TypesScript](https://img.shields.io/badge/TypeScript-1572B6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-f8f8ff?style=for-the-badge&logo=express&logoColor=black)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

## 📫 Contato

<p>Email: italo.rocha.de.oliveira@gmail.com</p>
<a href = "mailto:italo.rocha.de.oliveira@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" alvo ="_blank"></a>
<a href="https://www.linkedin.com/in/italorochaoliveira/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
