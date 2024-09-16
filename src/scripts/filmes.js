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

// Função para o botão de adicionar u filme a lista
botaoAdicionar.addEventListener('click', () => {
  const inputTitulo = document.querySelector('#tituloInput');
  const inputGenero = document.querySelector('#generoInput');
  const inputAno = document.querySelector('#anoInput');

  if (inputTitulo === '' || inputGenero === '' || inputAno === '') {
    alert('Para adicionar um filme, preencha todos os campos!');
    return;
  }

  let id = filmes.length;

  filmes.push({id:id,nome: inputTitulo.value, genero: inputGenero.value, lancamento: inputAno.value});

  salvarFilmes();
  mostrarLista();

  inputTitulo.value = '';
  inputGenero.value = '';
  inputAno.value = '';
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
const salvarFilmes = () => {
  const filmesJSON = JSON.stringify(filmes);
  localStorage.setItem('filmes', filmesJSON);
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
    itemLista.innerHTML = `${filme.nome}`;

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

    itemLista.append(favorito);
    listaFilmes.append(itemLista);
  });
}

// Função para mudar o estado ente 'favorito' e 'não favorito'
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