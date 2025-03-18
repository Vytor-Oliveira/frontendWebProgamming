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

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome_completo = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  try {
    const response = await fetch("https://seu-backend.com/api/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome_completo, email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    } else {
      alert("Erro: " + data.message);
    }
  } catch (error) {
    alert("Erro ao conectar ao servidor. Tente novamente.");
    console.error(error);
  }
});