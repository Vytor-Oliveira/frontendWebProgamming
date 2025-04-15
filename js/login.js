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
