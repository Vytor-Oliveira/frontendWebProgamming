document.addEventListener("DOMContentLoaded", async () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    
    if (!productId) {
      alert("Produto não encontrado.");
      return;
    }
  
    try {
      const response = await fetch(`https://puffwear.up.railway.app/produtos/${productId}`);
      
      if (!response.ok) {
        throw new Error('Produto não encontrado!');
      }
  
      const produto = await response.json();
  
      // Atualiza os elementos da página com os dados do produto
      document.getElementById("product-image").src = produto.imagem;
      document.getElementById("product-name").textContent = produto.nome;
      document.getElementById("product-description").textContent = produto.descricao;
  
      // Atualiza o título da página
      document.getElementById("product-title").textContent = `PuffWear - ${produto.nome}`;
  
      // Exibe os tamanhos disponíveis para o produto
      const tamanhosContainer = document.getElementById("product-sizes");
      produto.tamanhos.forEach(tamanho => {
        const button = document.createElement('button');
        button.textContent = tamanho;
        tamanhosContainer.appendChild(button);
      });
  
    } catch (error) {
      console.error('Erro ao carregar detalhes do produto:', error);
      alert('Erro ao carregar detalhes do produto. Tente novamente mais tarde.');
    }
  });
  