/**
 * @fileoverview Lógica para a página do carrinho de compras.
 */

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalPriceElement = document.getElementById("cart-total-price");
  const proceedToCheckoutBtn = document.getElementById(
    "proceed-to-checkout-btn"
  );
  const clearCartBtn = document.getElementById("clear-cart-btn");

  /**
   * Renderiza os itens do carrinho na página.
   */
  function renderCart() {
    // Certifica-se de que as funções de cartUtils.js estão disponíveis
    if (
      typeof getCartItems !== "function" ||
      typeof saveCartItems !== "function" ||
      typeof updateProductQuantity !== "function" ||
      typeof removeProductFromCart !== "function" ||
      typeof getCartTotalPrice !== "function" ||
      typeof clearCart !== "function"
    ) {
      console.error(
        "Funções de 'cartUtils.js' não encontradas. Verifique se o script foi carregado corretamente."
      );
      cartItemsList.innerHTML =
        '<p class="empty-cart-message">Ocorreu um erro ao carregar o carrinho.</p>';
      cartTotalPriceElement.textContent = "R$ 0,00";
      return;
    }

    const cartItems = getCartItems();
    cartItemsList.innerHTML = ""; // Limpa a lista antes de renderizar

    if (cartItems.length === 0) {
      cartItemsList.innerHTML =
        '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
      proceedToCheckoutBtn.disabled = true; // Desabilita o botão se o carrinho estiver vazio
      clearCartBtn.disabled = true; // Desabilita o botão de limpar se o carrinho estiver vazio
    } else {
      cartItems.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Tamanho: ${item.selectedSize}</p>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease-quantity" data-id="${
              item.id
            }" data-size="${item.selectedSize}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase-quantity" data-id="${
              item.id
            }" data-size="${item.selectedSize}">+</button>
          </div>
          <p class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(
            2
          )}</p>
          <button class="remove-item-btn" data-id="${item.id}" data-size="${
          item.selectedSize
        }">Remover</button>
        `;
        cartItemsList.appendChild(cartItemDiv);
      });

      // Adiciona event listeners aos botões de quantidade e remoção
      document.querySelectorAll(".decrease-quantity").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = parseInt(e.target.dataset.id); // Converte para número
          const selectedSize = e.target.dataset.size;
          const currentItem = cartItems.find(
            (i) => i.id === productId && i.selectedSize === selectedSize
          );
          if (currentItem) {
            // Garante que o item exista
            updateProductQuantity(
              productId,
              selectedSize,
              currentItem.quantity - 1
            );
            renderCart(); // Renderiza o carrinho novamente para atualizar a UI
          }
        });
      });

      document.querySelectorAll(".increase-quantity").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = parseInt(e.target.dataset.id); // Converte para número
          const selectedSize = e.target.dataset.size;
          const currentItem = cartItems.find(
            (i) => i.id === productId && i.selectedSize === selectedSize
          );
          if (currentItem) {
            // Garante que o item exista
            updateProductQuantity(
              productId,
              selectedSize,
              currentItem.quantity + 1
            );
            renderCart(); // Renderiza o carrinho novamente para atualizar a UI
          }
        });
      });

      document.querySelectorAll(".remove-item-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = parseInt(e.target.dataset.id); // Converte para número
          const selectedSize = e.target.dataset.size;
          if (
            confirm("Tem certeza que deseja remover este item do carrinho?")
          ) {
            removeProductFromCart(productId, selectedSize);
            renderCart(); // Renderiza o carrinho novamente para atualizar a UI
          }
        });
      });

      proceedToCheckoutBtn.disabled = false;
      clearCartBtn.disabled = false;
    }

    // Atualiza o preço total do carrinho
    cartTotalPriceElement.textContent = `R$ ${getCartTotalPrice().toFixed(2)}`;
    updateCartCounter(); // Garante que o contador da navbar esteja sempre atualizado.
  }

  // Renderiza o carrinho quando a página é carregada
  renderCart();

  // Event listener para o botão "Finalizar Compra"
  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener("click", () => {
      if (getCartItems().length > 0) {
        window.location.href = "../pages/checkout.html"; // Redireciona para a página de checkout
      } else {
        alert(
          "Seu carrinho está vazio. Adicione produtos antes de finalizar a compra."
        );
      }
    });
  }

  // Event listener para o botão "Limpar Carrinho"
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
        clearCart();
        renderCart(); // Renderiza para mostrar o carrinho vazio
      }
    });
  }
});
