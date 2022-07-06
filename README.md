# Engenharia de Software - Terceiro Trabalho

## Alunos

- Isaque Santana Copque
- Jorge Luis da Silva Batista Filho
- Ricardo da Silva Rodrigues

## Organização

- DomainEnsino
  - Código do domínio da instituição de ensino. (Nodejs) localhost:8082

- DomainValidacao
  - Código do domínio da instituição validadora. (Nodejs) localhost:8081

- DomainValidador
  - Código do domínio de validação. (Nodejs) localhost:8083

- Interface
  - Código das interfaces de usuários. (React)

Detalhes da arquitetura no relatório.

## Requisitos

- Node.js

- Banco MYSQL
  - Banco ensinodb    localhost:3306
  - Banco validacaodb localhost:3306
  - Banco validadordb localhost:3306

## Execução

Os pacotes utilizados para implementar os domínios estão na pasta node_modules, que foi colocada separadamente para diminuir o tamanho do repositório. Os pacotes utilizados pelo React na interface ultrapassam o tamanho limite do repositório, e por isso devem ser instalados manualmente. Para executar a aplicação obtenha as ferramentas indicadas nos requisitos e siga os seguintes passos:

1. Clone o repositório
2. Jogue a pasta node_modules em todos os domínios (menos a interface).
3. Inicie uma aplicação react com npx create-react-app app
4. Instale as depedências que faltam:
    1. npm i axios
    2. npm i react-icons
    3. npm i react-cookie
5. Jogue o código da interface dentro do diretório do projeto criado.
6. 'npm run start' em cada domínio inclusive na interface.

Rota para a instituição validadora /validora <br>
Rota para a instituição de ensino /ensino
