## Descrição do Projeto

O Urban Tracking Backoffice Web é uma aplicação web desenvolvida para gerir os dados do sistema **Urban Tracking**, incluindo utilizadores, rotas, entidades, e muito mais. A interface utiliza **React Admin** integrada com a API do **Urban Tracking** e foi criada com **Vite.js**, que oferece uma experiência de desenvolvimento mais rápida e otimizada.

## Tecnologias Utilizadas

- **Vite.js**: Ferramenta de construção e empacotamento.
- **React.js**: Framework para construção da interface.
- **React Admin**: Ferramenta para criação de backoffices robustos.
- **API Urban Tracking**: Fonte de dados para gestão e operações.

## Pré-requisitos

- Node.js (v18 ou superior).
- NPM (v10.8.2 ou superior).

## Como Executar

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd urban-tracking-backoffice
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4. Inicie o servidor de production:
    ```bash
    npm run build
    ```

5. A aplicação estará disponível em `http://localhost:80/` (porta padrão do Vite).

## Estrutura do Projeto

- **/src**: Contém os componentes principais e a configuração do React Admin.
- **/public**: Arquivos estáticos como imagens e o favicon.
- **/utils**: Serviços para conexão com a API.

## Funcionalidades Principais

- Gestão de utilizadores (CRUD).
- Visualização e gestão de rotas.
- Acompanhamento de logs de auditoria.
- Gestão de entidades e zonas.

## Contribuição

1. Crie uma branch para a sua funcionalidade:
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   ```
2. Faça commit das alterações:
   ```bash
   git commit -m \"Descrição da alteração\"
   ```
3. Envie a branch:
   ```bash
   git push origin feature/nome-da-funcionalidade
   ```

## Contato

Para dúvidas ou problemas, entre em contato com a equipa de desenvolvimento.
