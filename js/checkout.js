/**
 * @fileoverview Lógica para a página de checkout.
 */

document.addEventListener("DOMContentLoaded", () => {
  const orderItemsList = document.getElementById("order-items-list");
  const checkoutTotalPriceElement = document.getElementById(
    "checkout-total-price"
  );
  const pixKeyValueElement = document.getElementById("pix-key-value");
  const copyPixKeyBtn = document.getElementById("copy-pix-key-btn");
  const confirmPurchaseBtn = document.getElementById("confirm-purchase-btn");
  const backToCartBtn = document.getElementById("back-to-cart-btn");

  /**
   * Renderiza os itens do pedido na página de checkout.
   */
  function renderOrderSummary() {
    // Certifica-se de que as funções de cartUtils.js estão disponíveis
    if (
      typeof getCartItems !== "function" ||
      typeof getCartTotalPrice !== "function" ||
      typeof clearCart !== "function" ||
      typeof updateCartCounter !== "function"
    ) {
      console.error(
        "Funções de 'cartUtils.js' não encontradas. Verifique se o script foi carregado corretamente."
      );
      orderItemsList.innerHTML =
        "<p>Ocorreu um erro ao carregar o resumo do pedido.</p>";
      checkoutTotalPriceElement.textContent = "R$ 0,00";
      confirmPurchaseBtn.disabled = true;
      return;
    }

    const cartItems = getCartItems();
    orderItemsList.innerHTML = ""; // Limpa a lista antes de renderizar

    if (cartItems.length === 0) {
      orderItemsList.innerHTML =
        "<p>Seu carrinho está vazio. Por favor, adicione produtos antes de finalizar a compra.</p>";
      checkoutTotalPriceElement.textContent = "R$ 0,00";
      confirmPurchaseBtn.disabled = true;
    } else {
      cartItems.forEach((item) => {
        const orderItemDiv = document.createElement("div");
        orderItemDiv.classList.add("order-item");
        orderItemDiv.innerHTML = `
          <div class="order-item-details">
            <img src="${item.image}" alt="${
          item.name
        }" class="order-item-image">
            <span>${item.name} (Tam: ${item.selectedSize}) x ${
          item.quantity
        }</span>
          </div>
          <span class="order-item-price">R$ ${(
            item.price * item.quantity
          ).toFixed(2)}</span>
        `;
        orderItemsList.appendChild(orderItemDiv);
      });
      checkoutTotalPriceElement.textContent = `R$ ${getCartTotalPrice().toFixed(
        2
      )}`;
      confirmPurchaseBtn.disabled = false;
    }
  }

  // Renderiza o resumo do pedido quando a página é carregada
  renderOrderSummary();

  // Exemplo de chave PIX estática (em um ambiente real, seria gerada dinamicamente)
  const staticPixKey = "420.420.420-42@email.com"; // Substitua pela sua chave PIX ou lógica de geração
  pixKeyValueElement.textContent = staticPixKey;

  // Event listener para o botão "Copiar Chave PIX"
  if (copyPixKeyBtn) {
    copyPixKeyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(staticPixKey);
        alert("Chave PIX copiada para a área de transferência!");
      } catch (err) {
        console.error("Erro ao copiar a chave PIX:", err);
        alert(
          "Não foi possível copiar a chave PIX. Por favor, copie manualmente: " +
            staticPixKey
        );
      }
    });
  }

  // Event listener para o botão "Confirmar Pagamento e Finalizar Pedido"
  if (confirmPurchaseBtn) {
    confirmPurchaseBtn.addEventListener("click", () => {
      // Em um cenário real, aqui você faria uma chamada API para confirmar o pagamento
      // e processar o pedido no backend.
      alert("Pedido finalizado com sucesso! (Pagamento via PIX simulado)");
      clearCart(); // Limpa o carrinho após a "compra"
      updateCartCounter(); // Atualiza o contador da navbar
      window.location.href = "../index.html"; // Redireciona para a página inicial ou uma página de confirmação
    });
  }

  // Event listener para o botão "Voltar para o Carrinho"
  if (backToCartBtn) {
    backToCartBtn.addEventListener("click", () => {
      window.location.href = "../pages/cart.html";
    });
  }
});
