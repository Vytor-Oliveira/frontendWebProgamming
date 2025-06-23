/**
 * @fileoverview Funções utilitárias para gerenciar o carrinho de compras no localStorage.
 */

// Chave para armazenar os itens do carrinho no localStorage.
const CART_STORAGE_KEY = "shoppingCart";

/**
 * Retorna todos os itens atualmente no carrinho.
 * Se não houver itens, retorna um array vazio.
 * @returns {Array<Object>} Um array de objetos representando os produtos no carrinho.
 */
function getCartItems() {
  try {
    const cartItems = localStorage.getItem(CART_STORAGE_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (e) {
    console.error("Erro ao ler itens do carrinho do localStorage:", e);
    return [];
  }
}

/**
 * Salva a lista de itens no carrinho no localStorage.
 * @param {Array<Object>} items O array de objetos de produtos a ser salvo.
 */
function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    updateCartCounter(); // Atualiza o contador do carrinho na navbar após salvar.
  } catch (e) {
    console.error("Erro ao salvar itens do carrinho no localStorage:", e);
  }
}

/**
 * Adiciona um produto ao carrinho ou atualiza sua quantidade se já existir.
 * @param {Object} product O objeto do produto a ser adicionado. Deve ter id, nome, preco, imagem, e tamanhos.
 * @param {string} selectedSize O tamanho selecionado do produto.
 * @param {number} quantity A quantidade a ser adicionada (padrão é 1).
 */
function addProductToCart(product, selectedSize, quantity = 1) {
  let cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === product.id && item.selectedSize === selectedSize
  );

  if (existingItemIndex > -1) {
    // Se o item já existe, apenas atualiza a quantidade.
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Se o item não existe, adiciona-o ao carrinho.
    cartItems.push({
      id: product.id,
      name: product.nome,
      price: product.preco,
      image: product.imagem,
      selectedSize: selectedSize,
      quantity: quantity,
    });
  }
  saveCartItems(cartItems);
  alert(`"${product.nome} - Tamanho ${selectedSize}" adicionado ao carrinho!`);
}

/**
 * Remove completamente um produto do carrinho.
 * @param {string} productId O ID do produto a ser removido.
 * @param {string} selectedSize O tamanho do produto a ser removido.
 */
function removeProductFromCart(productId, selectedSize) {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(
    (item) => !(item.id === productId && item.selectedSize === selectedSize)
  );
  saveCartItems(cartItems);
}

/**
 * Atualiza a quantidade de um produto específico no carrinho.
 * @param {string} productId O ID do produto.
 * @param {string} selectedSize O tamanho do produto.
 * @param {number} newQuantity A nova quantidade para o produto.
 */
function updateProductQuantity(productId, selectedSize, newQuantity) {
  let cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(
    (item) => item.id === productId && item.selectedSize === selectedSize
  );

  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      // Se a nova quantidade for 0 ou menos, remove o produto do carrinho.
      removeProductFromCart(productId, selectedSize);
    } else {
      cartItems[itemIndex].quantity = newQuantity;
      saveCartItems(cartItems);
    }
  }
}

/**
 * Calcula e retorna o número total de itens únicos no carrinho.
 * @returns {number} O número total de itens no carrinho.
 */
function getCartTotalItems() {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calcula e retorna o valor total de todos os produtos no carrinho.
 * @returns {number} O valor total do carrinho.
 */
function getCartTotalPrice() {
  return getCartItems().reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

/**
 * Limpa todos os itens do carrinho.
 */
function clearCart() {
  saveCartItems([]);
}

/**
 * Atualiza o contador de itens do carrinho na barra de navegação.
 * Esta função precisa que o elemento com id 'cart-counter' exista na navbar.
 */
function updateCartCounter() {
  const cartCounterElement = document.getElementById("cart-counter");
  if (cartCounterElement) {
    const totalItems = getCartTotalItems();
    cartCounterElement.textContent = totalItems > 0 ? totalItems : ""; // Mostra o número ou vazio se 0.
    cartCounterElement.style.display = totalItems > 0 ? "inline-block" : "none"; // Esconde se 0.
  }
}

// Exporta as funções para serem usadas em outros módulos.
// Em um ambiente de navegador, as funções globais já estariam disponíveis se o script fosse carregado antes.
// Para fins de teste (como em login.test.js ou cadastro.test.js que usam module.exports), é bom exportar.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getCartItems,
    saveCartItems,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    getCartTotalItems,
    getCartTotalPrice,
    clearCart,
    updateCartCounter,
  };
}
