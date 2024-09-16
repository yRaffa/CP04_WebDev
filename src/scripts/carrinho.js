// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const listaProdutos = document.querySelector('#lista-produtos');
    listaProdutos.innerHTML = '';
    let valorTotal = 0;
    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const novoProduto = document.createElement('li');
            novoProduto.textContent = `${produto.nome} / Quantidade: ${produto.quantidade} / Valor: R$ ${produto.valor.toFixed(2)}`;
            listaProdutos.appendChild(novoProduto);
            valorTotal += produto.valor;
        });
        const espaco = document.createElement('br')
        const total = document.createElement('p');
        total.textContent = `Total da Compra: R$ ${valorTotal.toFixed(2)}`;
        listaProdutos.appendChild(espaco);
        listaProdutos.appendChild(total);
    } else {
        listaProdutos.innerHTML = 'Carrinho Vazio!';
    }
}

exibirCarrinho();

// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
        produtoExistente.valor += valor;
    } else {
        carrinho.push({ id, nome, valor, quantidade });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}