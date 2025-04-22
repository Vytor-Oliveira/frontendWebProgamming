document.addEventListener("DOMContentLoaded", () => {
  fetch("../pages/navbar.html") // ou ajuste o caminho conforme necessário
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const menuToggle = document.getElementById("menu-toggle");
      const navbar = document.getElementById("navbar");

      if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
          navbar.classList.toggle("active");
        });

        document.querySelectorAll("#navbar ul li a").forEach(link => {
          link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
              navbar.classList.remove("active");
            }
          });
        });
      } else {
        console.error("menu-toggle ou navbar não encontrado no DOM!");
      }
    })
    .catch(error => console.error("Erro ao carregar a navbar:", error));
});