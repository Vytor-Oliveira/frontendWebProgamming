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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("https://puffwear.up.railway.app/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; // Redireciona para login
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao conectar com o servidor. Tente novamente.");
    }
  });
});