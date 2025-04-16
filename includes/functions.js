const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { info } = require("console");
const frasespath = path.join(__dirname, '..', 'comunidade', 'risorius.json');
const dinheiropath = path.join(__dirname, '..', 'comunidade', 'dinheiro.json');

//PATH DAS FRASES
function readDataFraseFromFile() {
    if (fs.existsSync(frasespath)) {
        const JSONDADOS = fs.readFileSync(frasespath, 'utf8');
        return JSON.parse(JSONDADOS);
    }
}
function writeDataFraseToFile(datafrase) {
    const jsonString = JSON.stringify(datafrase, null, 2);
    fs.writeFileSync(frasespath, jsonString, 'utf8');
}
const datafrase = readDataFraseFromFile();


//PATH DO DINHEIRO
function readDataDinheiroFromFile3() {
    if (fs.existsSync(dinheiropath)) {
        const JSONDADOSDINHEIRO = fs.readFileSync(dinheiropath, 'utf8');
        return JSON.parse(JSONDADOSDINHEIRO);
    }
}
function writeDataDinheiroToFile(datadinheiro) {
    const jsonString = JSON.stringify(datadinheiro, null, 2);
    fs.writeFileSync(dinheiropath, jsonString, 'utf8');
}
let datadinheiro = readDataDinheiroFromFile3();

const Ids = {
    artefatos: {
        Cotidianario: "1357767401697186075",
        Ancora: "1277463401362100306",
        Quillix: "1357790015320494310",
        Umbrela: "1357792363883266108",
        imaculado: "1277775778888679577",
        Audicao: "1359236224107417892",
        Alma: "1359250105240387654",
        Escamas: "1359250079663391012",
        Lingua: "1359250319858733307",
        Olhos: "1359250104401526814",
        Olfato: "1359250106116735137",
        Ouvidos: "1359236224107417892",
        Zerlar: "1359263777765326908"
    },
    
    equipamentos: {
        EspadaCurta: "1359206977225490684",
        EspadaLonga: "1359206977225490684",
        CajadoMagico: "1359206977225490684",
        Parisa: "1359245976753274881",
        FoiceHurn: "1359246111755468932",
        CeifadoraDoLuar: "1359246276490952724"
    },

    positivos: {
        Solar: "1244795864078352445",
        ancestralidade: "1277775959969366107",
        rapido: "1245457877221638154",
        Entrelacados: "1245595127452536832",
        BemCuidado: "1247560429127860316",
        Acelerado: "1248261978917437491",
        Celerissimo: "1248261886122917958",
        Speedrunner: "1248365621977157715",
        Burlador: "1248596219383644250",
        Vigilante: "1249115348771541096",
        BFFS: "1251357259787665529",
        TrevoDourado: "1254163535341027419",
        Eventualidade: "1293498591263850528",
        Heronos: "1251038312807006248",
        Juhur: "1251038596119658518",
        Protegido: "1248614810585927681",
        Conjuge: "1357432625387671643",
        Dogma: "1357446864080732533"
    },
    unicos: {
        Maldicao: "1243508945805381645",
        Bencao: "1243775255106027632",
        Glorificado: "1245128518422102097",
        Contingente: "1244795840430735410",
        Imperador: "1245812621081579622",
        Afortunado: "1244159113223475230",
        Contracao: "1251362458313166858",
        Coincidente: "1245812200019460267",
        MeiaNove: "1244742336408457266",
        Venturado: "1244789708563812392",
        Infortuna: "1244812600756408461",
        Desgraca: "1244815450299433001",
        Desprezo: "1245128660214743070",
        Assustado: "1245823898000294012",
        Inconveniente: "1254213068217647164",
        Caos: "1251353081959026739",
        Azarado: "1244812565335380028",
        Normalizator: "1254198559872647298",
        Padraozinho: "1245132705037815849",
        Espelho: "1246139098259787807",
        Desvirtuado: "1357425516050911232"
    },
    negativos: {
        Fardo: "1244815840331698239",
        Banido: "1245448188165619743",
        Malcuidado: "1247560603413774376",
        Lerdo: "1245457565673066558",
        Preguiçoso: "1248260988092944454",
        Letargico: "1248261066669035601",
        Quebrado: "1248366935045963877",
        Trapaceiro: "1248596517485412412",
        Decadencia: "1254225903421100033",
        Espelhoquebrado: "1251047237887332382",
        WFFs: "1277718062128173137",
        Destruicao: "1251047335719473192",
        Aflicao: "1293498406987370497",
        Lingua: "1254169214453944491",
        Leigo: "1290956360661602354",
        Marlan: "1251047418833797120",
        Malitias: "1251047479496151071"
    },
    usuarios: {
        amanda: "407937359389261858",
        alexandre: "396979087307964426",
        alvaro: "546734558431674369",
        diogo: "546377246420762651",
        fabio: "424982351593078785",
        heloise: "1054515144950030356",
        isis: "725490324960575570",
        kelson: "309439524730044448",
        otavio: "1002730228998742067",
        vitor: "340298478494154752",
        paulo: "862809964401393665",
        thuany: "406048394650451969"
    }
};

