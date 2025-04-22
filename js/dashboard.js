// ✅ 1. URL da API no topo, para evitar ReferenceError
const API_URL = "https://puffwear.up.railway.app/produtos";

// ✅ 2. Função para decodificar o token JWT
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(base64);
  } catch (e) {
    return null;
  }
}

// ✅ 3. Validação do token e acesso de admin
const token = localStorage.getItem("token");
const user = token ? parseJwt(token) : null;
const isAdminPage = window.location.pathname.includes("dashboard");

// Se não tiver token ou não for admin, redireciona
if (!token || !user || (isAdminPage && !user.is_admin)) {
  localStorage.removeItem("token");
  window.location.href = "../pages/login.html";
} else {
  // ✅ Libera visualização da dashboard
  document.getElementById("app").style.display = "block";
  carregarProdutos();
}

const inputImagem = document.getElementById("product-imagem");
const imagePreviewContainer = document.getElementById("image-preview-container");
const imagePreview = document.getElementById("image-preview");

inputImagem.addEventListener("input", function() {
  const url = this.value;
  if (url) {
    imagePreview.src = url;
    imagePreviewContainer.style.display = "block";
  } else {
    imagePreview.src = "#";
    imagePreviewContainer.style.display = "none";
  }
});

function abrirModal(editando = false, produto = null) {
  console.log("Abrir modal chamado. Editando:", editando);
  const modal = document.getElementById("product-modal");
  if (!modal) {
    console.error("Modal não encontrado no DOM.");
    return;
  }
  modal.style.display = "flex";
  document.getElementById("modal-title").textContent = editando ? "Editar Produto" : "Adicionar Produto";

  document.getElementById("product-form").reset();
  document.getElementById("product-id").value = produto ? produto.id : "";
  document.getElementById("product-name").value = produto ? produto.nome : "";
  document.getElementById("product-descricao").value = produto ? produto.descricao : "";
  document.getElementById("product-price").value = produto ? produto.preco : "";
  document.getElementById("product-estoque").value = produto ? produto.estoque : "";
  document.getElementById("product-tamanhos").value = produto ? produto.tamanhos.join(',') : "";
  document.getElementById("product-imagem").value = produto ? produto.imagem : "";

  // Tenta encontrar os elementos de prévia novamente dentro do escopo do modal aberto
  const localImagePreviewContainer = document.getElementById("image-preview-container");
  const localImagePreview = document.getElementById("image-preview");

  console.log("localImagePreviewContainer:", localImagePreviewContainer);
  console.log("localImagePreview:", localImagePreview);

  if (localImagePreviewContainer && localImagePreview) {
    if (produto && produto.imagem) {
      localImagePreview.src = produto.imagem;
      localImagePreviewContainer.style.display = "block";
    } else {
      localImagePreview.src = "#";
      localImagePreviewContainer.style.display = "none";
    }
  } else {
    console.error("Elementos de prévia da imagem não encontrados no DOM do modal.");
  }
}

function abrirModalEdicao(botaoEditar) {
  console.log("abrirModalEdicao chamado.");
  const row = botaoEditar.closest('tr');
  const produtoId = row.dataset.id;
  const nome = row.dataset.nome;
  const descricao = row.dataset.descricao;
  const preco = parseFloat(row.dataset.preco);
  const estoque = parseInt(row.dataset.estoque);
  const tamanhos = JSON.parse(row.dataset.tamanhos);
  const imagem = row.dataset.imagem;

  console.log("Produto ao editar:", { id: produtoId, nome, descricao, preco, estoque, tamanhos, imagem });

  const produto = { id: produtoId, nome, descricao, preco, estoque, tamanhos, imagem };
  abrirModal(true, produto);
}

function fecharModal() {
  console.log("Fechar modal chamado.");
  document.getElementById("product-modal").style.display = "none";
  // Resetar a prévia ao fechar o modal
  const localImagePreview = document.getElementById("image-preview");
  const localImagePreviewContainer = document.getElementById("image-preview-container");
  if (localImagePreview) localImagePreview.src = "#";
  if (localImagePreviewContainer) localImagePreviewContainer.style.display = "none";
}

document
  .getElementById("product-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("product-id").value;
    const produto = {
      nome: document.getElementById("product-name").value,
      descricao: document.getElementById("product-descricao").value,
      preco: parseFloat(document.getElementById("product-price").value),
      estoque: parseInt(document.getElementById("product-estoque").value),
      tamanhos: document.getElementById("product-tamanhos").value.split(','), // Transforma a string em um array
      imagem: document.getElementById("product-imagem").value,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Envia o token no cabeçalho
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        carregarProdutos();
        fecharModal();
      } else {
        alert(`Erro ao salvar produto: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar ao servidor.");
    }
  });

async function carregarProdutos() {
  try {
    const response = await fetch(API_URL);
    const produtos = await response.json();
    const tbody = document.getElementById("product-list");
    tbody.innerHTML = "";

    produtos.forEach((produto) => {
      const row = document.createElement("tr");
      row.dataset.id = produto.id; // Adiciona o ID como data attribute
      row.dataset.nome = produto.nome;
      row.dataset.descricao = produto.descricao;
      row.dataset.preco = produto.preco;
      row.dataset.estoque = produto.estoque;
      row.dataset.tamanhos = JSON.stringify(produto.tamanhos); // Salva o array como string JSON
      row.dataset.imagem = produto.imagem;

      const descricaoLimitada = produto.descricao.length > 50 ? produto.descricao.substring(0, 50) + "..." : produto.descricao;
      row.innerHTML = `
        <td>${produto.nome}</td>
        <td>${descricaoLimitada}</td>
        <td>R$ ${produto.preco.toFixed(2)}</td>
        <td>${produto.estoque}</td>
        <td>${produto.tamanhos}</td>
        <td>
          <img src="${produto.imagem}" alt="Imagem" width="50"
               onclick="abrirImagem('${produto.imagem}')" style="cursor:pointer;">
        </td>
        <td>
          <button class='edit-btn' onclick='abrirModalEdicao(this)'>Editar</button>
          <button class='delete-btn' onclick='deletarProduto(${produto.id})'>Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

async function deletarProduto(id) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        carregarProdutos();
      } else {
        alert(`Erro ao excluir produto: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao conectar ao servidor.");
    }
  }
}

// ✅ Modal de imagem
function abrirImagem(url) {
  const modal = document.getElementById("image-modal");
  const img = document.getElementById("modal-image");
  img.src = url;
  modal.style.display = "flex";
}

function fecharImagem() {
  document.getElementById("image-modal").style.display = "none";
}

document
  .getElementById("image-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      fecharImagem();
    }
  });