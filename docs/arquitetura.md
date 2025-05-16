# Arquitetura do Sistema

Optamos por uma arquitetura monolítica, onde front-end e back-end estão integrados em uma única aplicação. Essa abordagem simplifica o desenvolvimento inicial e a manutenção, sendo ideal para projetos de pequeno a médio porte.

## Vantagens da Arquitetura Monolítica:
 - Desenvolvimento mais rápido e simples: O sistema é um único bloco, facilitando a implementação.
 - Facilidade de integração: Toda a lógica reside em um único repositório.
 - Custo reduzido: Sem necessidade de infraestrutura complexa para múltiplos microserviços.

## Justificativa das Tecnologias

1. Node.js (Back-end)

 - Escolhemos Node.js devido ao seu desempenho e escalabilidade, especialmente para aplicações com alta interação do usuário.
I/O não bloqueante: Ideal para operações intensivas de leitura e escrita.
 - Escalabilidade: Gerencia múltiplas conexões simultâneas de forma eficiente.
 - Ecossistema rico: Grande variedade de pacotes disponíveis no npm.
  **Tecnologias utilizadas:**
 - Express.js: Framework para criação de APIs RESTful.
 - JWT: Biblioteca para autenticação segura.

2. MySQL (Banco de Dados)

Optamos pelo MySQL por sua confiabilidade e suporte a transações complexas.
Modelo Relacional: Ideal para armazenar informações estruturadas.
 - SQL: Facilita a manipulação e consulta de dados.
 - Escalabilidade e performance: Suporte a grandes volumes de dados.
Uso no sistema:
 - Produtos: Nome, descrição, preço e categorias.
 - Usuários: Nome, e-mail e senha criptografada.
 - Transações: Registro de compras e pagamentos.

3. JWT - Autenticação

Utilizamos JWT para autenticação segura e escalável.
Elimina necessidade de sessões no servidor.
Tokens assinados digitalmente garantem integridade.
Fluxo de autenticação:
 - Login: Usuário envia credenciais.
 - Geração do Token: Servidor valida e retorna um JWT.
 - Validação: Cliente envia token nas requisições subsequentes.

4. Front-end: HTML, CSS, JavaScript

Para o front-end, utilizamos tecnologias padrão:
 - HTML: Estrutura do conteúdo.
 - CSS: Estilização e responsividade.
 - JavaScript: Interatividade e comunicação assíncrona com o back-end.
Ferramentas adicionais:
 - Bootstrap: Layout responsivo e estilizado.
 - Axios: Requisições HTTP assíncronas.