function TIRARPOSITIVO(user) {
    const rolesToRemove = [
        ...Object.values(Ids.positivos),
    ];
    rolesToRemove.forEach(roleId => {
        if (user.roles.cache.has(roleId)) {
            user.roles.remove(roleId).catch(console.error);
        }
    });
}

function TIRARNEGATIVO(user) {
    for (const chave in Ids.negativos) {
        if (Ids.negativos.hasOwnProperty(chave)) {
            const id = Ids.negativos[chave];
            if (user.roles.cache.has(id)) {
                user.roles.remove(id)
                console.log(`Removido o cargo ID: ${id} (${chave})`);
            }

        }
    }

}

function TIRAREQUIPAMENTO(user) {
    for (const chave in Ids.equipamentos) {
        if (Ids.equipamentos.hasOwnProperty(chave)) {
            const id = Ids.equipamentos[chave];
            if (user.roles.cache.has(id)) {
                user.roles.remove(id)
                console.log(`Removido o cargo ID: ${id} (${chave})`);
            }

        }
    }
}
function TIRARARTEFATO(user) {
    for (const chave in Ids.artefatos) {
        if (Ids.artefatos.hasOwnProperty(chave)) {
            const id = Ids.artefatos[chave];
            if (user.roles.cache.has(id)) {
                user.roles.remove(id)
                console.log(`Removido o cargo ID: ${id} (${chave})`);
            }

        }
    }
}

function TIRARARTEFATOS(user) {
    for (const chave in Ids.artefatos) {
        if (Ids.artefatos.hasOwnProperty(chave)) {
            const id = Ids.artefatos[chave];
            if (user.roles.cache.has(id)) {
                user.roles.remove(id)
                console.log(`Removido o cargo ID: ${id} (${chave})`);
            }

        }
    }

}

