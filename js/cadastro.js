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