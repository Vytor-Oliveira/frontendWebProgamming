const API_URL = 'https://puffwear.up.railway.app/produtos';

function abrirModal(editando = false) {
    document.getElementById('product-modal').style.display = 'flex';
    document.getElementById('modal-title').textContent = editando ? 'Editar Produto' : 'Adicionar Produto';
}

function fecharModal() {
    document.getElementById('product-modal').style.display = 'none';
    document.getElementById('product-form').reset();
}

document.getElementById('product-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const produto = {
        nome: document.getElementById('product-name').value,
        descricao: document.getElementById('product-descricao').value,
        preco: parseFloat(document.getElementById('product-price').value),
        estoque: parseInt(document.getElementById('product-estoque').value),
        tamanhos: document.getElementById('product-tamanhos').value,
        imagem: document.getElementById('product-imagem').value
    };

    try {
        const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
        if (response.ok) {
            carregarProdutos();
            fecharModal();
        } else {
            alert(`Erro ao salvar produto: ${await response.text()}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.');
    }
});

async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        const produtos = await response.json();
        const tbody = document.getElementById('product-list');
        tbody.innerHTML = '';
        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.estoque}</td>
                <td>${produto.tamanhos}</td>
                <td><img src="${produto.imagem}" alt="Imagem" width="50" onclick="abrirImagem('${produto.imagem}')" style="cursor:pointer;"></td>
                <td>
                    <button class='edit-btn' onclick='editarProduto(${produto.id}, "${produto.nome}", "${produto.descricao}", ${produto.preco}, ${produto.estoque}, "${produto.tamanhos}", "${produto.imagem}")'>Editar</button>
                    <button class='delete-btn' onclick='deletarProduto(${produto.id})'>Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function editarProduto(id, nome, descricao, preco, estoque, tamanhos, imagem) {
    document.getElementById('product-id').value = id;
    document.getElementById('product-name').value = nome;
    document.getElementById('product-descricao').value = descricao;
    document.getElementById('product-price').value = preco;
    document.getElementById('product-estoque').value = estoque;
    document.getElementById('product-tamanhos').value = tamanhos;
    document.getElementById('product-imagem').value = imagem;
    
    abrirModal(true);
}

async function deletarProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                carregarProdutos();
            } else {
                alert(`Erro ao excluir produto: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao conectar ao servidor.');
        }
    }
}

function abrirImagem(url) {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    img.src = url;
    modal.style.display = 'flex';
}

function fecharImagem() {
    document.getElementById('image-modal').style.display = 'none';
}

// Fechar ao clicar fora da imagem
document.getElementById('image-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        fecharImagem();
    }
});


carregarProdutos();
