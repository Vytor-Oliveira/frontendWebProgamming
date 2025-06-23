# Arquitetura e Tecnologias Escolhidas

## Arquitetura do Sistema

Adotamos uma **arquitetura distribuída**, em que o front-end e o back-end estão hospedados e mantidos em **repositórios separados**. Essa separação promove maior flexibilidade no desenvolvimento e na implantação, além de facilitar a escalabilidade e a manutenção dos serviços individualmente.

### Hospedagem e Implantação

- **Front-end:** Hospedado na [Vercel](https://vercel.com), com integração contínua e distribuição via CDN.
- **Back-end:** Implantado na [Railway](https://railway.app), plataforma que facilita a gestão de aplicações Node.js, ambientes e variáveis.
- **Banco de Dados:** Utilizamos PostgreSQL por meio da plataforma Supabase, que oferece gerenciamento completo, autenticação integrada e alta performance.

---

## Justificativa das Tecnologias

### 1. Node.js (Back-end)

- Plataforma leve e eficiente, ideal para aplicações com alta carga de I/O.
- Arquitetura baseada em eventos e I/O não bloqueante, permitindo a manipulação eficiente de múltiplas requisições simultâneas.
- Ecossistema maduro com milhares de pacotes disponíveis via `npm`.

**Tecnologias utilizadas:**

- **Express.js:** Framework minimalista para construção de APIs RESTful.
- **JWT:** Biblioteca para autenticação segura baseada em tokens.

---

### 2. PostgreSQL (via Supabase - Banco de Dados)

Optamos por PostgreSQL, acessado por meio do Supabase, para garantir integridade, escalabilidade e facilidade de manutenção.

**Motivos da escolha:**

- Banco de dados relacional com suporte robusto a transações.
- SQL como linguagem de consulta, facilitando integração e análise.
- Supabase oferece segurança integrada, autenticação e painel de administração.

**Utilização no sistema:**

- **Produtos:** Nome, descrição, preço e categorias.
- **Usuários:** Nome, e-mail e senha criptografada.

---

### 3. JWT - Autenticação

JWT (JSON Web Token) é utilizado para autenticação segura, sem a necessidade de manter sessões no servidor.

**Fluxo de autenticação:**

1. O usuário realiza login com credenciais válidas.
2. O servidor valida as credenciais e retorna um token JWT.
3. O token é armazenado no cliente e enviado nas próximas requisições.
4. O servidor valida o token para conceder acesso às rotas protegidas.

**Vantagens:**

- Escalabilidade: não depende de sessões no servidor.
- Segurança: tokens assinados garantem integridade e autenticidade.

---

### 4. Front-end: HTML, CSS, JavaScript

Utilizamos tecnologias web padrão, garantindo ampla compatibilidade e performance.

**Estrutura tecnológica:**

- **HTML:** Marcações semânticas e estruturadas.
- **CSS:** Estilização com responsividade, utilizando Bootstrap.
- **JavaScript:** Lógica de interação, integração com APIs e dinamismo da aplicação.

**Bibliotecas adicionais:**

- **Bootstrap:** Framework CSS para layout responsivo e componentes visuais prontos.
- **Axios:** Cliente HTTP para comunicação assíncrona com o back-end.

---
