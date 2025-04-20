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

          const userData = parseJwt(data.token);
          alert("Login realizado com sucesso!");

          if (userData.is_admin) {
            window.location.href = "../admin/dashboard.html";
          } else {
            window.location.href = "../user/home.html";
          }
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

function parseJwt(token) {
  const base64 = token.split(".")[1];
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
