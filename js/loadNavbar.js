// js/loadNavbar.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("../pages/navbar.html") // ajuste se necessário
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const menuToggle = document.getElementById("menu-toggle");
      const navbar = document.getElementById("navbar");
      const loginBtn = document.getElementById("login-btn");
      const logoutBtn = document.getElementById("logout-btn");
      const logoutLink = document.getElementById("logout-link");

      if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
          navbar.classList.toggle("active");
        });

        document.querySelectorAll("#navbar ul li a").forEach((link) => {
          link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
              navbar.classList.remove("active");
            }
          });
        });
      }

      // Lógica de visibilidade de login/logout.
      const token = localStorage.getItem("token");
      if (token) {
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
      } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
      }

      // Lógica de logout
      if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          // Opcional: Limpar o carrinho ao fazer logout
          if (typeof clearCart === "function") {
            // Verifica se a função existe
            clearCart();
          }
          window.location.href = "../index.html"; // ou outra página de destino
        });
      }

      // ✅ Chama a função para atualizar o contador do carrinho ao carregar a navbar
      if (typeof updateCartCounter === "function") {
        // Verifica se a função existe
        updateCartCounter();
      } else {
        console.warn(
          "Função 'updateCartCounter' não encontrada. Verifique se 'cartUtils.js' está carregado corretamente."
        );
      }
    })
    .catch((error) => console.error("Erro ao carregar a navbar:", error));
});
