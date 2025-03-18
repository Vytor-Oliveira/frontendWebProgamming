let indiceAtual = 0; // Índice do produto visível no carrossel

// Função para mover o carrossel
function moverCarrossel(direcao) {
  const produtos = document.querySelectorAll(".produto");
  const totalProdutos = produtos.length;

  // Atualiza o índice com base na direção
  indiceAtual += direcao;

  // Se estiver no final do carrossel, volta para o primeiro produto
  if (indiceAtual < 0) {
    indiceAtual = totalProdutos - 1;
  } else if (indiceAtual >= totalProdutos) {
    indiceAtual = 0;
  }

  // Calcula o deslocamento necessário para mostrar o produto atual
  const deslocamento = -indiceAtual * (produtos[0].offsetWidth + 30); // 30px de margin

  // Aplica o deslocamento ao carrossel
  const carrossel = document.querySelector(".carrossel");
  carrossel.style.transform = `translateX(${deslocamento}px)`;
}

// Função para mostrar detalhes do produto
function verDetalhes(produtoId) {
  alert("Você clicou para ver os detalhes do " + produtoId);
}
