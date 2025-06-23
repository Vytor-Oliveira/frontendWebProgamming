# Requisitos Funcionais e Não Funcionais

## Requisitos Funcionais

- RF1: O sistema deve permitir que o usuário faça login utilizando um nome de usuário e senha.
- RF2: O sistema deve validar as credenciais do usuário no banco de dados e, em caso de sucesso, gerar um JSON Web Token (JWT) para autenticação.
- RF3: O JWT gerado deve ser enviado ao cliente e armazenado de maneira segura no lado do cliente.
- RF4: O sistema deve exibir uma lista de produtos disponíveis, incluindo nome, descrição, preço e imagem.
- RF5: O sistema deve permitir que o usuário veja os detalhes de um produto ao clicar nele.
- RF6: O sistema deve permitir que o usuário selecione um produto e escolha o tamanho desejado antes de adicionar ao carrinho de compras.
- RF7: O sistema deve permitir que o usuário adicione produtos ao carrinho de compras, incluindo seleção de quantidade e tamanho.
- RF8: O sistema deve permitir que o usuário visualize o conteúdo do carrinho, altere a quantidade dos itens ou remova produtos.
- RF9: O sistema deve garantir que o usuário esteja autenticado (login) antes de proceder com a finalização da compra.
- RF10: O sistema deve permitir que o usuário forneça dados de pagamento e endereço de entrega.
- RF11: O sistema deve permitir que o usuário se cadastre fornecendo informações como nome, e-mail, senha e endereço.
- RF12: O sistema deve permitir que o administrador adicione, edite ou exclua produtos da loja, incluindo informações como nome, preço, descrição, imagens e disponibilidade de tamanho.

## Requisitos Não Funcionais

- RNF1: O tempo de resposta para exibição da página inicial (Home) deve ser inferior de 3 a 4 segundos.
- RNF2: O sistema deve ser projetado de forma escalável, permitindo a adição de novos produtos, categorias e métodos de pagamento sem grandes modificações no código.
- RNF3: O sistema deve garantir que todas as senhas dos usuários sejam armazenadas de forma segura, utilizando algoritmos de hashing.
- RNF4: O sistema deve ser responsivo, garantindo que a experiência do usuário seja consistente em dispositivos móveis, tablets e desktops.
- RNF5: A interface do sistema deve ser intuitiva e fácil de usar, com fluxos de navegação claros e um design visualmente agradável.
- RNF6: O código do sistema deve seguir boas práticas de desenvolvimento, incluindo comentários claros, nomes de variáveis significativos e estrutura modular.
- RNF7: O sistema deve ser compatível com os principais navegadores (Chrome, Firefox, Safari, Edge).
- RNF8: O sistema deve estar em conformidade com regulamentos de proteção de dados como a LGPD.
