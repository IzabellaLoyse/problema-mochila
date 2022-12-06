let quantidadeDeObjetos;
let capacidadeDaMochila;

let pesoDoObjeto = [];
let beneficioDoObjeto = [];
let listaObjetosSorteio = [];
let novaListaObjetosSorteio = listaObjetosSorteio;
let mochilaComObjetos = [];
let mochilaDosVizinhosComObjetos = [];

const inserindoOsObjetos = () => {
  quantidadeDeObjetos = parseInt(prompt('Insira a quantidade de objetos'));
  capacidadeDaMochila = parseInt(prompt('Insira a capacidade da mochila'));

  if (Number.isNaN(quantidadeDeObjetos) || Number.isNaN(capacidadeDaMochila)) {
    alert('Por favor, insira apenas números!');
    inserindoOsObjetos();
  }

  for (let i = 0; i <= quantidadeDeObjetos - 1; i++) {
    let listaPesoDosObjetos = parseInt(prompt('Insira o peso do objeto: ' + i));

    let listageraBeneficioDosObjetos = parseInt(
      prompt('Insira o beneficio do objeto: ' + i),
    );

    pesoDoObjeto.push(listaPesoDosObjetos);
    beneficioDoObjeto.push(listageraBeneficioDosObjetos);
  }
};

const gerarSorteioDaMochila = () => {
  for (let i = 0; i <= quantidadeDeObjetos - 1; i++) {
    const sorteio = Math.floor(Math.random() * 2);

    if (sorteio === 0) {
      listaObjetosSorteio[i] = 0;
    }

    if (sorteio === 1) {
      listaObjetosSorteio[i] = 1;
    }
  }
};

const geraBeneficioDosObjetos = (mochila = mochilaComObjetos) => {
  let beneficioTotalDaMochila;

  listaSorteio.filter((objeto, index) =>
    objeto === 1 ? mochila.push(index) : null,
  );

  const listaBeneficio = mochila.map((objeto) => beneficioDoObjeto[objeto]);

  beneficioTotalDaMochila = listaBeneficio.reduce(
    (total, beneficio) => total + beneficio,
    0,
  );

  if (beneficioTotalDaMochila > capacidadeDaMochila) {
    beneficioTotalDaMochila = beneficioTotalDaMochila * -1;
  }

  return beneficioTotalDaMochila;
};

const geraPesoDosObjetos = (mochila = mochilaComObjetos) => {
  const alertaMochilaCheia = document.querySelector('.js-mensagemErro');
  let pesoTotalDaMochila;

  const listaPeso = mochila.map((objeto) => {
    return pesoDoObjeto[objeto];
  });

  pesoTotalDaMochila = listaPeso.reduce((total, peso) => total + peso, 0);

  if (pesoTotalDaMochila > capacidadeDaMochila) {
    exibeMensagemMochilaCheia = alertaMochilaCheia.innerHTML = `
      <p class="js-alert-mochila">
      🚨 A mochila está cheia 🚨
      </p> 
      `;
    pesoTotalDaMochila = pesoTotalDaMochila * -1;
  } else {
    exibeMensagemMochilaCheia = alertaMochilaCheia.innerHTML = '';
  }

  exibeResultadoDaMochila(mochila, pesoTotalDaMochila);

  return pesoTotalDaMochila;
};

const refinamentoVizinhoDoSorteio = () => {
  const alertaMochilaCheia = document.querySelector(
    '.js-mensagemErroRefinamento',
  );

  let beneficioTotalDaMochilaRefinamento;
  const mochilaComObjetosRefinamento = [];
  const listaSorteioRefinamento = [];

  listaObjetosSorteio.map((objeto) => {
    listaSorteioRefinamento.push(objeto);
  });

  const geraSorteioPosicao = Math.floor(
    Math.random() * listaSorteioRefinamento.length,
  );

  if (listaSorteioRefinamento[geraSorteioPosicao] === 1) {
    listaSorteioRefinamento[geraSorteioPosicao] = 0;
  } else {
    listaSorteioRefinamento[geraSorteioPosicao] = 1;
  }

  listaSorteioRefinamento.filter((objeto, index) =>
    objeto === 1 ? mochilaComObjetosRefinamento.push(index) : null,
  );

  const listaBeneficio = mochilaComObjetosRefinamento.map(
    (objeto) => beneficioDoObjeto[objeto],
  );

  beneficioTotalDaMochilaRefinamento = listaBeneficio.reduce(
    (total, beneficio) => total + beneficio,
    0,
  );

  if (beneficioTotalDaMochilaRefinamento > capacidadeDaMochila) {
    exibeMensagemMochilaCheia = alertaMochilaCheia.innerHTML = `
      <p class="js-alert-mochila">
      🚨 A mochila está cheia 🚨
      </p>
      `;
    beneficioTotalDaMochilaRefinamento =
      beneficioTotalDaMochilaRefinamento * -1;
  } else {
    exibeMensagemMochilaCheia = alertaMochilaCheia.innerHTML = '';
  }

  exibeResultadosMochilaRefinamento(
    listaSorteioRefinamento,
    mochilaComObjetosRefinamento,
    beneficioTotalDaMochilaRefinamento,
  );
};

