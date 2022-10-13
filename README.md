# Letmeask - Back-end - Api

# 🔗 Letmeask
<p>🚀 Aplicação voltada interação de usuários por meio de salas de perguntas e respostas</p>

# Status da Aplicação
<p>🚧 Aplicação Em Desevolvimento</p>

# Features
- Cadastro de Usuário
- Atualização de Email
- Atualização de Senha
- Recuperação de Senha
- Exclusão de Usuário
- Criação, Leitura e Exclusão de Salas
- Criação, Leitura e Exclusão de Perguntas
- Criação, Leitura e Exclusão de Respostas

# Tecnologias
- Node
- Typescript
- Prisma
- Jest

# Execução

Para executar o projeto você deve ter o docker, o node e o pacote yarn instalados, após clonar o projeto, use o exemplo para definir as variáveis de ambiente e digite os seguintes comandos:
```sh
 yarn
```
```sh
 docker-compose up -d
```

Se quiser usar o projeto sem volumes, você não precisa ter instalado o node e nem o pacote yarn, somente retire a tag volumes do arquivo docker-compose.yml e use o exemplo para definir as variáveis de ambiente, depois rode o seguinte comando:
```sh
 docker-compose up -d
```

Após subir os contêineres usando volumes ou não, rode o seguinte comando para executar as migrations:
```sh
docker exec -i api-letmeask yarn prisma migrate deploy
```