function EFEITOS(roletabobby, user) {
    let trevodourado = 1
    let Lingua = 1
    let ninho = datafrase.infos.ninho
    //TREVO
    if (user.roles.cache.has(Ids.positivos.TrevoDourado)) {
        trevodourado = 1.10;
    }
    //LÍNGUA DE GATO PRETO
    if (user.roles.cache.has(Ids.negativos.Lingua)) {
        Lingua = 1.10;
    }

    const efeitosGeraisNegativos = [
        { id: Ids.unicos.Desprezo, valor: (299 - Math.floor(Math.random() * 299)) },
        { id: Ids.negativos.Decadencia, valor: (30 + (datafrase.infos.decadencia * 1.50)) * Lingua },
        { id: Ids.negativos.Fardo, valor: (Math.floor(Math.random() * 100) + 1) * Lingua },
        { id: Ids.unicos.Assustado, valor: ((150 + Math.ceil(ninho * 0.0001))) * Lingua },
        { id: Ids.unicos.Normalizator, valor: 20 * Lingua },
        { id: Ids.negativos.Aflicao, valor: 80 * Lingua },
        { id: Ids.unicos.Maldicao, valor: 350 * Lingua },
        { id: Ids.unicos.Desgraca, valor: 175 * Lingua },
        { id: Ids.unicos.Infortuna, valor: 80 * Lingua },
        { id: Ids.unicos.Azarado, valor: 40 * Lingua },
        { id: Ids.unicos.Inconveniente, valor: 20 * Lingua },
        { id: Ids.unicos.Caos, valor: Math.max(1, Math.min(1000, roletabobby - (roletabobby + (500 - Math.floor(Math.random() * 1000))) + 299)) },
    ];

    const efeitosGeraisPositivos = [
        { id: Ids.unicos.Padraozinho, valor: 750 - Math.floor(Math.random() * 300) },
        { id: Ids.unicos.Glorificado, valor: Math.floor(Math.random() * 249) + 750 },
        { id: Ids.positivos.Solar, valor: (Math.floor(Math.random() * 100) + 1) * trevodourado },
        { id: Ids.unicos.Imperador, valor: ((150 + Math.ceil(ninho * 0.0001))) * trevodourado },
        { id: Ids.unicos.Bencao, valor: 350 * trevodourado },
        { id: Ids.unicos.Contingente, valor: 150 * trevodourado },
        { id: Ids.positivos.Eventualidade, valor: 80 * trevodourado },
        { id: Ids.unicos.Afortunado, valor: 80 * trevodourado },
        { id: Ids.unicos.MeiaNove, valor: 69 },
        { id: Ids.unicos.Venturado, valor: 40 * trevodourado },
        { id: Ids.positivos.Entrelacados, valor: 30 * trevodourado },
        { id: Ids.unicos.Coincidente, valor: 20 * trevodourado },
        { id: Ids.unicos.Normalizator, valor: 100 },
        { id: Ids.unicos.Contracao, valor: 500 },
    ];

    //EFEITOS NEGATIVOS
    efeitosGeraisNegativos.forEach(({ id, valor }) => {
        let eventualidade = Math.floor(Math.random() * 100) + 1;
        if (user.roles.cache.has(id) && id == "1293498406987370497") { //AFLIÇÃO
            console.log("AFLITO: " + eventualidade)
            if (eventualidade >= 0 && eventualidade <= 26) {
                roletabobby = roletabobby - (valor)// * linguagato);
            }
        } else if (user.roles.cache.has(id) && id == "1245823898000294012") { //NINHO DO DRAGÃO CINZENTO
            user.roles.remove(id);
            console.log("DRAGÃO CINZENTO: " + valor)
            roletabobby -= valor
            datafrase.infos.ninho = 1

        } else if (user.roles.cache.has(id) && id == "1254225903421100033") { //DECADENCIA
            console.log("DECADENCIA: " + valor)
            roletabobby -= valor
            datafrase.infos.decadencia -= 1

        } else if (user.roles.cache.has(id) && id == "1245128660214743070") { //DESPREZO
            console.log("DESPREZO: " + valor)
            roletabobby = valor
        } else if (user.roles.cache.has(id) && id == "1251353081959026739") { //ENERGIA CAÓTICA
            console.log("CAOS: " + valor)
            user.roles.remove(id);
            roletabobby = valor
        } else if (user.roles.cache.has(id)) {
            user.roles.remove(id);
            roletabobby -= valor
        }
    });

    //EFEITOS POSITIVOS
    efeitosGeraisPositivos.forEach(({ id, valor }) => {
        let eventualidade = Math.floor(Math.random() * 100) + 1;
        if (user.roles.cache.has(id) && id == "1245128518422102097") { //GLORIFICADO
            user.roles.remove(id);
            console.log("GLORIFICADO: " + valor)
            roletabobby = valor
        } else if (user.roles.cache.has(id) && id == "1254198559872647298") { //NORMALIZATOR
            if (roletabobby < 300) {
                roletabobby += valor;
            }
            if (roletabobby > 750) {
                roletabobby -= valor;
            }
            console.log("NORMALIZATOR: " + roletabobby)
            user.roles.remove(id);
        } else if (user.roles.cache.has(id) && id == "1245812621081579622") { //COFRE DA DINASTIA
            user.roles.remove(id);
            console.log("COFRE: " + valor)
            roletabobby += valor
            datafrase.infos.dinastia = 1

        } else if (user.roles.cache.has(id) && id == "1245132705037815849") { //PADRÃOZINHO
            console.log("PADRÃOZINHO: " + valor)
            user.roles.remove(id);
            roletabobby = valor
        } else if (user.roles.cache.has(id) && id == "1244742336408457266") { //MEIA NOVE
            console.log("MEIA NOVE: " + valor)
            user.roles.remove(id);
            if (eventualidade <= 50) { roletabobby = roletabobby + (valor * trevodourado) }
            if (eventualidade > 50) { roletabobby = roletabobby - (valor * Lingua) }
        } else if (user.roles.cache.has(id) && id == "1245595127452536832") { //ENTRELAÇADOS
            if (datafrase.infos.laços != 0) {
                console.log("ENTRELAÇADOS: " + valor)
                roletabobby += valor
                datafrase.infos.laços -= 1
            }
        } else if (user.roles.cache.has(id) && id == "1293498591263850528") { //EVENTUALIDADE
            console.log("EVENTUALIDADE: " + eventualidade)
            if (eventualidade >= 0 && eventualidade <= 26) {
                roletabobby = roletabobby + (valor)
            }
        } else if (user.roles.cache.has(id) && id == "1251362458313166858") { //CONTRAÇÃO
            user.roles.remove(id);
            console.log("CONTRAÇÃO: " + eventualidade)
            roletabobby = valor - (roletabobby - valor);
        } else if (user.roles.cache.has(id)) {
            console.log("GERAL")
            user.roles.remove(id);
            roletabobby += valor
        }
    });

    //FINALIZAÇÃO GRAVANDO NO JSON
    try {
        writeDataFraseToFile(datafrase);
    } catch (error) {
        console.error("Erro ao escrever no arquivo:", error);
    }
    return roletabobby;
}

