let indiceAtual = 0; // Índice do produto visível no carrossel

// Função para mover o carrossel
function moverCarrossel(direcao) {
  const produtos = document.querySelectorAll(".produto");
  const totalProdutos = produtos.length;

  indiceAtual += direcao;

  if (indiceAtual < 0) {
    indiceAtual = totalProdutos - 1;
  } else if (indiceAtual >= totalProdutos) {
    indiceAtual = 0;
  }

  const deslocamento = -indiceAtual * (produtos[0].offsetWidth + 30); // 30px de margin
  const carrossel = document.querySelector(".carrossel");
  carrossel.style.transform = `translateX(${deslocamento}px)`;
}

// ===================== CADASTRO =====================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // ✅ Só executa se for a página de cadastro (com campo "nome")
  if (form && document.getElementById("nome")) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

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
          window.location.href = "./login.html";
        } else {
          alert(`Erro: ${data.message}`);
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao conectar com o servidor. Tente novamente.");
      }
    });
  }
});

// ===================== LOGIN =====================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-login");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        const res = await fetch("https://puffwear.up.railway.app/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          alert("Login realizado com sucesso!");
          window.location.href = "./dashboard.html";
        } else {
          alert(data.message || "Erro ao fazer login");
        }
      } catch (err) {
        console.error(err);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
});
