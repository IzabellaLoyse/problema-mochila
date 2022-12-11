let quantidadeDeObjetos;
let capacidadeDaMochila;

const pesoDoObjeto = [];
const beneficioDoObjeto = [];
const listaObjetosSorteio = [];
const mochilaComObjetos = [];

const inserindoOsObjetos = () => {
  quantidadeDeObjetos = parseInt(prompt('Insira a quantidade de objetos'), 10);
  capacidadeDaMochila = parseInt(prompt('Insira a capacidade da mochila'), 10);

  if (Number.isNaN(quantidadeDeObjetos) || Number.isNaN(capacidadeDaMochila)) {
    alert('Por favor, insira apenas números!');
    inserindoOsObjetos();
  }

  for (let i = 0; i <= quantidadeDeObjetos - 1; i += 1) {
    const listaPesoDosObjetos = parseInt(
      prompt(`Insira o peso do objeto: ${i}`),
      10,
    );

    const listageraBeneficioDosObjetos = parseInt(
      prompt(`Insira o beneficio do objeto: ${i}`),
      10,
    );

    pesoDoObjeto.push(listaPesoDosObjetos);
    beneficioDoObjeto.push(listageraBeneficioDosObjetos);
  }
};

inserindoOsObjetos();

const gerarSorteioDaMochila = () => {
  for (let i = 0; i <= quantidadeDeObjetos - 1; i += 1) {
    const sorteio = Math.floor(Math.random() * 2);

    if (sorteio === 0) {
      listaObjetosSorteio[i] = 0;
    }

    if (sorteio === 1) {
      listaObjetosSorteio[i] = 1;
    }
  }
};

gerarSorteioDaMochila();

const geraBeneficioDosObjetos = (mochila = mochilaComObjetos) => {
  let beneficioTotalDaMochila;

  listaObjetosSorteio.filter((objeto, index) =>
    objeto === 1 ? mochila.push(index) : null,
  );

  const listaBeneficio = mochila.map((objeto) => beneficioDoObjeto[objeto]);

  beneficioTotalDaMochila = listaBeneficio.reduce(
    (total, beneficio) => total + beneficio,
    0,
  );

  if (beneficioTotalDaMochila > capacidadeDaMochila) {
    beneficioTotalDaMochila *= -1;
  }

  return beneficioTotalDaMochila;
};

geraBeneficioDosObjetos();

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

const geraPesoDosObjetos = () => {
  const alertaMochilaCheia = document.querySelector('.js-mensagemErro');
  let pesoTotalDaMochila;

  const listaPeso = mochilaComObjetos.map((objeto) => pesoDoObjeto[objeto]);

  pesoTotalDaMochila = listaPeso.reduce((total, peso) => total + peso, 0);

  if (pesoTotalDaMochila > capacidadeDaMochila) {
    alertaMochilaCheia.innerHTML = `
      <p class="js-alert-mochila">
      🚨 A mochila está cheia 🚨
      </p>
      `;
    pesoTotalDaMochila *= -1;
  } else {
    alertaMochilaCheia.innerHTML = '';
  }

  exibeResultadoDaMochila(mochilaComObjetos, pesoTotalDaMochila);

  return pesoTotalDaMochila;
};

geraPesoDosObjetos();

const exibeResultadosMochilaRefinamento = (
  listaObjetosSorteioRefinamento,
  mochilaComObjetosRefinamento,
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
  ).textContent = `${listaObjetosSorteioRefinamento}`;

  document.querySelector(
    '#js-indiceObjetosRefinamento',
  ).textContent = `${mochilaComObjetosRefinamento}`;

  document.querySelector(
    '#js-beneficioTotalRefinamento',
  ).textContent = `${beneficioTotalDaMochila}`;
};

const refinamentoVizinhoDoSorteio = () => {
  const alertaMochilaCheia = document.querySelector(
    '.js-mensagemErroRefinamento',
  );

  let beneficioTotalDaMochilaRefinamento;
  const mochilaComObjetosRefinamento = [];
  const listaSorteioRefinamento = [];

  listaObjetosSorteio.map((objeto) => listaSorteioRefinamento.push(objeto));

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
    alertaMochilaCheia.innerHTML = `
      <p class="js-alert-mochila">
      🚨 A mochila está cheia 🚨
      </p>
      `;
    beneficioTotalDaMochilaRefinamento *= -1;
  } else {
    alertaMochilaCheia.innerHTML = '';
  }

  exibeResultadosMochilaRefinamento(
    listaSorteioRefinamento,
    mochilaComObjetosRefinamento,
    beneficioTotalDaMochilaRefinamento,
  );
};

refinamentoVizinhoDoSorteio();