async function EVENTOS(roletabobby, EventoAtual, interaction, guild) {
    const member = await guild.members.fetch(interaction.user.id);

    //EVENTO GRAVIDADE
    if (EventoAtual == "gravidade") {
        roletabobby = 500 - (roletabobby - 500)
    }

    //ESTRELA CADENTE
    if (EventoAtual == "estrela") {
        var teste2 = Math.floor(Math.random() * 10) + 1;
        if (teste2 == 10) {
            datafrase.dados.estrelas++
            roletabobby = roletabobby + 150
            interaction.channel.send(`☄${interaction.user} viu uma estrela cadente caindo do céu...☄`)
        }
    }
    //COMUNGAR
    if (EventoAtual == "comungar") {
        roletabobby = roletabobby + 80
    }
    //MARLAN
    if (EventoAtual == "marlan" && !member.roles.cache.has(Ids.artefatos.Umbrela)) {
        console.log("CHEUGIE APJNFJOPSDAVFAKJGBFDK")
        roletabobby = roletabobby - 80
    }
    //CAOTICO
    if (EventoAtual == "caotico" && !member.roles.cache.has(Ids.artefatos.Umbrela)) {
        var teste2 = Math.floor(Math.random() * 10) + 1;
        if (teste2 > 5) { roletabobby = roletabobby + 80 }
        if (teste2 <= 5) { roletabobby = roletabobby - 80 }
    }
    console.log(`Valor de Eventos: ${roletabobby}`)
    writeDataFraseToFile(datafrase)
    return (roletabobby)
}

