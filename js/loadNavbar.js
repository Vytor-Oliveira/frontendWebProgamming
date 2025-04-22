// js/loadNavbar.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("../pages/navbar.html") // ou ajuste o caminho conforme necessário
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const menuToggle = document.getElementById("menu-toggle");
      const navbar = document.getElementById("navbar");

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
    });
});
