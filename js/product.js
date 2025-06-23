/**
 * @fileoverview Lógica para a página de detalhes do produto.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  const productTitleElement = document.getElementById("product-title");
  const productImageElement = document.getElementById("product-image");
  const productNameElement = document.getElementById("product-name");
  const productPriceElement = document.getElementById("product-price");
  const productDescriptionElement = document.getElementById(
    "product-description"
  );
  const productSizesContainer = document.getElementById("product-sizes"); // Alterado para container de botões
  const addToCartButton = document.getElementById("add-to-cart-btn");

  let currentProduct = null;
  let selectedSize = null; // Variável para armazenar o tamanho selecionado

  // Verifica se todos os elementos HTML necessários existem
  if (
    !productTitleElement ||
    !productImageElement ||
    !productNameElement ||
    !productPriceElement ||
    !productDescriptionElement ||
    !productSizesContainer ||
    !addToCartButton
  ) {
    console.error(
      "Erro: Um ou mais elementos HTML da página de produto não foram encontrados. Verifique os IDs."
    );
    alert(
      "Erro ao carregar a página de produto. Elementos essenciais ausentes."
    );
    return;
  }

  if (!productId) {
    alert("Produto não encontrado. ID ausente na URL.");
    window.location.href = "../index.html";
    return;
  }

  try {
    const response = await fetch(
      `https://puffwear.up.railway.app/produtos/${productId}`
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao carregar o produto (Status: ${response.status}). Produto com ID ${productId} não encontrado.`
      );
    }

    const produto = await response.json();
    currentProduct = produto;

    // Atualiza os elementos da página com os dados do produto
    productImageElement.src = produto.imagem;
    productNameElement.textContent = produto.nome;
    productPriceElement.textContent = `R$ ${produto.preco.toFixed(2)}`;
    productDescriptionElement.textContent = produto.descricao;

    // Atualiza o título da página
    productTitleElement.textContent = `PuffWear - ${produto.nome}`;

    // Popula os botões de tamanhos
    if (produto.tamanhos && produto.tamanhos.length > 0) {
      productSizesContainer.innerHTML = ""; // Limpa antes de adicionar botões
      produto.tamanhos.forEach((tamanho) => {
        const button = document.createElement("button");
        button.textContent = tamanho;
        button.classList.add("size-button"); // Adiciona uma classe para estilização
        button.dataset.size = tamanho; // Armazena o tamanho no dataset
        productSizesContainer.appendChild(button);

        button.addEventListener("click", () => {
          // Remove a classe 'active' de todos os botões e adiciona ao clicado
          document.querySelectorAll(".size-button").forEach((btn) => {
            btn.classList.remove("active");
          });
          button.classList.add("active");
          selectedSize = tamanho; // Atualiza o tamanho selecionado
        });
      });
      // Seleciona o primeiro tamanho por padrão, se houver
      if (produto.tamanhos.length > 0) {
        productSizesContainer
          .querySelector(".size-button")
          .classList.add("active");
        selectedSize = produto.tamanhos[0];
      }
    } else {
      productSizesContainer.innerHTML = "<p>Tamanho Único</p>"; // Ou apenas um botão "Tamanho Único"
      selectedSize = "Tamanho Único"; // Define o tamanho padrão
      console.warn(
        `Produto ID ${productId} não possui tamanhos definidos. Usando 'Tamanho Único'.`
      );
    }

    // Adiciona o evento de clique ao botão "Adicionar ao Carrinho"
    addToCartButton.addEventListener("click", () => {
      if (currentProduct && selectedSize) {
        // Garante que um tamanho foi selecionado
        if (typeof addProductToCart === "function") {
          addProductToCart(currentProduct, selectedSize);
        } else {
          console.error(
            "Função 'addProductToCart' não encontrada. Verifique se 'cartUtils.js' está carregado corretamente."
          );
          alert("Erro interno: Função de carrinho não disponível.");
        }
      } else {
        alert(
          "Por favor, selecione um tamanho antes de adicionar ao carrinho."
        );
      }
    });
  } catch (error) {
    console.error("Erro ao carregar detalhes do produto:", error);
    alert(
      `Erro ao carregar detalhes do produto. Tente novamente mais tarde. Detalhes: ${error.message}`
    );
  }
});