function calcularDano(tipo) {
    switch (tipo) {
        case "EspadaCurta":
            return Math.floor(Math.random() * 6) + 1;
            break;
        case "EspadaLonga":
            return Math.floor(Math.random() * 8) + 1;
            break;
        case "CajadoMagico":
            return Math.floor(Math.random() * 6) + 1;
            break;
        case "Parisa":
            return Math.floor(Math.random() * 8) + 1 + Math.floor(Math.random() * 8) + 1 + Math.floor(Math.random() * 8) + 1;
            break;
        case "FoiceHurn":
            return Math.floor(Math.random() * 10) + 1 + Math.floor(Math.random() * 8) + 1 + Math.floor(Math.random() * 12) + 1;
            break;
        case "CeifadoraDoLuar":
            return Math.floor(Math.random() * 20) + 1 + Math.floor(Math.random() * 20) + 1;
            break;
        default:
            return Math.floor(Math.random() * 4);
            break;
    }
}

function obterEquipamento(user, equipamentosDisponiveis) {
    for (const [nome, id] of Object.entries(equipamentosDisponiveis)) {
        if (user.roles.cache.has(id)) {
            return { nome, teste: "1d6" }; 
        }
    }
    return { nome: "Nenhum equipamento", teste: "N/A" };
}

async function RaidBoss(boss, user) {
    console.log("Boss recebido:", boss);

    if (!datafrase.raid.bosses[boss]) {
        console.error(`Boss "${boss}" não encontrado.`);
        return;
    }
    const cor = datafrase.raid.bosses[boss].cor
    const equipamento = await obterEquipamento(user, Ids.equipamentos);
    const dano = calcularDano(equipamento.nome);
    datafrase.raid.bosses[boss].vida -= dano
    if(datafrase.raid.bosses[boss].vida <= 0){
        datafrase.raid.resultado = "Vitoria"
    }
    if(datafrase.raid.bosses[boss].Lenda == "Ruivo" && datafrase.raid.bosses[boss].vida <= 0){
        datafrase.raid.resultado = "Ruivo"
    }
    
    const bossfight = new EmbedBuilder()
        .setTitle(`${boss}`)
        .setColor(cor || '#FFFFFF')
        .setDescription(`O ${user.nickname || user.user.username} utilizou ${equipamento.nome}`)
        .addFields(
            { name: 'Dano Causado', value: dano.toString(), inline: true }
        );
    writeDataFraseToFile(datafrase)
    return bossfight;
}

async function BFFs(guild, statustipo, tipo) {
    const userIds = Object.values(Ids.usuarios);
    for (const id of userIds) {
        const member = await guild.members.fetch(id).catch(() => null);
        if (member && tipo == "BFFS") {
            if (member.roles.cache.has(Ids.positivos.BFFS)) {
                await member.roles.add(statustipo);
                console.log(`Cargo adicionado a ${member.user.tag} (BFFs efeito)`);
            }
        } else if (member && tipo == "WFFS") {
            if (member.roles.cache.has(Ids.negativos.WFFs)) {
                await member.roles.add(statustipo);
                console.log(`Cargo adicionado a ${member.user.tag} (WFFs efeito)`);
            }
        }
    }
}

