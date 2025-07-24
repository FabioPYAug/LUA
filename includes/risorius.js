const { TIRARPOSITIVO, TIRARNEGATIVO, EFEITOS, EVENTOS, WFFs, BFFs, TIRARARTEFATO, TIRAREQUIPAMENTO, RaidBoss, EVOLUCAO, Artefatos, RandomEfeitoPositivo, TIRARARTEFATOS, OutrosValores, adicionarRole, aplicarDinheiro, adicionarRoleTodos, aplicarDinheiroTodos, Ids } = require('../includes/functions.js');


function sortearPorPeso(itens) {

    const totalPeso = itens.reduce((acc, item) => acc + item.peso, 0);
    let random = Math.random() * totalPeso;

    for (const item of itens) {
        if (random <= item.peso) {
            return item;
        }
        random -= item.peso;
    }

    return itens[itens.length - 1];
}

function VerificarCargo(user) {
  const cargosPossuidos = [];
  for (const categoria in Ids) {
    if (categoria === 'usuarios') continue;
    const cargosDaCategoria = Ids[categoria];
    for (const nome in cargosDaCategoria) {
      const cargoId = cargosDaCategoria[nome];

      if (user.roles.cache.has(cargoId)) {
        cargosPossuidos.push(cargoId);
      }
    }
  }

  return cargosPossuidos;
}

function AplicarCargos(cargos, user) {
    efeitoComum = 1;
    efeitoSorte = 1;
    efeitoAzar = 1;
    const efeitosGerais = [];
  cargos.forEach(cargo => {
    switch (cargo) {
      case Ids.negativos.Envelope:
        efeitosGerais.push('Envelope');
        break;

    case Ids.artefatos.Cotidianario:
        efeitosGerais.push('Cotidianario');
        efeitoComum += 0.5;
        break;

    case Ids.unicos.Normalizator:
        efeitosGerais.push('Normalizator');
        efeitoComum += 0.75;
        user.roles.remove(cargo);
        break;
    }
  });

  return {
    efeitoComum,
    efeitoSorte,
    efeitoAzar,
    efeitosGerais
  };
}

module.exports = {
    sortearPorPeso,
    AplicarCargos,
    VerificarCargo
};