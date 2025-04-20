document.addEventListener("DOMContentLoaded", async () => {
  const productCarousel = document.getElementById("product-carousel");

  try {
    // Chama a API para obter os produtos
    const response = await fetch('https://puffwear.up.railway.app/produtos'); // URL da sua API
    if (!response.ok) {
      throw new Error('Erro ao carregar os produtos: ' + response.statusText);
    }

    const produtos = await response.json();
    
    if (produtos.length === 0) {
      productCarousel.innerHTML = '<p>Não há produtos disponíveis no momento.</p>';
    } else {
      produtos.forEach(produto => {
        const productElement = document.createElement('div');
        productElement.classList.add('produto');
        productElement.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" />
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco}</p>
          <a href="./pages/product.html?id=${produto.id}">Ver Detalhes</a>
        `;
        productCarousel.appendChild(productElement);
      });
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Não foi possível carregar os produtos. Tente novamente mais tarde.';
    productCarousel.appendChild(errorMessage);
  }
});