const geraNovosVizinhos = (vizinho) => {
  const geraSorteioPosicao = Math.floor(Math.random() * vizinho.length);

  if (vizinho[geraSorteioPosicao] === 1) {
    vizinho[geraSorteioPosicao] = 0;
  } else {
    vizinho[geraSorteioPosicao] = 1;
  }

  return vizinho;
};

const heuristicaDaSubida = () => {
  let paradas = 0;

  for (let i = 0; i < 3; i++) {}

  for (let i = 0; i < 3; i++) {
    let vizinho = geraNovosVizinhos(listaObjetosSorteio);
    let pesoTotalDoVizinho = geraPesoDosObjetos(mochilaDosVizinhosComObjetos);

    if (pesoTotalDoVizinho > capacidadeDaMochila) {
      i += 1;
    } else {
      paradas = 0;

      let beneficioListaObjetos = geraBeneficioDosObjetos(mochilaComObjetos);
      let beneficioVizinho = geraBeneficioDosObjetos(
        mochilaDosVizinhosComObjetos,
      );

      if (beneficioVizinho > beneficioListaObjetos) {
        novaListaObjetosSorteio = vizinho;
        console.log(
          '🚀 ~ file: index.js:182 ~ heuristicaDaSubida ~ vizinho',
          vizinho,
        );
      }
    }
  }
};

const exibeResultadoDaMochila = (mochilaObjetos, pesoTotal) => {
  document.querySelector(
    '#js-qtdObjetos',
  ).textContent = `${quantidadeDeObjetos}`;

  document.querySelector(
    '#js-capacidadeMochila',
  ).textContent = `${capacidadeDaMochila}`;

  document.querySelector('#js-pesoObjetos').textContent = `${pesoDoObjeto}`;

  document.querySelector(
    '#js-beneficioObjetos',
  ).textContent = `${beneficioDoObjeto}`;

  document.querySelector(
    '#js-objetosSorteio',
  ).textContent = `${listaObjetosSorteio}`;

  document.querySelector('#js-indiceObjetos').textContent = `${mochilaObjetos}`;

  document.querySelector('#js-pesoTotalMochila').textContent = `${pesoTotal}`;
};

const exibeResultadosMochilaRefinamento = (
  listaObjetosSorteio,
  mochilaComObjetos,
  beneficioTotalDaMochila,
) => {
  document.querySelector(
    '#js-qtdObjetosRefinamento',
  ).textContent = `${quantidadeDeObjetos}`;

  document.querySelector(
    '#js-capacidadeMochilaRefinamento',
  ).textContent = `${capacidadeDaMochila}`;

  document.querySelector(
    '#js-pesoObjetosRefinamento',
  ).textContent = `${pesoDoObjeto}`;

  document.querySelector(
    '#js-beneficioObjetosRefinamento',
  ).textContent = `${beneficioDoObjeto}`;

  document.querySelector(
    '#js-objetosSorteioRefinamento',
  ).textContent = `${listaObjetosSorteio}`;

  document.querySelector(
    '#js-indiceObjetosRefinamento',
  ).textContent = `${mochilaComObjetos}`;

  document.querySelector(
    '#js-beneficioTotalRefinamento',
  ).textContent = `${beneficioTotalDaMochila}`;
};

inserindoOsObjetos();
gerarSorteioDaMochila();
geraBeneficioDosObjetos();
geraPesoDosObjetos();
//heuristicaDaSubida();
refinamentoVizinhoDoSorteio();
