# React + Vite

Tecnologias Utilizadas
    -React.js
    -JavaScript (ES6+)
    -JSON Server (API fake)
    -CSS

Funcionalidades
    -Adicionar produtos com nome e preço formatado.
    -Atualizar a quantidade de um produto (incrementar e decrementar).
    -Calcular automaticamente o valor total dos produtos.
    -Remover um produto da lista.

Estrutura do Projeto
    MeuProjeto
    ┣ src
    ┃ ┣ components
    ┃ ┃ ┣   Table.jsx (Tabela de produtos)
    ┃ ┃ ┣  InputValue.jsx (Formulário para adicionar produtos)
    ┃ ┣  App.jsx (Componente principal)
    ┃ ┣  index.js (Ponto de entrada)
    ┣  db.json (Banco de dados fake)
    ┣  package.json
    ┣  README.md

Como rodar o rojeto
    Instalar as dependências : npm install
    Rodar o JSON Server (API Fake): npx json-server --watch db.json --port 3000
    Iniciar a aplicação : npm run dev

Desenvolvido por Antony.