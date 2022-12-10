const promptSync = require('prompt-sync')();

let quantidadeDeObjetos;
let capacidadeDaMochila;

let pesoDoObjeto = [];
let beneficioDoObjeto = [];
let listaObjetosSorteio = [];
let novaListaObjetosSorteio = listaObjetosSorteio;
let mochilaComObjetos = [];
let novaMochilaComObjetos = mochilaComObjetos;
let mochilaDosVizinhosComObjetos = [];

const inserindoOsObjetos = () => {
  console.log(`🎒 Problema da Mochila 🎒\n`);

  quantidadeDeObjetos = parseInt(
    promptSync('Insira a quantidade de objetos: '),
  );
  capacidadeDaMochila = parseInt(
    promptSync('Insira a capacidade da mochila: '),
  );

  console.log('*--------------------------------------------*');

  if (Number.isNaN(quantidadeDeObjetos) || Number.isNaN(capacidadeDaMochila)) {
    console.log('Por favor, insira apenas números!');
    promptSync('Pressione qualquer tecla para continuar...');
    inserindoOsObjetos();
  }

  for (let i = 0; i <= quantidadeDeObjetos - 1; i++) {
    let listaPesoDosObjetos = parseInt(
      promptSync(`Insira o peso do objeto ${i}: `),
    );

    let listaGeraBeneficioDosObjetos = parseInt(
      promptSync(`Insira o beneficio do objeto ${i}: `),
    );

    pesoDoObjeto.push(listaPesoDosObjetos);
    beneficioDoObjeto.push(listaGeraBeneficioDosObjetos);

    console.log('*--------------------------------------------*\n');
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

  listaObjetosSorteio.filter((objeto, index) =>
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

const geraPesoDosObjetos = () => {
  let pesoTotalDaMochila;

  console.log('📁 Entrada de Dados na Mochila 📁 \n');

  const listaPeso = mochilaComObjetos.map((objeto) => {
    return pesoDoObjeto[objeto];
  });

  pesoTotalDaMochila = listaPeso.reduce((total, peso) => total + peso, 0);

  console.log(`Quantidade de objetos na mochila: ${quantidadeDeObjetos}`);
  console.log(`Capacidade da mochila: ${capacidadeDaMochila}`);
  console.log(`Peso dos objetos da mochila: ${pesoDoObjeto}`);
  console.log(`Beneficio dos objetos da mochila: ${beneficioDoObjeto}`);
  console.log('*------------------------------------------*');
  console.log(`Lista de objetos do sorteio: ${listaObjetosSorteio}`);
  console.log(`Índice dos objetos do sorteio: ${mochilaComObjetos}`);
  console.log('*------------------------------------------*');

  if (pesoTotalDaMochila > capacidadeDaMochila) {
    pesoTotalDaMochila = pesoTotalDaMochila * -1;
    console.log(`Peso total da mochila: ${parseInt(pesoTotalDaMochila)}\b`);
    console.log('🚨 A mochila está cheia 🚨 \n');
  } else {
    console.log(`Peso total da mochila: ${parseInt(pesoTotalDaMochila)}\b`);
  }

  return pesoTotalDaMochila;
};

const geraPesoDosVizinhos = (mochila) => {
  let pesoTotalDaMochila;

  listaObjetosSorteio.filter((objeto, index) =>
    objeto === 1 ? mochila.push(index) : null,
  );

  const listaPeso = mochila.map((objeto) => {
    return pesoDoObjeto[objeto];
  });

  pesoTotalDaMochila = listaPeso.reduce((total, peso) => total + peso, 0);

  if (pesoTotalDaMochila > capacidadeDaMochila) {
    pesoTotalDaMochila = pesoTotalDaMochila * -1;
  }

  return pesoTotalDaMochila;
};

const refinamentoVizinhoDoSorteio = () => {
  let beneficioTotalDaMochilaRefinamento;
  const mochilaComObjetosRefinamento = [];
  const listaSorteioRefinamento = [];

  console.log('⚗️ Refinamento - Vizinho ⚗️\n');

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

  console.log(` Quantidade de Objetos na mochila: ${quantidadeDeObjetos}`);
  console.log(` Capacidade da mochila: ${capacidadeDaMochila}`);
  console.log(` Peso dos objetos da mochila: ${pesoDoObjeto}`);
  console.log(` Beneficio dos objetos da mochila: ${beneficioDoObjeto}`);
  console.log('*------------------------------------------*');
  console.log(` Lista de objetos do sorteio: ${listaSorteioRefinamento}`);
  console.log(
    ` Índice dos objetos do sorteio: ${mochilaComObjetosRefinamento}`,
  );

  if (beneficioTotalDaMochilaRefinamento > capacidadeDaMochila) {
    beneficioTotalDaMochilaRefinamento =
      beneficioTotalDaMochilaRefinamento * -1;
    console.log(
      ` Beneficio total da mochila: ${parseInt(
        beneficioTotalDaMochilaRefinamento,
      )}`,
    );
    console.log('🚨 A mochila está cheia 🚨');
  } else {
    console.log(
      ` Beneficio total da mochila: ${parseInt(
        beneficioTotalDaMochilaRefinamento,
      )}`,
    );
  }

  return beneficioTotalDaMochilaRefinamento;
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

  while (paradas < 3) {
    let vizinho = geraNovosVizinhos(listaObjetosSorteio);
    let pesoTotalDoVizinho = geraPesoDosVizinhos(mochilaDosVizinhosComObjetos);

    if (pesoTotalDoVizinho > capacidadeDaMochila) {
      paradas += 1;
    } else {
      paradas = 0;

      let beneficioListaObjetos = geraBeneficioDosObjetos(
        novaMochilaComObjetos,
      );
      let beneficioVizinho = geraBeneficioDosObjetos(
        mochilaDosVizinhosComObjetos,
      );

      if (beneficioVizinho > beneficioListaObjetos) {
        novaListaObjetosSorteio = vizinho;
        console.log(
          '🚀 ~ file: index.js:248 ~ heuristicaDaSubida ~ novaListaObjetosSorteio',
          novaListaObjetosSorteio,
        );
      }
    }

    console.log(
      '🚀 ~ file: index.js:252 ~ heuristicaDaSubida ~ paradas',
      paradas,
      novaListaObjetosSorteio,
    );
  }
};

inserindoOsObjetos();
gerarSorteioDaMochila();
geraBeneficioDosObjetos();
geraPesoDosObjetos();
refinamentoVizinhoDoSorteio();
heuristicaDaSubida();