async function EVOLUCAO(user, interaction) {
    //SOLAR
    if (user.roles.cache.has(Ids.positivos.Solar)) {
        if(user.roles.cache.has(Ids.artefatos.Alma) && user.roles.cache.has(Ids.artefatos.Ouvidos) && user.roles.cache.has(Ids.artefatos.Olfato) && user.roles.cache.has(Ids.artefatos.Lingua) && user.roles.cache.has(Ids.artefatos.Olhos) && user.roles.cache.has(Ids.artefatos.Escamas)){
            await interaction.member.roles.add(Ids.artefatos.Zerlar)

            await user.roles.remove(Ids.artefatos.Alma)
            await user.roles.remove(Ids.artefatos.Ouvidos)
            await user.roles.remove(Ids.artefatos.Olfato)
            await user.roles.remove(Ids.artefatos.Lingua)
            await user.roles.remove(Ids.artefatos.Olhos)
            await user.roles.remove(Ids.artefatos.Escamas)
        }
        if (user.roles.cache.has(Ids.positivos.Speedrunner)) {
            await interaction.member.roles.add(Ids.positivos.Heronos)
            await user.roles.remove(Ids.positivos.Speedrunner)
        }
        if (user.roles.cache.has(Ids.positivos.Burlador)) {
            await interaction.member.roles.add(Ids.positivos.Juhur)
            await user.roles.remove(Ids.positivos.Burlador)
        }
    }
    //LUNAR
    if (user.roles.cache.has(Ids.negativos.Fardo)) {
        if (user.roles.cache.has(Ids.unicos.Espelho)) {
            await interaction.member.roles.add(Ids.negativos.Espelhoquebrado)
            await user.roles.remove(Ids.unicos.Espelho)
        }
        if (user.roles.cache.has(Ids.negativos.Quebrado)) {
            await interaction.member.roles.add(Ids.negativos.Destruicao)
            await user.roles.remove(Ids.negativos.Quebrado)
        }
    }

    //ALMA
    if (user.roles.cache.has(Ids.unicos.Bencao) && user.roles.cache.has(Ids.positivos.TrevoDourado) && user.roles.cache.has(Ids.positivos.BemCuidado) && user.roles.cache.has(Ids.positivos.Vigilante)) {
        await interaction.member.roles.add(Ids.artefatos.Alma)
    }

    //SPEED
    if (user.roles.cache.has(Ids.positivos.Heronos)) {
        await user.roles.remove(Ids.positivos.Speedrunner)
        await user.roles.remove(Ids.positivos.Acelerado)
        await user.roles.remove(Ids.positivos.rapido)
        await user.roles.remove(Ids.positivos.Celerissimo)
        await user.roles.remove(Ids.negativos.Lerdo)
        await user.roles.remove(Ids.negativos.Letargico)
        await user.roles.remove(Ids.negativos.Preguiçoso)
    } else if (user.roles.cache.has(Ids.positivos.Speedrunner)) {
        await user.roles.remove(Ids.positivos.Acelerado)
        await user.roles.remove(Ids.positivos.rapido)
        await user.roles.remove(Ids.positivos.Celerissimo)
        await user.roles.remove(Ids.negativos.Lerdo)
        await user.roles.remove(Ids.negativos.Letargico)
        await user.roles.remove(Ids.negativos.Preguiçoso)
    } else if (user.roles.cache.has(Ids.positivos.Celerissimo)) {
        await user.roles.remove(Ids.positivos.rapido)
        await user.roles.remove(Ids.positivos.Acelerado)
        await user.roles.remove(Ids.negativos.Lerdo)
        await user.roles.remove(Ids.negativos.Letargico)
        await user.roles.remove(Ids.negativos.Preguiçoso)
    } else if (user.roles.cache.has(Ids.negativos.Letargico)) {
        await user.roles.remove(Ids.positivos.rapido)
        await user.roles.remove(Ids.positivos.Acelerado)
        await user.roles.remove(Ids.negativos.Lerdo)
        await user.roles.remove(Ids.negativos.Preguiçoso)
    } else if (user.roles.cache.has(Ids.positivos.Acelerado)) {
        await user.roles.remove(Ids.positivos.rapido)
        await user.roles.remove(Ids.negativos.Lerdo)
        await user.roles.remove(Ids.negativos.Preguiçoso)
    } else if (user.roles.cache.has(Ids.negativos.Preguiçoso)) {
        await user.roles.remove(Ids.positivos.rapido)
        await user.roles.remove(Ids.negativos.Lerdo)
    } else if (user.roles.cache.has(Ids.positivos.rapido)) {
        await user.roles.remove(Ids.negativos.Lerdo)
    }

}

