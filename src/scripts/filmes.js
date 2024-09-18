// Pegando elementos HTML
const botaoAdicionar = document.querySelector('#btnAdicionar');
const listaFilmes = document.querySelector('#listaFilmes');

// Criando lista de filmes
let filmes = [
  {id: 0, nome: 'Jujutsu Kaisen 0', genero: 'Shounen', lancamento: 2021,},
  {id: 1, nome: 'Homem-Aranha: Através do Aranha-Verso', genero: 'Ação', lancamento: 2023},
  {id: 2, nome: 'Vingadores: Guerra Infinita', genero: 'Ação', lancamento: 2018},
];

// Criando lista de filmes favoritos
let filmesFavoritos = [];

// Funções chamadas ao carregar a página
window.onload = () => {
  carregarFilmes();
  mostrarLista();
}

// Função para o botão de adicionar um filme a lista
botaoAdicionar.addEventListener('click', () => {
  const inputTitulo = document.querySelector('#tituloInput').value.trim();
  const inputGenero = document.querySelector('#generoInput').value.trim();
  const inputAno = document.querySelector('#anoInput').value.trim();

  if (inputTitulo === '' || inputGenero === '' || inputAno === '') {
    alert('Para adicionar um filme, preencha todos os campos!');
    return;
  }

  if (isNaN(inputAno) || inputAno <= 0) {
    alert('O ano de lançamento deve ser um número maior que zero!');
    return;
  }

  let id = filmes.length;

  filmes.push({id: id, nome: inputTitulo, genero: inputGenero, lancamento: inputAno});

  salvarFilme();
  mostrarLista();

  document.querySelector('#tituloInput').value = '';
  document.querySelector('#generoInput').value = '';
  document.querySelector('#anoInput').value = '';
});

// Função para carregar informações dos filmes no LocalStorage
const carregarFilmes = () => {
  const filmesSalvos = localStorage.getItem('filmes');
  if (filmesSalvos) {
    filmes = JSON.parse(filmesSalvos);
  }

  const favoritosSalvos = localStorage.getItem('favoritos');
  if (favoritosSalvos) {
    filmesFavoritos = JSON.parse(favoritosSalvos);
  }
}

// Função para salvar filmes no LocalStorage
const salvarFilme = () => {
  const filmesJSON = JSON.stringify(filmes);
  localStorage.setItem('filmes', filmesJSON);
}

// Função para remover filmes no LocalStorage
const removerFilme = (id) => {
  filmes = filmes.filter(filme => filme.id !== id);
  salvarFilme();
  mostrarLista();
}

// Função para salvar filmes favoritos no LocalStorage
const salvarFilmeFavorito = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }

  filmesFavoritos.push(objetoFilme);
  const moviesJSON = JSON.stringify(filmesFavoritos);
  localStorage.setItem('favoritos', moviesJSON);
}

// Função para remover filmes favoritos no LocalStorage
const removerFilmeFavorito = (id) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }

  const procurarFilme = filmesFavoritos.find(movie => movie.id === id);
  const filmesFiltrados = filmesFavoritos.filter(movie => movie.id != procurarFilme.id);
  const filmesFiltradosJSON = JSON.stringify(filmesFiltrados);
  localStorage.setItem('favoritos', filmesFiltradosJSON);
}

// Função para mostrar na tela a lista de filmes
const mostrarLista = () => {
  listaFilmes.innerHTML = '';

  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    const botoes = document.createElement('div');
    botoes.className = 'botoes';
    const favorito = document.createElement('img');
    const favoritoSalvo = filmesFavoritos.find(f => f.id === filme.id);

    if (favoritoSalvo) {
      favorito.src = '../images/heart-fill.svg';
    } else {
      favorito.src = '../images/heart.svg';
    }
    
    favorito.style.cursor = 'pointer';
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });

    const remover = document.createElement('button');
    remover.textContent = 'Remover';
    remover.className = 'btn btn-danger btn-sm remover';
    remover.id = '';
    remover.addEventListener('click', () => {
      removerFilme(filme.id);
    });

    botoes.append(remover);
    botoes.append(favorito);

    const nomeFilme = document.createElement('span');
    nomeFilme.className = 'nome-filme';
    nomeFilme.textContent = filme.nome;

    itemLista.append(nomeFilme);
    itemLista.append(botoes);
    listaFilmes.append(itemLista);
  });
}

// Função para mudar o estado entre 'favorito' e 'não favorito'
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: '../images/heart-fill.svg',
    notFavorited: '../images/heart.svg'
  }

  const nomeImagemAtual = eventoDeClique.target.src.split('/').pop();

  if (nomeImagemAtual === 'heart.svg') {
    eventoDeClique.target.src = favoriteState.favorited;
    salvarFilmeFavorito(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removerFilmeFavorito(objetoFilme.id);
  }
}