let quantidadeDeObjetos;
let capacidadeDaMochila;

let pesoDoObjeto = [];
let beneficioDoObjeto = [];
let listaObjetosSorteio = [];
let mochilaComObjetos = [];

const inserindoOsObjetos = () => {
  quantidadeDeObjetos = parseInt(prompt('Insira a quantidade de objetos'));
  capacidadeDaMochila = parseInt(prompt('Insira a capacidade da mochila'));

  for (let i = 0; i <= quantidadeDeObjetos - 1; i++) {
    let listaPesoDosObjetos = parseInt(prompt('Insira o peso do objeto: ' + i));

    let listaBeneficioDosObjetos = parseInt(
      prompt('Insira o beneficio do objeto: ' + i),
    );

    pesoDoObjeto.push(listaPesoDosObjetos);
    beneficioDoObjeto.push(listaBeneficioDosObjetos);
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

const pegarBeneficioDosObjetos = () => {
  listaObjetosSorteio.filter((objeto, index) =>
    objeto === 1 ? mochilaComObjetos.push(index) : null,
  );

  const listaBeneficio = mochilaComObjetos.map(
    (objeto) => beneficioDoObjeto[objeto],
  );

  const beneficioTotalDaMochila = listaBeneficio.reduce(
    (total, beneficio) => total + beneficio,
    0,
  );

  return beneficioTotalDaMochila;
};

const gerarSolucaoDoSorteio = () => {
  const alertaMochilaCheia = document.querySelector('.objects');
  let exibeMensagemMochilaCheia;
  let pesoTotalDaMochila;

  listaObjetosSorteio.filter((objeto, index) =>
    objeto === 1 ? mochilaComObjetos.push(index) : null,
  );

  const listaPeso = mochilaComObjetos.map((objeto) => pesoDoObjeto[objeto]);

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

  informandoValoresEmTela(pesoTotalDaMochila, exibeMensagemMochilaCheia);
};

const refinamentoVizinhoDoSorteio = () => {
  const alertaMochilaCheia = document.querySelector('.refinamento');
  const mochilaComObjetosRefinamento = [];
  let listaSorteioRefinamento = [];
  let beneficioTotalDaMochilaRefinamento;
  let exibeMensagemMochilaCheia;

  listaObjetosSorteio.map((objeto, index) => {
    const sorteio = Math.floor(Math.random() * 2);

    if (sorteio === 0) {
      listaSorteioRefinamento[index] = 0;
    }

    if (sorteio === 1) {
      listaSorteioRefinamento[index] = 1;
    }
  });

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

  informandoEmTelaRefinamento(
    listaSorteioRefinamento,
    mochilaComObjetosRefinamento,
    beneficioTotalDaMochilaRefinamento,
    exibeMensagemMochilaCheia,
  );
};

const heuristicaDaSubida = () => {
  let melhorVizinho = listaObjetosSorteio;
  let melhorVizinhoBeneficio = pegarBeneficioDosObjetos();

  // sorteio da mochila - listaObjetosSorteio
  // calculo total do beneficio do lista...
  //melhorVizinho = listaObjetosSorteio
  // vou gerar um vizinho do melhor vizinho
  // alterando o sorteio dos indices
};

const informandoValoresEmTela = (
  pesoTotalDaMochila,
  exibeMensagemMochilaCheia,
) => {
  const divObjetos = document.querySelector('.objects');

  divObjetos.innerHTML = `
  <p>
      Quantidade de Objetos na mochila: <span> ${quantidadeDeObjetos} </span>
    </p>
    <p>
      Capacidade da mochila:
      <span>${capacidadeDaMochila}</span>
    </p>
    <hr />

    <p>
      Peso dos objetos da mochila:
      <span>${pesoDoObjeto}</span>
    </p>
    <p>
      Beneficio dos objetos da mochila:
      <span> ${beneficioDoObjeto}</span>
    </p>
    <hr />

    <p>
      Lista de objetos do sorteio:
      <span>${listaObjetosSorteio}</span>
    </p>
    <p>
      Índice dos objetos do sorteio:
      <span>${mochilaComObjetos}</span>
    </p>
    <hr />

    <p>
      Peso total da mochila:
      <span>${pesoTotalDaMochila}</span>
    </p>

    ${exibeMensagemMochilaCheia}
  `;
};

const informandoEmTelaRefinamento = (
  listaObjetosSorteio,
  mochilaComObjetos,
  pesoTotalDaMochila,
  exibeMensagemMochilaCheia,
) => {
  const divRefinamento = document.querySelector('.refinamento');

  divRefinamento.innerHTML = `
  <p>
      Quantidade de Objetos na mochila: <span> ${quantidadeDeObjetos} </span>
    </p>
    <p>
      Capacidade da mochila:
      <span>${capacidadeDaMochila}</span>
    </p>
    <hr />

    <p>
      Peso dos objetos da mochila:
      <span>${pesoDoObjeto}</span>
    </p>
    <p>
      Beneficio dos objetos da mochila:
      <span> ${beneficioDoObjeto}</span>
    </p>
    <hr />

    <p>
      Lista de objetos do sorteio:
      <span>${listaObjetosSorteio}</span>
    </p>
    <p>
      Índice dos objetos do sorteio:
      <span>${mochilaComObjetos}</span>
    </p>
    <hr />

    <p>
     Beneficio total da mochila:
      <span>${pesoTotalDaMochila}</span>
    </p>

    
    ${exibeMensagemMochilaCheia}
`;
};

inserindoOsObjetos();
gerarSorteioDaMochila();
gerarSolucaoDoSorteio();
pegarBeneficioDosObjetos();
refinamentoVizinhoDoSorteio();
