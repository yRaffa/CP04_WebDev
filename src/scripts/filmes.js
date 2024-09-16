const botaoAdicionar = document.querySelector('#btnAdicionar');
const listaFilmes = document.querySelector('#listaFilmes');

let filmes = [
  {id: 0, nome: 'Jujutsu Kaisen 0', genero: 'Shounen', lancamento: 2021,},
  {id: 1, nome: 'Homem-Aranha: Através do Aranha-Verso', genero: 'Ação', lancamento: 2023},
  {id: 2, nome: 'Vingadores: Guerra Infinita', genero: 'Ação', lancamento: 2018},
];

let filmesFavoritos = [];

window.onload = () => {
  carregarFilmes();
  renderizarLista();
}

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

const renderizarLista = () => {
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

const salvarFilmes = () => {
  const filmesJSON = JSON.stringify(filmes);
  localStorage.setItem('filmes', filmesJSON);
}

botaoAdicionar.addEventListener('click', () => {
  const inputTitulo = document.querySelector('#tituloInput');
  const inputGenero = document.querySelector('#generoInput');
  const inputAno = document.querySelector('#anoInput');
  let id = filmes.length;

  filmes.push({id:id,nome: inputTitulo.value, genero: inputGenero.value, lancamento: inputAno.value});

  salvarFilmes();
  renderizarLista();

  inputTitulo.value = '';
  inputGenero.value = '';
  inputAno.value = '';
});

const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: '../images/heart-fill.svg',
    notFavorited: '../images/heart.svg'
  }

  const nomeImagemAtual = eventoDeClique.target.src.split('/').pop();

  if (nomeImagemAtual === 'heart.svg') {
    eventoDeClique.target.src = favoriteState.favorited;
    salvarLocalStorage(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removerLocalStorage(objetoFilme.id);
  }
}

const salvarLocalStorage = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }

  filmesFavoritos.push(objetoFilme);
  const moviesJSON = JSON.stringify(filmesFavoritos);
  localStorage.setItem('favoritos', moviesJSON);
}

const removerLocalStorage = (id) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  
  const procurarFilme = filmesFavoritos.find(movie => movie.id === id);
  const filmesFiltrados = filmesFavoritos.filter(movie => movie.id != procurarFilme.id);
  const filmesFiltradosJSON = JSON.stringify(filmesFiltrados);
  localStorage.setItem('favoritos', filmesFiltradosJSON);
}