function OutrosValores(roletabobby, user) {
    // DOGMA
    if (user.roles.cache.has(Ids.positivos.Dogma)) {
        if (roletabobby > 750) {
            roletabobby += 50
        }
        if (roletabobby <= 299) {
            roletabobby -= 50
        }
        if (roletabobby >= 1375) {
            roletabobby = 1200;
        }
        if (roletabobby <= -375) {
            roletabobby = -300;
        }
    }

    //HANAR
    if (user.roles.cache.has(Ids.positivos.BemCuidado)) {
        if (roletabobby <= 4) {
            user.roles.remove(Ids.positivos.BemCuidado);
            interaction.channel.send(`🔅Minha criança ${interaction.user}, eu te protegi dessa vez, que a Misericórdia do Sol te siga e te proteja🔅`);
            roletabobby = Math.floor(Math.random() * 249) + 750;
        }
    }

    // MALITIAS
    if (user.roles.cache.has(Ids.negativos.Malcuidado)) {
        if (roletabobby >= 995) {
            user.roles.remove(Ids.negativos.Malcuidado);
            interaction.channel.send(`⭕Pecador ${interaction.user}, sua maldição foi libertada, mas sua sorte foi anulada⭕`);
            roletabobby = (299 - Math.floor(Math.random() * 299));
        }
    }

    // DESVIRTUADO
    if (user.roles.cache.has(Ids.unicos.Desvirtuado)) {
        const cartas = [
            "Piada Cruel", "Valor Lendário", "Bobbylhão",
            "Jogar Bênção", "Jogar Maldade", "Água Pura", "Dor no Rim"
        ];

        const probabilidades = [0.01, 0.01, 0.05, 0.20, 0.20, 0.26, 0.27];

        const random = Math.random();
        let acumulado = 0;

        for (let i = 0; i < cartas.length; i++) {
            acumulado += probabilidades[i];
            if (random < acumulado) {
                switch (cartas[i]) {
                    case "Piada Cruel":
                        roletabobby = 5;
                        break;
                    case "Valor Lendário":
                        roletabobby = 997;
                        break;
                    case "Bobbylhão":
                        roletabobby = 981;
                        break;
                    case "Jogar Bênção":
                        roletabobby = 952;
                        break;
                    case "Jogar Maldade":
                        roletabobby = 28;
                        break;
                    case "Água Pura":
                        roletabobby = 930;
                        break;
                    case "Dor no Rim":
                        roletabobby = 75;
                        break;
                    default:
                        console.log("Erro ao sortear carta.");
                }
                break;
            }
        }
        user.roles.remove(Ids.unicos.Desvirtuado);
    }
    return (roletabobby)
}

function Artefatos(roletabobby, user) {
    // COTIDIANARIAO
    if (user.roles.cache.has(Ids.artefatos.Cotidianario)) {
        if (roletabobby > 700) {
            roletabobby -= 20
        }
        if (roletabobby < 300) {
            roletabobby += 20
        }
    }

    // ANCORA DOURADA
    if (user.roles.cache.has(Ids.artefatos.Ancora)) {
        roletabobby -= 15
    }

    // QUILLIX
    if (user.roles.cache.has(Ids.artefatos.Quillix)) {
        roletabobby += 15
    }

    console.log(`Valor com Artefatos: ${roletabobby}`)

    return (roletabobby)
}

async function adicionarRole(member, roleId, tipo) {
    try {
        for (const categoria in Ids) {
            for (const key in Ids[categoria]) {
                if (Ids[categoria][key] === roleId) {
                    await member.roles.add(roleId);
                    console.log(`Cargo ${roleId} (${key}) adicionado a ${member.user.tag}`);
                    if (member.roles.cache.has(Ids.negativos.WFFs) || member.roles.cache.has(Ids.positivos.BFFS)) {
                        await BFFs(member.guild, roleId, tipo);
                    }
                    return;
                }
            }
        }
        console.log(`Nenhum cargo correspondente encontrado para o ID ${roleId}`);
    } catch (error) {
        console.error(`Erro ao adicionar cargo: ${error}`);
    }
}

async function adicionarRoleTodos(guild, roleId) {
    for (const nome in Ids.usuarios) {
        if (Ids.usuarios.hasOwnProperty(nome)) {
            const userId = Ids.usuarios[nome];
            try {
                const member = await guild.members.fetch(userId);
                if (member) {
                    await member.roles.add(roleId);
                    console.log(`Cargo ${roleId} adicionado a ${nome}`);
                }
            } catch (error) {
                console.error(`Erro ao adicionar cargo para ${nome} (${userId}):`, error);
            }
        }
    }
}

async function aplicarDinheiro(user, valor, guild) {
    for (const nome in Ids.usuarios) {
        if (Ids.usuarios.hasOwnProperty(nome)) {
            const id = Ids.usuarios[nome];
            if (id == user.id) {
                if (user.roles.cache.has(Ids.positivos.Conjuge)) {
                    aplicarDinheiroConjuge(valor, guild)
                }
                datadinheiro.DINHEIRO[nome] = (datadinheiro.DINHEIRO[nome] || 0) + valor;
                writeDataDinheiroToFile(datadinheiro)
                console.log(`Nome: ${nome}, Dinheiro: ${valor}, ID: ${id || "Sem ID definido"}`);
            }
        }
    }
}
async function aplicarDinheiroConjuge(valor, guild) {
    for (const nome in Ids.usuarios) {
        if (Ids.usuarios.hasOwnProperty(nome)) {
            const id = Ids.usuarios[nome];
            const member = await guild.members.fetch(id).catch(() => null);
            if (member && member.roles.cache.has(Ids.positivos.Conjuge)) {
                datadinheiro.DINHEIRO[nome] = (datadinheiro.DINHEIRO[nome] || 0) + valor;
                writeDataDinheiroToFile(datadinheiro)
                console.log(`Nome: ${nome}, Dinheiro: ${valor}, ID: ${id || "Sem ID definido"}`);
            }
        }
    }
}

async function aplicarDinheiroTodos(valor) {
    for (const nome in Ids.usuarios) {
        if (Ids.usuarios.hasOwnProperty(nome)) {
            const id = Ids.usuarios[nome];
            datadinheiro.DINHEIRO[nome] = (datadinheiro.DINHEIRO[nome] || 0) + valor;
            writeDataDinheiroToFile(datadinheiro)
            console.log(`Nome: ${nome}, Dinheiro: ${valor}, ID: ${id || "Sem ID definido"}`);
        }
    }
}

function RandomEfeitoPositivo(tipo) {
    if (tipo === "positivo") {
        const efeitos = Object.keys(Ids.positivos).filter(effect => effect !== "Solar");
        const randomEffect = efeitos[Math.floor(Math.random() * efeitos.length)];
        return { nome: randomEffect, id: Ids.positivos[randomEffect] };
    } else if(tipo === "equipamento"){
        const efeitos = Object.keys(Ids.equipamentos).filter(effect => effect !== "Solar");
        const randomEffect = efeitos[Math.floor(Math.random() * efeitos.length)];
        return { nome: randomEffect, id: Ids.equipamentos[randomEffect] };
    } else {
        const efeitos = Object.keys(Ids.negativos).filter(effect => effect !== "Lunar");
        const randomEffect = efeitos[Math.floor(Math.random() * efeitos.length)];
        return { nome: randomEffect, id: Ids.negativos[randomEffect] };
    }

}

module.exports = {
    Artefatos,
    TIRARPOSITIVO,
    TIRARNEGATIVO,
    EFEITOS,
    EVENTOS,
    BFFs,
    EVOLUCAO,
    OutrosValores,
    adicionarRole,
    TIRARARTEFATOS,
    Ids,
    RaidBoss,
    aplicarDinheiro,
    aplicarDinheiroTodos,
    adicionarRoleTodos,
    RandomEfeitoPositivo,
    TIRAREQUIPAMENTO,
    TIRARARTEFATO
};