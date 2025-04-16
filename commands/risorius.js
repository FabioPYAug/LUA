const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { TIRARPOSITIVO, TIRARNEGATIVO, EFEITOS, EVENTOS, WFFs, BFFs, TIRARARTEFATO, TIRAREQUIPAMENTO, RaidBoss, EVOLUCAO, Artefatos, RandomEfeitoPositivo, TIRARARTEFATOS, OutrosValores, adicionarRole, aplicarDinheiro, adicionarRoleTodos, aplicarDinheiroTodos, Ids } = require('../includes/functions.js');
const fs = require('fs');
const path = require('path');
const { info } = require("console");

const ADM = "1099030674574422107"
const DEV = "1245805926313623592"
const BAN = "1245448188165619743"
const espelho = "1246139098259787807"
const ancestralidadeid = "1277775778888679577"
const divinoid = "1244795864078352445"
const fardoid = "1244815840331698239"
const leiguidadeid = "1290956360661602354"
const protegidoid = "1248614810585927681"
const imaculadoid = "1277775778888679577"
const alertaid = "1099030674574422107"

const totalcartas = 128
const frasespath = path.join(__dirname, '..', 'comunidade', 'risorius.json');
const imagenspath = path.join(__dirname, '..', 'comunidade', 'imagens.json');
const dinheiropath = path.join(__dirname, '..', 'comunidade', 'dinheiro.json');
const modopath = path.join(__dirname, '..', 'comunidade', 'bot.json');
const embeds = new EmbedBuilder()

function readDataDinheiroFromFile() {
    if (fs.existsSync(dinheiropath)) {
        const JSONDADOSDINHEIRO = fs.readFileSync(dinheiropath, "utf8");
        return JSON.parse(JSONDADOSDINHEIRO);
    }
    return { DINHEIRO: {} }; 
}

let datadinheiro = readDataDinheiroFromFile();

function readDataModoFromFile() {
    if (fs.existsSync(modopath)) {
        const jsonModo = fs.readFileSync(modopath, "utf8");
        return JSON.parse(jsonModo);
    }
    return { DINHEIRO: {} }; 
}

let botModo = readDataModoFromFile();

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
let datafrase = readDataFraseFromFile();


//PATH DAS IMAGENS
function readDataImagemFromFile() {
    if (fs.existsSync(imagenspath)) {
        const JSONDADOSIMAGENS = fs.readFileSync(imagenspath, 'utf8');
        return JSON.parse(JSONDADOSIMAGENS);
    }
}
let dataimagem = readDataImagemFromFile();

//TIMEOUT DOS CARGOS
var timeout = {};
const cooldowns = {
    "Letárgico": 750000,
    "Preguiçoso": 600000,
    "Lerdo": 400000,
    "Ágil": 200000,
    "Acelerado": 150000,
    "Celeríssimo": 120000,
    "SpeedRunner": 100000,
    "Herónos": 60000,
    "Dev": 2000
};
let bloqueio
let imperador
let ninho
datafrase.eventos.tipo = "normal"
let roletabobby = 1
let ancestral = 1
function getporce(mini, maxi) {
    return ((maxi - mini) * 100) / 1000
}
const defaultCooldown = 600000

module.exports = {
    data: new SlashCommandBuilder()
        .setName("risorius")
        .setDescription("Testar a sorte com o Deus da Comédia!"),
    async execute(interaction) {
        console.log("<---------------------------------------------------->")
        const user = interaction.member;

        const EventoAtual = datafrase.eventos.tipo
        console.log("O Evento atual é: " + EventoAtual)
        ninho = datafrase.infos.ninho
        imperador = datafrase.infos.dinastia
        //BLOQUEADO
        if (EventoAtual == "bloqueado") {
            interaction.reply({ content: "O Risorius está preparando um evento!", ephemeral: true })
            return
        } else if (user.roles.cache.has(BAN)) {
            interaction.reply({ content: "Você está banido do Risorius.", ephemeral: true })
            return
        }

        //COOLDOWN
        const roles = user.roles.cache.map(role => role.name);
        let cooldownTime = defaultCooldown;
        for (const role of roles) {
            if (cooldowns[role]) {
                cooldownTime = cooldowns[role];
                break;
            }
        }
        if (timeout[interaction.user.id] && Date.now() - timeout[interaction.user.id] < cooldownTime) {
            const remainingTime = ((timeout[interaction.user.id] + cooldownTime) - Date.now()) / 1000;
            return await interaction.reply({ content: `Este comando está em cooldown, espere ${remainingTime.toFixed(1)} segundos`, ephemeral: true });
        }

        //ROLETABOBBY
        if (!user.roles.cache.has(espelho)) {
            //ANCESTRAL
            ancestral = Math.floor(Math.random() * 100) + 1
            if (user.roles.cache.has(ancestralidadeid)) {
                ancestral = ancestral - 5
            }
            console.log(`Valor ANCESTRAL: ${ancestral}`)
            //ROLETA PADRÃO
            roletabobby = Math.floor(Math.random() * 1000) + 1
            await EVOLUCAO(user, interaction)
            console.log(`Valor natural: ${roletabobby}`)
            roletabobby = EFEITOS(roletabobby, user, interaction);
            if (EventoAtual != "normal") {
                //roletabobby = EVENTOS(roletabobby, EventoAtual, interaction, interaction.guild)
            }
        } else {
            roletabobby == datafrase.infos.espelho
            datafrase.dados.espelho++
            writeDataFraseToFile(datafrase)
            await user.roles.remove(espelho)
        }
        roletabobby = OutrosValores(roletabobby, interaction.member)
        if (user.roles.cache.has(Ids.negativos.Quebrado)) {
            var teste2 = Math.floor(Math.random() * 10) + 1;
            if (teste2 == 1) {
                interaction.reply({ content: `Ué, o sistema quebrou? Eita, você está quebrado mesmo HAHAHAHAHAHAHA. Volte para fila e tente na próxima!`, ephemeral: true })
                bloqueio = true
            }
        } else if (user.roles.cache.has(Ids.negativos.Destruicao)) {
            var teste2 = Math.floor(Math.random() * 10) + 1;
            if (teste2 > 4) {
                interaction.reply({ content: `O sistema está destruído para você...`, ephemeral: true })
                bloqueio = true
            }
        }
        if (bloqueio == true) {
            bloqueio = false;
            return
        } else {

            //RAID
            if (EventoAtual == "raid") {
                const valor = await RaidBoss(datafrase.eventos.chefe, user);
                interaction.channel.send({ embeds: [valor] });
            }

            datafrase = readDataFraseFromFile();
            console.log(`Valor com efeitos: ${roletabobby}`)
            await interaction.reply("Abrindo pacote de cartas...")
            if (ancestral <= 2) {
                ANCESTRAL()
            } else {
                datafrase.dados.usos++
                if (roletabobby > 750) {
                    datafrase.dados.cartaspositivaspegas++
                } else if (roletabobby <= 750 && roletabobby >= 300) {
                    datafrase.dados.CartasComunsPegas++
                } else if (roletabobby < 300) {
                    datafrase.dados.cartasnegativaspegas++
                }
                writeDataFraseToFile(datafrase)
                roletabobby = Artefatos(roletabobby, user)
                console.log(`Valor Final: ${roletabobby}`)
                CARTAS(roletabobby)
                writeDataFraseToFile(datafrase)
                await console.log("<---------------------------------------------------->")
            }
        }

        //11 CARTAS ANCESTRAIS
        async function ANCESTRAL() {
            datafrase.dados.ancestral++
            let dinheirorandom
            writeDataFraseToFile(datafrase)

            let cartas = ["Transformção de Crenças", "Cornucópia", "Numismática", "Vicissitude", "Imaculabilidade", "Ufanismo",
                "Desvirtuar o Futuro", "Matrimónio", "Iconoclasta", "Cataclismo", "Cuntatório"
            ]
            const cartarandom = cartas[Math.floor(Math.random() * cartas.length)];
            const teste100 = 2 / 100
            embeds.setColor("Blue")
            embeds.setAuthor({ name: `Ancestral`, iconURL: "https://images2.imgbox.com/85/b7/eAqAIjZW_o.png" })
            embeds.setFooter({ text: `Chance: ${teste100}%` });

            //CUNTATÓRIO
            if (cartarandom == "Cuntatório") {
                embeds.setTitle(`CUNTATÓRIO`)
                embeds.setDescription(``)
                embeds.setThumbnail("https://images2.imgbox.com/4e/d7/VyXxuL1x_o.png")
                interaction.channel.send({ embeds: [embeds] })
                TIRARARTEFATOS(user)
            }
            //UFANISMO
            if (cartarandom == "Ufanismo") {
                embeds.setTitle(`UFANISMO`)
                embeds.setDescription(`Temos anseios, vontades, desejos, que infelizmente, foram apagados contra nossa vontade. Viramos um rascunho falho de nós mesmos... Esta carta irá te dar o efeito Leiguidade, fazendo com que todas as cartas que você tire, estejam sem descrição e título (não tem efeito em cartas ancestrais)."`)
                embeds.setThumbnail("https://images2.imgbox.com/2a/92/d2t1R6RW_o.png")
                adicionarRole(interaction.member, Ids.negativos.Leigo, "WFFS")
                interaction.channel.send({ embeds: [embeds] })
            }
            //TRANSFORMAÇÃO DE CRENÇAS
            if (cartarandom == "Transformção de Crenças") {
                embeds.setTitle(`TRANSFORMAÇÃO DE CRENÇAS`)
                embeds.setDescription(`A troca do seu conceito e ideias é algo normal, afinal, vocês são humanos. Essa carta fará você receber um status aleatório, porém, ele sempre será da raridade Abençoada ou Amaldiçoada.`)
                embeds.setThumbnail("https://images2.imgbox.com/2a/92/d2t1R6RW_o.png")
                const NOMESJSON = datafrase.idsdivindades;
                const randomefeito = NOMESJSON[Math.floor(Math.random() * NOMESJSON.length)];
                interaction.member.roles.add(randomefeito)
                interaction.channel.send({ embeds: [embeds] })
            }
            //CORNUCÓPIA
            if (cartarandom == "Cornucópia") {
                embeds.setTitle(`CORNUCÓPIA`)
                embeds.setDescription(`Em tempos antigos, onde a vida se resumia a batalhas e guerras incessantes, as duas poderosas entidades, mesmo após sua grandiosa batalha de sete dias, mantiveram acesas suas profundas rivalidades. As chamas da discórdia se espalharam, atingindo até mesmo aqueles que nada tinham a ver com suas contendas. Mas, será que todo esse esforço valeu a pena? Essa carta irá pegar uma carta aleatória do Risorius, fazendo com que todas as cartas tenham a mesma chance de serem pegas.`)
                embeds.setThumbnail("https://images2.imgbox.com/d8/42/2UM0Buod_o.png")
                roletabobby = Math.floor(Math.random() * (1350 - (-300) + 1)) + (-300);
                interaction.channel.send({ embeds: [embeds] })
                CARTAS(roletabobby)
            }
            //NUMISMÁTICA
            if (cartarandom == "Numismática") {
                embeds.setTitle(`NUMISMÁTICA`)
                embeds.setDescription(`Nossa moeda é de tempos imemoriais, nossas riquezas, colunas de ouro maciço, tudo isso, outrora, tinha outro propósito. Não buscávamos apenas a acumulação de tesouros, mas sim a essência da beleza; não ansiávamos pelo poder terreno, mas pela força espiritual daqueles que nos cercavam. Esta carta, ao ser lançada, conferirá um valor de 0 a 50 mil Zens.`)
                embeds.setThumbnail("https://images2.imgbox.com/ab/e1/qZ0pXBmr_o.png")
                dinheirorandom = Math.floor(Math.random() * (50000 - 0 + 1)) + 0;
                interaction.channel.send({ embeds: [embeds] })
                aplicarDinheiro(user, dinheirorandom, interaction.guild)
            }
            //VICISSITUDE
            if (cartarandom == "Vicissitude") {
                embeds.setTitle("VICISSITUDE");
                embeds.setDescription(`A proteção, a fortaleza, e todas as nossas forças foram dedicadas a preservar aquilo que mais nos era caro: a vida. Contudo, não foi suficiente. Teu vício, tua sede insaciável por mais, teu ego desmedido, nos conduziram à ruína, e, paradoxalmente, também à nossa prosperidade. Esta carta irá jogar 5 vezes no Risorius em seguida.`);
                embeds.setThumbnail("https://images2.imgbox.com/65/0e/PBk8jzNU_o.png");
                interaction.channel.send({ embeds: [embeds] });
                for (let i = 0; i < 5; i++) {
                    roletabobby = Math.floor(Math.random() * 1001) - 300;
                    CARTAS(roletabobby)
                }
            }
            //IMACULABILIDADE
            if (cartarandom == "Imaculabilidade") {
                embeds.setTitle(`IMACULABILIDADE`)
                embeds.setDescription(`Nós não somos inúteis; somos a parte mais essencial. E, embora sejamos fracos, somos a peça indispensável para a realização do teu desígnio. Esse Artefato irá te dar a possibilidade de ganhar "Abençoado" quando cair na carta "Zé Ninguém".`)
                embeds.setThumbnail("https://images2.imgbox.com/4e/d7/VyXxuL1x_o.png")
                adicionarRole(interaction.member, Ids.artefatos.imaculado)
                interaction.channel.send({ embeds: [embeds] })
            }
            //DESVIRTUAR O FUTURO
            if (cartarandom == "Desvirtuar o Futuro") {
                embeds.setTitle(`DESVIRTUAR O FUTURO`)
                embeds.setDescription(`Sente o desespero, corre e foge de teu futuro, como fazem todos aqueles que ainda mantêm-se de pé. Você é fraco, um mero peão em um vasto tabuleiro. Seu destino? Selado por decisões que jamais soubeste que foram tomadas. Esta irá fazer com que a sua próxima carta irá interferir diretamente nas sessões de RPG.`)
                embeds.setThumbnail("https://images2.imgbox.com/4e/d7/VyXxuL1x_o.png")
                adicionarRole(interaction.member, Ids.unicos.Desvirtuado)
                interaction.channel.send({ embeds: [embeds] })
            }
            //MATRIMÓNIO
            if (cartarandom == "Matrimónio") {
                embeds.setTitle(`MATRIMÓNIO`)
                embeds.setDescription(`A conexão entre vocês é essencial. Juntos, a solidão pesa menos nos corações vastos que carregam. Se unam — suas vozes, em coro, clamam por poder, por controle, por amor, por dor... Essa carta fará com que você e outra pessoa aleatória sejam Cônjuges, compartilhando todos os ganhos e perdas de dinheiro que um ou outro tiverem.`)
                embeds.setThumbnail("https://images2.imgbox.com/4e/d7/VyXxuL1x_o.png")
                interaction.channel.send({ embeds: [embeds] })
                const guild = interaction.guild;
                const userIds = Object.values(Ids.usuarios);

                adicionarRole(interaction.member, Ids.positivos.Conjuge)

                const eligibleUsers = [];

                for (const id of userIds) {
                    const member = await guild.members.fetch(id).catch(() => null);
                    if (member && member.id !== interaction.member.id && !member.roles.cache.has(Ids.positivos.Conjuge)) {
                        eligibleUsers.push(member);
                    }
                }

                if (eligibleUsers.length === 0) {
                    return interaction.channel.send("⚠ Não existe pessoas que queiram ser seu cônjuge ⚠");
                }

                const randomUserId = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
                const randomMember = await guild.members.fetch(randomUserId);
                await adicionarRole(randomMember, Ids.positivos.Conjuge)

                interaction.channel.send(`👰 ${randomMember.user.tag} é o seu cônjuge!`);
            }
            //ICONOCLASTA
            if (cartarandom == "Iconoclasta") {
                embeds.setTitle(`ICONOCLASTA`)
                embeds.setDescription(`Você não se prende a nenhum deles, porque os opostos não ditam quem você é. Valores também não te definem — só você tem esse poder. Seu caminho é seu, e ninguém pode dizer o que você deve ser além de você mesmo... Essa carta irá fazer com que você NÃO possa pegar nem Solar nem Lunar, contudo, suas chances de pegar cartas positivas e negativas serão aumentadas igualmente.`)
                embeds.setThumbnail("https://images2.imgbox.com/4e/d7/VyXxuL1x_o.png")
                adicionarRole(interaction.member, Ids.positivos.Dogma)
                interaction.channel.send({ embeds: [embeds] })
            }
            //CATACLISMO
            if (cartarandom == "Cataclismo") {
                let ent = "Conseguimos aguentar mais um dia, mas por quanto tempo seguiremos assim?"
                const chance = Math.floor(Math.random() * 10) + 1;
                if (chance == 10) {
                    const winner = Math.random() < 0.5 ? 1 : 2;
                    if (winner == 1) {
                        ent = "O seu brilho em Espiral venceu..."
                        adicionarRole(interaction.member, Ids.positivos.Solar)
                    } else {
                        ent = "As suas linhas gélidas e cortantes venceram..."
                        adicionarRole(interaction.member, Ids.negativos.Fardo)
                    }
                }
                embeds.setTitle(`CATACLISMO`)
                embeds.setDescription(`Tudo chegou ao fim. No final, não passamos de peças nesse grande jogo de guerra. Será que merecemos isso? Esse calor sufocante, esse frio cortante? Por que nos veem assim, como se fôssemos nada? No fim... ${ent} Essa irá fazer com que você tenha 10% de chance de pegar ou Lunar ou Solar.`)
                embeds.setThumbnail("https://images2.imgbox.com/4e/d7/VyXxuL1x_o.png")
                adicionarRole(interaction.member, Ids.positivos.Dogma)
                interaction.channel.send({ embeds: [embeds] })
            }
        }
        //154 - CARTAS:
        async function CARTAS(roletabobby) {
            //1 SOLAR
            if (roletabobby >= 1375) {
                const teste100 = 466 / 100000
                datafrase.dados.lunarsolar++
                embeds.setColor("Yellow")
                embeds.setAuthor({ name: `Solar`, iconURL: "https://thumbs2.imgbox.com/df/e9/DcGo6iIv_b.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                embeds.setTitle(`ACAUSALIDADE`)
                embeds.setDescription(`Essa carta queima com o poder da sua sorte. O Sol irá te dar o poder de uma divindade, TODAS as suas cartas a partir de agora terão uma sorte divina que funciona com outros status. Além disso, quaisquer Status de azar que você ter serão desintegrados.\nAlém disso, qualquer status de azar que você possua será completamente desintegrado. Alguns status de sorte também serão elevados ao nível divino.\n\nPor fim, quaisquer efeitos e desvantagens pegos anteriormente, serão anuladas (caso já tenha sido afetado pelas desvantagens durante a sessão, não mudará nada).`)
                embeds.setThumbnail("https://images2.imgbox.com/f6/f9/6jLSvsDM_o.png")
                TIRARNEGATIVO(user)
                adicionarRole(interaction.member, Ids.positivos.Solar)
            }
            //9 DIVINA (996-1329)
            if (roletabobby > 995 && roletabobby <= 1375) {
                const teste100 = getporce(996, 1000)
                embeds.setColor("White")
                embeds.setAuthor({ name: `Divina`, iconURL: "https://images2.imgbox.com/47/44/O8yhCGx8_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //ITEM LENDÁRIO
                if (roletabobby > 995 && roletabobby <= 997) {
                    embeds.setTitle(`VALOR LENDÁRIO`)
                    datafrase.dados.ganhariten++
                    embeds.setDescription(`O toque de uma divindade manipula todas as chances e probabilidades, fazendo com que essa carta te de um item garantido em alguma campanha a sua escolha ou poderá te dar uma informação para auxiliar a encontrar um item de classe Lendária em uma campanha aleatória. A verdadeira divina comédia...`)
                    embeds.setThumbnail("https://images2.imgbox.com/c1/1c/MTLdc75F_o.png")
                }
                //ABENÇOADO
                if (roletabobby > 997 && roletabobby <= 1020) {
                    embeds.setTitle(`GLÓRIA AO SOL`)
                    embeds.setDescription(`Uma divindade te toca, dando-lhe uma bênção. Essa carta faz com que a sua próxima carta tenha uma ENORME sorte. Que o calor do Sol traga paz a sua alma...`)
                    embeds.setThumbnail("https://images2.imgbox.com/e6/b3/5MS4ub3v_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Bencao, "BFFS")
                }
                //COMUNGAR
                if (roletabobby > 1020 && roletabobby <= 1040) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = 990 }
                    if (roletabobby >= 1020 && roletabobby <= 1040) {
                        embeds.setTitle(`COMUNGAR`)
                        embeds.setDescription(`Essa carta irá trazer uma bênção para todos do servidor, compartilhando entre todos a mais boa e pura bondade, aumentando a sorte das cartas de todos por 60 minutos. Esse evento vai acontecer em 1 minuto...\n\n(Essa sorte acumula com outros status)`)
                        embeds.setThumbnail("https://images2.imgbox.com/f6/d6/vcgIVFvO_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            interaction.channel.send(`@everyone ! Graças ao ${interaction.user} os próximos 60 minutos TODOS do servidor terão sorte nas cartas. Se divirtam!`)
                            datafrase.eventos.tipo = "comungar"
                            writeDataFraseToFile(datafrase)
                            setTimeout(async () => {
                                datafrase.eventos.tipo = "normal"
                                writeDataFraseToFile(datafrase)
                                interaction.channel.send(`Tivemos o fim do Comungar... Uma boa sorte a todos!`)
                            }, 3600000);
                        }, 30000)
                    }
                }
                //BÊNÇÃO DAS APOSTAS
                if (roletabobby > 1040 && roletabobby <= 1080) {
                    embeds.setTitle(`BÊNÇÃO DAS APOSTAS`)
                    embeds.setDescription(`Talvez seja sorte? Ou você é apenas um gnomo ligeiro, mas isso não importa, o que importa é que os jogos do Bobby foram BURLADOS por você.\nEssa carta faz com que você consiga manipular a banca do Bobby, recebendo mais dinheiro em suas apostas.`)
                    embeds.setThumbnail("https://images2.imgbox.com/0c/6c/fjJMlCQU_o.png")
                    adicionarRole(interaction.member, Ids.positivos.Burlador, "BFFS")
                }
                //VIGILÂNCIA DIVINA
                if (roletabobby > 1080 && roletabobby <= 1100) {
                    embeds.setTitle(`VIGILÂNCIA DIVINA`)
                    embeds.setDescription(`Você está sob bons olhos. Não se preocupe meu jovem, nenhuma maldade passará por aqui. Com essa carta você se torna imune a quaisquer roubos de Status na maioria das cartas do bot.`)
                    embeds.setThumbnail("https://images2.imgbox.com/e1/e3/553Xtw5k_o.png")
                    adicionarRole(interaction.member, Ids.positivos.Vigilante, "BFFS")
                }
                //PROTEÇÃO DE HANAR
                if (roletabobby > 1100 && roletabobby <= 1120) {
                    embeds.setTitle(`PROTEÇÃO DE HANAR`)
                    embeds.setDescription(`Hanar, a Deusa da Misericórdia te traz uma Dádiva, uma proteção, igual uma mãe cuidando de sua cria. \nEssa carta faz com que a Hanar te proteja da próxima carta amaldiçoada ou Lunar que pegar, fazendo com que ela se torne uma carta positiva garantida.`)
                    embeds.setThumbnail("https://images2.imgbox.com/e8/db/0gbwRsco_o.png")
                    adicionarRole(interaction.member, Ids.positivos.BemCuidadoM, "BFFS")
                }
                //TREVO DE 4 FOLHAS DOURADO
                if (roletabobby > 1120 && roletabobby <= 1140) {
                    embeds.setTitle(`TREVO DE 4 FOLHAS DOURADO`)
                    embeds.setDescription(`Em um lugar distante, reside um espírito chamado de Tróska. Este espírito traz sorte para todos os aventureiros que chegam no seu recinto.\nEssa carta irá te dar um trevo dourado que é muito comum na moradia de Tróska. Esste Trevo irá multiplicar todos os status de sorte em 10%.`)
                    embeds.setThumbnail("https://images2.imgbox.com/b8/89/v7EZGTBV_o.png")
                    adicionarRole(interaction.member, Ids.positivos.TrevoDourado, "BFFS")
                }
                //LOTERIA
                if (roletabobby > 1140 && roletabobby <= 1250) {
                    embeds.setTitle(`LOTERIA`)
                    embeds.setDescription(`Graças ao Sol, você ganhou aquela pequena aposta que havia feito... Quais chances? Não importa, pois tudo isso foi graças ao Sol! Você irá receber 25k de Zens.`)
                    embeds.setThumbnail("https://images2.imgbox.com/d7/8d/iQxN1Lj4_o.png")
                    aplicarDinheiro(user, 100000, interaction.guild)
                }
                //OUVIDOS
                if (roletabobby > 1250 && roletabobby < 1375) {
                    embeds.setTitle(`OUVIDOS`)
                    embeds.setDescription(`Os Ouvidos de Zerlar.`)
                    embeds.setThumbnail("https://images2.imgbox.com/e6/b3/5MS4ub3v_o.png")
                    adicionarRole(interaction.member, Ids.artefatos.Ouvidos)
                }

            }
            //4 INIGUALAVEL
            if (roletabobby > 980 && roletabobby <= 995) {
                const teste100 = getporce(981, 995)
                embeds.setColor("LuminousVividPink")
                embeds.setAuthor({ name: `Inigualável`, iconURL: "https://images2.imgbox.com/d7/ab/HXOLyUa7_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //BOBBYLHÃO
                if (roletabobby > 980 && roletabobby <= 981) {
                    embeds.setTitle(`BOBBYLHÃO`)
                    embeds.setDescription(`A comédia é o verdadeiro remédio para essa vida monótona! Essa carta irá convocar um Bobbylhão ou Show do Anfitrião para uma das próximas sessÔes. \nSe o Bobbylhão ou Show do Anfitrião já foram pegados e planejados, essa carta não irá ter efeito.`)
                    embeds.setThumbnail("https://images2.imgbox.com/1d/45/tYT4RBb6_o.png")
                }
                //EMOTECOLION
                if (roletabobby > 981 && roletabobby <= 985) {
                    embeds.setTitle(`EMOTECOLION`)
                    embeds.setDescription(`A sua forma de expressão e criatividade me deixa sem fôlego! Essa carta te dá a chance de escolher um novo emote ou gif para o servidor!`)
                    embeds.setThumbnail("https://images2.imgbox.com/9b/1d/VO4aZWpN_o.png")
                }
                //PASSA TUDO
                if (roletabobby > 985 && roletabobby <= 990) {
                    embeds.setTitle(`PASSA TUDO`)
                    embeds.setDescription(`O caos é o que mantém esse jogo de pé, e você é aquilo que os outros mais detestam! Essa carta faz com que você ROUBE os status positivos de alguma pessoa aleatória do servidor!\n\n(Essa carta só roubará aqueles que possuem status positivos, caso não tenha algum no servidor, ela não funcionará)`)
                    embeds.setThumbnail("https://images2.imgbox.com/9b/3e/BkVAREai_o.png")
                    datafrase.dados.roubos++
                    const guild = interaction.guild;
                    const userRandom = Object.values(Ids.usuarios).filter(id => id);
                    const statusPositivos = Object.values(Ids.positivos)
                    const maxTentativas = 200;
                    let contador = 0;

                    while (contador < maxTentativas) {
                        contador++;
                        const randomUserId = userRandom[Math.floor(Math.random() * userRandom.length)];
                        const member = await guild.members.fetch(randomUserId).catch(() => null);

                        if (!member ||
                            user.id === member.id ||
                            member.roles.cache.has(Ids.positivos.Vigilante) ||
                            !statusPositivos.some(id => member.roles.cache.has(id))) {
                            continue;
                        }

                        const statusDoMembro = member.roles.cache.filter(role => statusPositivos.includes(role.id));

                        if (statusDoMembro.size > 0) {
                            for (const [roleId] of statusDoMembro) {
                                await member.roles.remove(roleId);
                                await interaction.member.roles.add(roleId);
                            }

                            interaction.channel.send(`A pessoa que roubou os Status de ${member.nickname || member.user.username} foi ${interaction.user}`);
                            break;
                        }

                        if (contador === maxTentativas - 2) {
                            interaction.channel.send(`**⚠ Não existe membros com Status positivos para roubar ⚠**`);
                            break;
                        }
                    }

                    datafrase.infos.espelho = roletabobby
                    writeDataFraseToFile(datafrase)
                }
                //APOSENTADORIA
                if (roletabobby > 990 && roletabobby <= 995) {
                    embeds.setTitle(`APOSENTADORIA`)
                    embeds.setDescription(`A sua aposentadoria chegou mais cedo... Você irá receber 20k de Zens.`)
                    embeds.setThumbnail("https://images2.imgbox.com/fe/6e/3arBwLst_o.png")
                    aplicarDinheiro(user, 20000, interaction.guild)
                }
            }
            //8 MARAVILHOSA
            if (roletabobby > 950 && roletabobby <= 980) {
                const teste100 = getporce(951, 980)
                embeds.setColor("Gold")
                embeds.setAuthor({ name: `Maravilhosa`, iconURL: "https://images2.imgbox.com/72/00/9xMmv4Db_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //JOGAR BÊNÇÃO
                if (roletabobby > 950 && roletabobby <= 952) {
                    embeds.setTitle(`JOGAR BÊNÇÃO`)
                    const BENÇAOJSON = datafrase.efeitos.persobencao;
                    const randombencao = BENÇAOJSON[Math.floor(Math.random() * BENÇAOJSON.length)];
                    embeds.setDescription(`Você irá receber uma Bênção de um personagem de jogador aleatório deste servidor. \nConsidere essa Bênção como se o seu personagem tivesse acordado muito bem para fazer aquela coisa especifica\n(Está bênção é apenas para uma sessão!)\n\n${randombencao}`)
                    embeds.setThumbnail("https://images2.imgbox.com/24/e4/QhhFHwVH_o.png")
                }
                //RENDA EXTRA
                if (roletabobby > 952 && roletabobby <= 955) {
                    embeds.setTitle(`POUPANÇA RENDEU`)
                    embeds.setDescription(`Aquele dinheiro que sua mãe deixou na sua poupança para quando você se casar... PRONTO! Agora gaste todo esse dinheiro em ACTIONS FIGURES DA HATSUNE MIKU!!\n\nVocê irá receber 10k de Zens`)
                    embeds.setThumbnail("https://images2.imgbox.com/79/00/Nul73YJN_o.png")
                    aplicarDinheiro(user, 10000, interaction.guild)
                }
                //CONTIGENCIA
                if (roletabobby > 955 && roletabobby <= 958) {
                    embeds.setTitle(`CONTRA CONTINGÊNCIA CAÓTICA`)
                    embeds.setDescription(`Essa carta faz com que o destino seja quebrado, fazendo com que a sua sorte vá para as alturas, te dando uma sorte grande na próxima carta.`)
                    embeds.setThumbnail("https://images2.imgbox.com/81/95/z3hmJNyM_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Contingente, "BFFS")
                }
                //ESPELHO PERFEITO
                if (roletabobby > 958 && roletabobby <= 962) {
                    embeds.setTitle(`ESPELHO PERFEITO`)
                    embeds.setDescription(`Essa carta irá permitir que você possa duplicar a última carta usada. Ou seja, caso a pessoa pegue a carta -Afortunado- e você usar logo em seguida, você pegará a carta -Afortunado-.`)
                    adicionarRole(interaction.member, Ids.unicos.Espelho, "BFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/c8/c5/1WN5CgUN_o.png")
                }
                //VELOCIDADE ALÉM DA COMPREENSÃO
                if (roletabobby > 962 && roletabobby <= 967) {
                    embeds.setTitle(`VELOCIDADE ALÉM DA COMPREENSÃO`)
                    embeds.setDescription(`Essa carta faz com que você receba uma velocidade nas cartas tão alta que meros mortais nem vêem você jogando. Essa carta irá dar os status de SpeedRunner (3.0x).`)
                    embeds.setThumbnail("https://images2.imgbox.com/80/82/lc0MV5g7_o.png")
                    adicionarRole(interaction.member, Ids.positivos.Speedrunner, "BFFS")
                }
                //BEST FRIENDS FOREVER!
                if (roletabobby > 967 && roletabobby <= 970) {
                    embeds.setTitle(`BEST FRIENDS FOREVER!`)
                    embeds.setDescription(`Nós somos Melhores amigos! Está escrito nas estrelas!\nA carta irá pegar uma pessoa aleatória e fazer ela ser sua bestie. Ao estarem com cargos de Besties, vocês irão compartilhar TODOS os status positivos (Menos efeitos Solares) que um dos dois pegarem em cartas.\n\nBFFS❤`)
                    embeds.setThumbnail("https://images2.imgbox.com/6a/6f/BWObMIz1_o.png")
                    const guild = interaction.guild;
                    const userIds = Object.values(Ids.usuarios);

                    adicionarRole(interaction.member, Ids.positivos.BFFS, "BFFS")

                    const eligibleUsers = [];

                    for (const id of userIds) {
                        const member = await guild.members.fetch(id).catch(() => null);
                        if (member && member.id !== interaction.member.id && !member.roles.cache.has(Ids.positivos.BFFS)) {
                            eligibleUsers.push(member);
                        }
                    }

                    if (eligibleUsers.length === 0) {
                        return interaction.channel.send("⚠ Não existe pessoas que queiram ser seu amigo ⚠");
                    }

                    const randomUserId = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
                    const randomMember = await guild.members.fetch(randomUserId);
                    await adicionarRole(randomMember, Ids.positivos.BFFS, "BFFS")

                    interaction.channel.send(`🎉 ${randomMember.user.tag} é o seu BESTIEEEE HIIIIII😆!`);
                }
                //Higienização de Impurezas
                if (roletabobby > 970 && roletabobby <= 975) {
                    embeds.setTitle(`HIGIENIZAÇÃO DE IMPUREZAS`)
                    embeds.setDescription(`Essa carta irá limpar todas as impurezas que você tem. Ela irá tirar todos os status negativos do seu perfil`)
                    embeds.setThumbnail("https://images2.imgbox.com/4d/4e/gZbo71Q5_o.png")
                    TIRARNEGATIVO(user)
                }
                //ESTRELA CADENTE
                if (roletabobby > 975 && roletabobby <= 980) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = 901 }
                    if (roletabobby >= 975 && roletabobby <= 980) {
                        embeds.setTitle(`ESTRELAS CADENTES`)
                        embeds.setDescription(`É muito comum cair fragmentos Solares no nosso mundo. Muitas pessoas chamam esses fragmentos de Estrelas Cadentes e todos aqueles que acabam, por alguma sorte, vendo um, ganhará sorte até o final de suas vidas.\n\nEssa carta irá começar um evento em 1 minuto, onde todas as pessoas terão 10% de chance de ver uma Estrela Cadente, ganhando sorte Grande na carta. \n\nO evento tem duração de 60 minutos...`)
                        embeds.setThumbnail("https://images2.imgbox.com/5c/aa/vb9SJvoe_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            interaction.channel.send(`@everyone !! Graças ao ${interaction.user} os próximos 60 minutos terão chance de cair uma estrela cadente!`)
                            datafrase.eventos.tipo = "estrela"
                            writeDataFraseToFile(datafrase)
                            setTimeout(async () => {
                                datafrase.eventos.tipo = "normal"
                                interaction.channel.send(`Tivemos o fim das ESTRELAS CADENTES... Fragmentos Solares indicam uma boa sorte até o final da vida!`)
                                writeDataFraseToFile(datafrase)
                            }, 3600000);
                        }, 30000)
                    }
                }
            }
            //12 SUPERIOR
            if (roletabobby > 900 && roletabobby <= 950) {
                const teste100 = getporce(901, 950)
                embeds.setColor("DarkAqua")
                embeds.setAuthor({ name: `Superior`, iconURL: "https://images2.imgbox.com/e5/71/fFV7HGgZ_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //GLORIFICAR
                if (roletabobby > 900 && roletabobby <= 904) {
                    embeds.setTitle(`GLORIFICAÇÃO`)
                    embeds.setDescription(`Essa carta serve para mostrar o quão perfeitx você é. \nO ${interaction.user} é admirável, agradável, alegre, amável, apaixonante, apreciável, arrojado, astuto, autêntico, bem-humorado, bondoso, brilhante, carinhoso, carismático, cativante, competente, confiável, corajoso, criativo, culto, dedicado, determinado, digno, diplomático, dinâmico, doce, educado, eficaz, eficiente, elegante, emocionante, encantador, engenhoso, entusiasta, equilibrado, espetacular, espirituoso, esplêndido, estimado, ético, excepcional, exemplar, exímio, extraordinário, fabuloso, fantástico, fiel, forte, formidável, generoso, genial, gentil, gracioso, grandioso, heroico, honesto, honrado, íntegro, inovador, inspirador, inteligente, íntimo, irresistível, jovial, justo, leal, lindo, lúcido, magnífico, maravilhoso, memorável, meticuloso, notável, nobre, obstinado, original, otimista, paciente, perceptivo, perfeito, perseverante, perspicaz, ponderado, positivo, precioso, prestativo, primoroso, proativo, prodigioso, proeminente, prudente, puro, querido, radiante, realista, refinado, resiliente, resoluto, respeitável, responsável, rigoroso, sagaz, sábio, seguro, sensato, sensível, sereno, simpático, singular, solidário, sublime, talentoso, tenaz, tolerante, triunfante, único, valente, valoroso, versátil, virtuoso, visionário, vivaz, vigoroso, vitorioso e zeloso!\n\nEspero que tenha um dia perfeito, e para ajudar, irei te Glorificar, pois você merece😘. \n\nSua próxima carta terá 99.99999% de chance de ser POSITIVA.`)
                    embeds.setThumbnail("https://images2.imgbox.com/99/f0/lZVdpFme_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Glorificado, "BFFS")
                }
                //AJUDANTE DO POVO
                if (roletabobby > 904 && roletabobby <= 908) {
                    embeds.setTitle(`AJUDANTE DO POVO`)
                    embeds.setDescription(`Você é a verdadeira bondade pura! Você irá dar sorte média para todos do servidor!`)
                    embeds.setThumbnail("https://images2.imgbox.com/2e/b0/W0BrGezh_o.png")
                    adicionarRoleTodos(interaction.guild, Ids.unicos.Afortunado)
                }
                //AFORTUNADO
                if (roletabobby > 912 && roletabobby <= 916) {
                    embeds.setTitle(`AFORTUNADA`)
                    embeds.setDescription(`Essa carta traz a fortuna, te dando uma sorte média na próxima carta`)
                    embeds.setThumbnail("https://images2.imgbox.com/dc/6f/CLWIIy4j_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Afortunado, "BFFS")
                }
                //RAPI E DASH
                if (roletabobby > 916 && roletabobby <= 920) {
                    embeds.setTitle(`RAPI E DASH`)
                    embeds.setDescription(`Essa carta faz com que você seja tão rápido nas cartas que chamas aparecem em suas mãos, um verdadeiro diabo das apostas. \nO Cooldown do bot para você é diminuido em 2x a partir de agora e caso tenha pego algum status de lerdeza, ele será apagado.`)
                    embeds.setThumbnail("https://images2.imgbox.com/0c/43/n0mab3pK_o.png")
                    adicionarRole(interaction.member, Ids.positivos.rapido, "BFFS")
                }
                //XLR8
                if (roletabobby > 920 && roletabobby <= 924) {
                    embeds.setTitle(`XLR8`)
                    embeds.setDescription(`յყ ﻨร รօ νﻨռռﻨց ժձէ յყ ռﻨε εεгร հﻨεгժﻨε աօօгժε ĸձռ lεεร ռﻨε, հսllε ﻨร รօ օռժսﻨժεlﻨĸ. \nO Cooldown do bot para você é diminuido em 2.5x a partir de agora e caso tenha pego algum status de lerdeza, ele será apagado.`)
                    embeds.setThumbnail("https://images2.imgbox.com/c3/a5/6Ieqw0b2_o.png")
                    adicionarRole(interaction.member, Ids.positivos.Celerissimo, "BFFS")
                }
                //COFRE DA DINASTIA
                if (roletabobby > 924 && roletabobby <= 927) {
                    embeds.setTitle(`COFRE DA DINASTIA`)
                    embeds.setDescription(`Essa carta te permite acessar o Cofre dos Reis de Aystea através do poder de Bobby. Ao acessar, a carta irá rolar 1d20, tendo essas opções:\n\n-Caso caia valores maiores que 1 e menores que 20, você irá dobrar o valor dentro do cofre\n-Caso caia 1 você irá resetar todo o valor dentro do cofre\n-Caso caia 20 você irá pegar o valor para você e será resetado).\n\n\nTABELA DE PREÇOS:\n\n🟩 1 a 16 JONS: Sorte Minuscula\n🟩 32 a 256 JONS:Sorte Pequena\n🟩 512 a 2048 JONS: Sorte Média\n🟩 4096 a 16384 JONS: Sorte Grande\n🟩 32768 JONS para cime: Sorte Grande + Sorte pela quantidade de dinheiro\n\n🟦 Preço atual: ${datafrase.infos.dinastia} JONS`)
                    embeds.setThumbnail("https://images2.imgbox.com/e9/ad/Oz4ELYJz_o.png")
                    const dados = Math.floor(Math.random() * 20) + 1;
                    interaction.channel.send(`**${dados}**  ⟵ [${dados}] 1d20`);
                    if (dados == 1) {
                        datafrase.infos.dinastia = 1
                        var testopadrao = `Graças ao ${interaction.user} o dinheiro do banco foi zerado! `
                    }
                    if (dados == 20) {
                        var testopadrao = `# A PESSOA QUE CONSEGUIU O COFRE FOI... ${interaction.user}! Você conseguiu ${datafrase.infos.dinastia} JONS e poderá comprar: `
                        datafrase.dados.cofredragao++
                        if (datafrase.infos.dinastia >= 1 && datafrase.infos.dinastia <= 16) {
                            testopadrao = testopadrao + `Sorte Minuscula!`
                            interaction.member.roles.add(coincidenteid)
                            BFFs(user, coincidenteid);
                        }
                        if (datafrase.infos.dinastia >= 17 && datafrase.infos.dinastia <= 256) {
                            testopadrao = testopadrao + `Sorte Pequena!`
                            interaction.member.roles.add(venturadoid)
                            BFFs(user, venturadoid);
                        }
                        if (datafrase.infos.dinastia >= 257 && datafrase.infos.dinastia <= 2048) {
                            testopadrao = testopadrao + `Sorte Média!`
                            interaction.member.roles.add(afortunado)
                            BFFs(user, afortunado);
                        }
                        if (datafrase.infos.dinastia >= 2049 && datafrase.infos.dinastia <= 16384) {
                            testopadrao = testopadrao + `Sorte Grande!`
                            interaction.member.roles.add(contigenteid)
                            BFFs(user, contigenteid);
                        }
                        if (datafrase.infos.dinastia >= 16385) {
                            testopadrao = testopadrao + `Sorte Constante!`
                            interaction.member.roles.add(imperadorid);
                            imperador = datafrase.infos.dinastia
                        }
                        datafrase.infos.dinastia = 1
                    }
                    if (dados >= 2 && dados <= 19) {
                        datafrase.infos.dinastia = datafrase.infos.dinastia * 2
                        writeDataFraseToFile(datafrase)
                        var testopadrao = `Graças ao ${interaction.user} o dinheiro foi duplicado! Agora ele tem ${datafrase.infos.dinastia} JONS`
                    } interaction.channel.send(testopadrao)
                }
                //ÁGUA PURA
                if (roletabobby > 927 && roletabobby <= 930) {
                    embeds.setTitle(`ÁGUA PURA`)
                    embeds.setDescription(`Essa carta irá te dar a água mais pura de todo o mundo! Caso você tenha pego a carta *Dor no RIm* e a sessão ainda não ocorreu, você poderá anular totalmente o dano. (Não acumula)`)
                    embeds.setThumbnail("https://images2.imgbox.com/bb/3c/YGalobRk_o.png")
                }
                //EVENTUALIDADE
                if (roletabobby > 930 && roletabobby <= 934) {
                    embeds.setTitle(`EVENTUALIDADE`)
                    embeds.setDescription(`Essa carta irá te dar uma Sorte Eventual. Com este efeito você terá 25% de chance de receber uma sorte média toda vez que jogar no Risorius`)
                    embeds.setThumbnail("https://images2.imgbox.com/bb/3c/YGalobRk_o.png")
                    adicionarRole(interaction.member, Ids.positivos.Eventualidade, "BFFS")
                }
                //PRIMEIRA ESTACA
                if (roletabobby > 934 && roletabobby <= 940) {
                    embeds.setTitle(`PRIMEIRA ESTACA`)
                    embeds.setDescription(`Essa carta irá te colocar na primeira estaca, tirando todos os seus status e colocando um novo status de sorte aleatório.`)
                    embeds.setThumbnail("https://images2.imgbox.com/bb/3c/YGalobRk_o.png")
                    if (!(user.roles.cache.has(protegidoid))) {
                        TIRARPOSITIVO(user)
                        TIRARNEGATIVO(user)
                    } else {
                        user.roles.remove(protegidoid)
                        interaction.channel.send(`${interaction.user}, Sua proteção se esgotou!`)
                    }
                    const randomItem = RandomEfeitoPositivo("positivo");
                    interaction.member.roles.add(randomItem.id);
                }
                //RENDA EXTRA
                if (roletabobby > 940 && roletabobby <= 946) {
                    embeds.setTitle(`RENDA EXTRA`)
                    embeds.setDescription(`Essa carta vai te dar uma renda extra para sua vida. Você irá ganhar 5k Zens.`)
                    embeds.setThumbnail("https://images2.imgbox.com/45/dd/yNdBaPOt_o.png")
                    aplicarDinheiro(user, 5000, interaction.guild)
                }
                //GRAVIDADE INVERTIDA   
                if (roletabobby > 946 && roletabobby <= 950) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = 900 }
                    if (roletabobby >= 942 && roletabobby <= 950) {
                        embeds.setTitle(`GRAVIDADE INVERTIDA`)
                        embeds.setDescription(`Essa carta irá quebrar a gravidade do servidor por 60 minutos, fazendo com que suas cartas sejam totalmente opostas. Esse evento vai acontecer em 1 minuto...`)
                        embeds.setThumbnail("https://images2.imgbox.com/96/76/OAfyzC4U_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            interaction.channel.send(`@everyone !! Graças ao ${interaction.user} os próximos 60 minutos terão a sorte invertida!`)
                            datafrase.eventos.tipo = "gravidade"
                            writeDataFraseToFile(datafrase)
                            setTimeout(async () => {
                                datafrase.eventos.tipo = "normal"
                                interaction.channel.send(`Tivemos o fim do GRAVIDADE INVERTIDA... Os cientistas finalmente conseguiram arrumar a gravidade do servidor!`)
                                writeDataFraseToFile(datafrase)
                            }, 3600000);
                        }, 30000)
                    }
                }
            }
            //14/16 BENÉVOLA
            if (roletabobby > 750 && roletabobby <= 900) {
                const teste100 = getporce(751, 900)
                embeds.setColor("DarkBlue")
                embeds.setAuthor({ name: `Benévola`, iconURL: "https://images2.imgbox.com/6d/fc/AEsRWlSK_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //OLHOS
                if (roletabobby > 750 && roletabobby <= 760) {
                    embeds.setTitle(`OLHOS`)
                    embeds.setDescription(`Os olhos de Zerlar.`)
                    adicionarRole(interaction.member, Ids.artefatos.Olhos)
                    embeds.setThumbnail("https://images2.imgbox.com/f5/1c/1lbfJ92o_o.png")
                }
                //RAID  
                if (roletabobby > 760 && roletabobby <= 770) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = 800 }
                    if (roletabobby >= 750 && roletabobby <= 751) {
                        embeds.setTitle(`RAID`)
                        embeds.setDescription(`Essa carta irá começar uma RAID, onde um boss aleatório irá surgir no servidor e todos vocês terão que se unir para combater ele! Caso vocês consigam matar o Boss, TODOS do servidor irão ganhar loot! Variando de efeitos, bônus e até artefatos! O dano no boss será contabilizado a cada jogada no Risorius baseado no seu equipamento. Boa sorte! Vocês terão 30 minutos para matar o chefão!`)
                        embeds.setThumbnail("https://images2.imgbox.com/96/76/OAfyzC4U_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            const nomesDosBosses = Object.keys(datafrase.raid.bosses);
                            const indiceAleatorio = Math.floor(Math.random() * nomesDosBosses.length);
                            const nomeBoss = nomesDosBosses[indiceAleatorio];
                            interaction.channel.send(`@everyone !! Uma RAID irá começar! O Boss será o/a **${nomeBoss}**... Boa sorte 😈`)
                            datafrase.eventos.tipo = "raid"
                            datafrase.eventos.chefe = nomeBoss
                            writeDataFraseToFile(datafrase)
                            setTimeout(async () => {
                                for (const bossName in datafrase.raid.bosses) {
                                    const boss = datafrase.raid.bosses[bossName];
                                    if (boss.vida < boss.VidaMax) {
                                        boss.vida = boss.VidaMax;
                                        console.log(`A vida de ${bossName} foi restaurada para ${boss.VidaMax}.`);
                                    }
                                }
                                if (datafrase.raid.resultado == "Vitoria") {
                                    adicionarRoleTodos(interaction.guild, Ids.unicos.Bencao)
                                } else if (datafrase.raid.resultado == "Ruivo") {
                                    adicionarRoleTodos(interaction.guild, Ids.artefatos.Escamas)
                                } else {
                                    adicionarRoleTodos(interaction.guild, Ids.unicos.Maldicao)
                                }
                                await datafrase.raid.resultado == "Neutro"
                                datafrase.eventos.tipo = "normal"
                                interaction.channel.send(`Tivemos o fim de uma raid...`)
                                writeDataFraseToFile(datafrase)
                            }, 1000);
                        }, 30000)
                    }
                }
                //UMBRELA
                if (roletabobby > 770 && roletabobby <= 780) {
                    embeds.setTitle(`UMBRELA`)
                    embeds.setDescription(`Uma umbrela branca com detalhes em azul-marinho, outrora pertencente a uma renomada artesã. Esse artefato fará com que você seja imune a todos os Eventos ruins.`)
                    adicionarRole(interaction.member, Ids.artefatos.Umbrela)
                    embeds.setThumbnail("https://images2.imgbox.com/f5/1c/1lbfJ92o_o.png")
                }
                //QUILLIX
                if (roletabobby > 780 && roletabobby <= 790) {
                    embeds.setTitle(`QUILLIX`)
                    embeds.setDescription(`Uma pena negra envolta por chamas esverdeadas, pertencente a uma criatura obscura. Este artefato concede uma pequena, porém constante, maré de sorte ao seu portador.`)
                    adicionarRole(interaction.member, Ids.artefatos.Quillix)
                    embeds.setThumbnail("https://images2.imgbox.com/f5/1c/1lbfJ92o_o.png")
                }
                //GABRIEX10
                if (roletabobby > 790 && roletabobby <= 805) {
                    embeds.setTitle(`VOLTA EX`)
                    embeds.setDescription(`Essa carta traz a presença do Gabriel, a maior incógnita do mundo, fazendo com que a sua próxima carta tenha sorte 69 ou azar 69`)
                    adicionarRole(interaction.member, Ids.unicos.MeiaNove, "BFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/7a/4e/xKLFDbI2_o.png")
                }
                //COINCIDÊNCIA
                if (roletabobby > 805 && roletabobby <= 820) {
                    embeds.setTitle(`COINCIDÊNCIA`)
                    embeds.setDescription(`Essa carta irá te dar uma sorte minuscula na próxima carta`)
                    adicionarRole(interaction.member, Ids.unicos.Coincidente, "BFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/0a/8f/k7xSyS41_o.png")
                }
                //Rabo de Sorte
                if (roletabobby > 820 && roletabobby <= 830) {
                    embeds.setTitle(`RABO DE SORTE`)
                    embeds.setDescription(`Essa carta traz uma pequena Ventura, te dando uma pequena sorte na próxima carta`)
                    adicionarRole(interaction.member, Ids.unicos.Venturado, "BFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/f5/1c/1lbfJ92o_o.png")
                }
                //LAÇOS DA SORTE
                if (roletabobby > 830 && roletabobby <= 840) {
                    embeds.setTitle(`LAÇOS DA SORTE`)
                    embeds.setDescription(`Essa carta irá criar um laço, fazendo com que você tenha uma sorte compartilhada. Caso alguém caia nessa carta, ela irá jogar 4d4 e o valor que cair será a quantidade de vezes com sorte pequena que serão adicionados. Todos que tiverem o Status de Entrelaçado terão essa sorte, não importando se foi você que aumentou ou não o tempo de duração dela. \nTodos vocês estão ligados pelo destino...`)
                    embeds.setThumbnail("https://images2.imgbox.com/e3/a4/QbItKnVv_o.png")
                    const dados = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
                    interaction.channel.send(`**${dados}**  ⟵ [${dados}] 6d6`);
                    datafrase.infos.laços = dados + datafrase.infos.laços
                    writeDataFraseToFile(datafrase)
                    adicionarRole(interaction.member, Ids.positivos.Entrelacados, "BFFS")
                    setTimeout(() => {
                        interaction.channel.send(`${interaction.user} aumentou a duração dos Laços da sorte em: ${dados} vezes\nAtualmente o valor é de: ${datafrase.infos.laços}`)
                    }, 4000)
                }
                //ESCUDO NULO
                if (roletabobby > 840 && roletabobby <= 850) {
                    embeds.setTitle(`ESCUDO NULO`)
                    embeds.setDescription(`Essa carta irá te dar uma defesa para a próxima carta do tipo que anulam status. Funciona apenas uma vez\n\n(Lunar e Solar são imunes a essa defesa)`)
                    embeds.setThumbnail("https://images2.imgbox.com/74/e6/kxRaroOe_o.png")
                    adicionarRole(interaction.member, Ids.positivos.Protegido, "BFFS")
                }
                //GANHA PÃO
                if (roletabobby > 850 && roletabobby <= 860) {
                    embeds.setTitle(`GANHA PÃO`)
                    embeds.setDescription(`Essa carta vai te dar um pequeno dinheiro para te ajudar. Você irá ganhar 2.5k Zens.`)
                    embeds.setThumbnail("https://images2.imgbox.com/1f/e0/QHUpG8va_o.png")
                    aplicarDinheiro(user, 2500, interaction.guild)
                }
                //COLAPSO GRAVITACIONAL
                if (roletabobby > 860 && roletabobby <= 870) {
                    embeds.setTitle(`COLAPSO GRAVITACIONAL`)
                    embeds.setDescription("˙ɔʇǝ 'ɐpɐunʇɹoɟuı ɐɹɐd ɐןoʌǝ̗uǝq 'opɐoɔıpןɐɯɐ ɐɹɐd opıʇɹǝʌuoɔ ɐ̗ɹǝs ouıʌıp ɯn ɹɐɹıʇ 'ɐɾǝs no 'ɐpıʇɹǝʌuı ɐ̗ɹǝs ɐʇɹɐɔ ɐɯıxo̗ɹd ɐns ∀ ˙ɐpıʇɹǝʌuı ɐɾǝs ǝpɐpıʌɐɹƃ ɐ ǝnb ɯoɔ ɐ̗ɹɐɟ ɐʇɹɐɔ ɐssƎ")
                    embeds.setThumbnail("https://images2.imgbox.com/ed/c4/JIMtv0DR_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Contracao, "BFFS")
                }
                //RAPIDINHO
                if (roletabobby > 870 && roletabobby <= 880) {
                    embeds.setTitle(`VÍCIO VELOZ`)
                    embeds.setDescription(`Essa carta faz com que você seja mais rápido nas cartas. \nO Cooldown do bot para você é diminuido em 1.5x a partir de agora e caso tenha pego algum status de lerdeza, ele será apagado.`)
                    embeds.setThumbnail("https://images2.imgbox.com/e4/22/zCppWMmG_o.png")
                    adicionarRole(interaction.member, Ids.positivos.rapido, "BFFS")
                }
                //SORTE POSITIVA
                if (roletabobby > 880 && roletabobby <= 890) {
                    embeds.setTitle(`SORTE POSITIVA`)
                    embeds.setDescription(`Você quer ter sorte agora ou daqui 5 minutinhos?\n Essa carta irá ter 50% de chance de te dar uma sorte média daqui 5 minutos`)
                    embeds.setThumbnail("https://images2.imgbox.com/1e/df/Ung4ck95_o.png")
                    var chance = Math.floor(Math.random() * 10) + 1;
                    if (chance > 4) {
                        setTimeout(() => {
                            adicionarRole(interaction.member, Ids.unicos.Afortunado, "BFFS")
                        }, 300000);
                    }
                }
                //EQUIPADO E PREPARADO
                if (roletabobby > 890 && roletabobby <= 900) {
                    embeds.setTitle(`EQUIPADO E PREPARADO`)
                    embeds.setDescription(`Essa carta irá dar um equipamento aleatório para você.`)
                    embeds.setThumbnail("https://images2.imgbox.com/1e/df/Ung4ck95_o.png")
                    let equipamento = RandomEfeitoPositivo("equipamento")
                    interaction.member.roles.add(equipamento.id);
                }
            }
            //44 COMUM (300-750)
            if (roletabobby > 300 && roletabobby <= 700) {
                const teste100 = getporce(300, 750)
                embeds.setColor("Grey")
                embeds.setAuthor({ name: `Comum`, iconURL: "https://images2.imgbox.com/fc/a3/OhwSEVlM_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //COTIDIANÁRIO
                if (roletabobby > 300 && roletabobby <= 304) {
                    adicionarRole(interaction.member, Ids.artefatos.Cotidianario)
                    embeds.setTitle(`COTIDIANÁRIO`)
                    embeds.setDescription(`Um pequeno papiro antigo com anotações cotidianas. Esse artefato fará com que todas as suas jogadas tenham maiores chances de cair em raridade Comum.`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                }
                //QUIZ SOBRE MIM?
                if (roletabobby > 304 && roletabobby <= 309) {
                    const NOMESJSON = datafrase.outros.quiz;
                    const quiz = NOMESJSON[Math.floor(Math.random() * NOMESJSON.length)];
                    embeds.setTitle(`QUIZ SOBRE MIM?`)
                    embeds.setDescription(`Essa carta irá dar um quiz aleatório relacionado a CAMPANHAS de RPG do servidor!\n\n ${quiz}`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                }
                //ECHO
                if (roletabobby > 309 && roletabobby <= 318) {
                    embeds.setTitle(`ECHO`)
                    embeds.setDescription(`⟟⟒ ⧉⚯☌⚠ Esta carta irá — CO̸̺̠͚͒͝ ⟒̷̣͖̝̽͐ — CO̵̩͙̐ — PḮ̶͓͇̿ͅ — PI̸̘̙͝ — PI̷̖̻̕̚ — AŔ̸͖̺ — AR̵͔̼̿̈́ — AR̶͙̤̈́ — suas úl͟͞t̵̠̻͉i̵̢̜m̶͍͖͉a̶̢̛̛̬s̴̼͛ 10 tȓ̵̢̮̄a̵͓͝n̴̨͒́ṡ̷͔̄m̶͍̤̍͑i̷̯̒̐s̷̘̳̑s̶̜͚̈́õ̷̦͘e̶̻̟̓s̴͊͜… ☍⚠⟒⧉⟟`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                    const channel = interaction.channel;

                    try {
                        const fetchedMessages = await channel.messages.fetch({ limit: 100 });

                        const userMessages = fetchedMessages
                            .filter(msg => msg.author.id === interaction.user.id)
                            .first(10);

                        if (userMessages.length === 0) {
                            embeds.addFields({ name: "⚠️ Nenhuma transmissão encontrada", value: "Não há mensagens recentes suas neste canal." });
                        } else {
                            const formatted = userMessages.map(msg => {
                                let content = msg.content;

                                if (!content) {
                                    if (msg.attachments.size > 0) content = '[🖼️ Anexo]';
                                    else if (msg.embeds.length > 0) content = '[📎 Embed]';
                                    else if (msg.stickers.size > 0) content = '[✨ Sticker]';
                                    else content = '[Sem conteúdo]';
                                }

                                return `📡 **${msg.createdAt.toLocaleString()}**\n${content}`;
                            }).join('\n\n');

                            embeds.addFields({ name: "🧠 Transmissões captadas:", value: formatted.slice(0, 1024) });
                        }

                    } catch (err) {
                        console.error('Erro ao buscar mensagens:', err);
                        embeds.addFields({ name: "❌ Erro", value: "Falha ao buscar suas transmissões. Os sinais foram perdidos..." });
                    }
                }
                //BISCOITO DA SORTE
                if (roletabobby > 318 && roletabobby <= 327) {
                    const NOMESJSON = datafrase.outros.biscoito;
                    const randombiscoito = NOMESJSON[Math.floor(Math.random() * NOMESJSON.length)];
                    embeds.setTitle(`BISCOITO DA SORTE`)
                    embeds.setDescription(`Essa carta irá te dar uma frase de um biscoito da sorte!\n\n${randombiscoito}`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                }
                //TOME ÁGUA
                if (roletabobby > 327 && roletabobby <= 336) {
                    embeds.setTitle(`TOME ÁGUA`)
                    embeds.setDescription(`Essa carta serve para te lembrar de tomar água! TOMA ÁGUA AGORA!!!`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                }
                //ENVELOPE
                if (roletabobby > 336 && roletabobby <= 345) {
                    embeds.setTitle(`|| ENVELOPADO ||`)
                    embeds.setDescription(`|| Essa carta foi envelopada! Você tem que clicar para rasgar todas essas camadas de envelopes!! ||`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                }
                //NHAM NHAM
                if (roletabobby > 345 && roletabobby <= 354) {
                    embeds.setTitle(`NHAM NHAM!`)
                    embeds.setDescription(`Essa carta irá te mandar uma foto aleatória de comida!`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                    const comidaimagem = dataimagem.risorius.comida;
                    const randomcomida = comidaimagem[Math.floor(Math.random() * comidaimagem.length)];
                    embeds.setImage(randomcomida)
                }
                //OBRIGADO KASANE TETO
                if (roletabobby > 354 && roletabobby <= 363) {
                    embeds.setTitle(`OBRIGADO KASANE TETO!`)
                    embeds.setDescription(`Essa carta irá te lembrar de agradecer a Teto por existir!`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                    const tetoimagem = dataimagem.risorius.teto;
                    const randomteto = tetoimagem[Math.floor(Math.random() * tetoimagem.length)];
                    embeds.setImage(randomteto)
                }
                //NORMALIZATOR
                if (roletabobby > 363 && roletabobby <= 372) {
                    embeds.setTitle(`NORMALIZATOR`)
                    embeds.setDescription(`Essa carta irá fazer com que a sua próxima carta tenha uma chance mediana de ser comum`)
                    embeds.setThumbnail("https://images2.imgbox.com/cb/dd/WM5zB9Gy_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Normalizator)
                }
                //JOGO DE CARTAS
                if (roletabobby > 372 && roletabobby <= 381) {
                    embeds.setTitle(`JOGO DE CARTAS`)
                    embeds.setDescription(`Essa carta irá pegar um desenho de uma carta aleatória do Risorius.`)
                    embeds.setThumbnail("https://images2.imgbox.com/e0/9d/vHZOkLlp_o.png")
                    const CARTAIMAEGEM = dataimagem.risorius.cartas;
                    const randomcarta = CARTAIMAEGEM[Math.floor(Math.random() * CARTAIMAEGEM.length)];
                    embeds.setImage(randomcarta)
                }
                //ITENATOR
                if (roletabobby > 381 && roletabobby <= 390) {
                    embeds.setTitle(`ITENATOR`)
                    const NOMESJSON = datafrase.nomes.itens;
                    const randomitem = NOMESJSON[Math.floor(Math.random() * NOMESJSON.length)];
                    embeds.setDescription(`Essa carta irá buscar um item aleatório de todas as Campanhas de RPG dentro deste Servidor!\n\n${randomitem}`)
                    embeds.setThumbnail("https://images2.imgbox.com/8a/e0/i63K2YnM_o.png")
                }
                //NERDIE
                if (roletabobby > 390 && roletabobby <= 399) {
                    embeds.setTitle(`NERDIE`)
                    embeds.setDescription(`Essa carta irá buscar um travesseiro com uma <3-Waifu-Ɛ> aleatória que com certeza UM NERD teria em seu quarto.`)
                    embeds.setThumbnail("https://images2.imgbox.com/55/23/DleZKmga_o.png")
                    const WAIFUIMAGEM = dataimagem.risorius.paulowaifus;
                    const randomwaifu = WAIFUIMAGEM[Math.floor(Math.random() * WAIFUIMAGEM.length)];
                    embeds.setImage(randomwaifu)
                }
                //ZÉ NINGUÉM
                if (roletabobby > 399 && roletabobby <= 408) {
                    embeds.setTitle(`ZÉ NINGUÉM`)
                    embeds.setDescription(`Essa carta vale absolutamente nada.`)
                    embeds.setThumbnail("https://images2.imgbox.com/38/4d/nCqbpakd_o.png")
                    if (user.roles.cache.has(imaculadoid)) {
                        adicionarRole(interaction.member, Ids.unicos.Bencao, "BFFS")
                    }
                }
                //MUSICAN LETÓRIAN
                if (roletabobby > 408 && roletabobby <= 417) {
                    embeds.setTitle(`MUSICAN LETÓRIAN`)
                    embeds.setDescription(`Essa carta fará uma magia que irá trazer uma playlist aleatória do Spotify.`)
                    embeds.setThumbnail("https://images2.imgbox.com/73/1a/xQO4w8QA_o.png")
                    const PLAYLISTS = datafrase.outros.playlists;
                    const randomplaylist = PLAYLISTS[Math.floor(Math.random() * PLAYLISTS.length)];
                    setTimeout(() => {
                        interaction.channel.send(randomplaylist)
                    }, 4000);
                }
                //DUELO DE LENDAS
                if (roletabobby > 417 && roletabobby <= 426) {
                    embeds.setTitle(`DUELO DAS LENDAS`)
                    embeds.setDescription(`Essa carta irá pegar um personagem aleatório de todas as campanhas e fará ele lutar contra outro personagem. ESCOLHA O MAIS FORTE!!`)
                    embeds.setThumbnail("https://images2.imgbox.com/e2/60/ZHidv4jR_o.png")
                    setTimeout(async () => {
                        const LENDAS = datafrase.nomes.personagens;
                        const duelo1 = LENDAS[Math.floor(Math.random() * LENDAS.length)];
                        const duelo2 = LENDAS[Math.floor(Math.random() * LENDAS.length)];
                        const infoddoduelo = datafrase.outros.batalhas;
                        const infoduelo = infoddoduelo[Math.floor(Math.random() * infoddoduelo.length)];
                        const DUELO = new EmbedBuilder()
                            .setColor("Random")
                            .setTitle(`HORA DO DUELO!`)
                            .setThumbnail("https://images2.imgbox.com/e2/60/ZHidv4jR_o.png")
                            .addFields(
                                { name: "Duelo:", value: `${duelo1} VS ${duelo2}` },
                                { name: "Combate:", value: `${infoduelo}` }
                            );
                        const botao1 = new ButtonBuilder()
                            .setCustomId('voto1')
                            .setLabel(duelo1)
                            .setStyle(ButtonStyle.Primary);

                        const botao2 = new ButtonBuilder()
                            .setCustomId('voto2')
                            .setLabel(duelo2)
                            .setStyle(ButtonStyle.Danger);

                        const botoes = new ActionRowBuilder().addComponents(botao1, botao2);
                        const mensagem = await interaction.channel.send({ embeds: [DUELO], components: [botoes] });
                        const votos = { duelo1: 0, duelo2: 0 };
                        const collector = mensagem.createMessageComponentCollector({ filter: i => i.customId === 'voto1' || i.customId === 'voto2', time: 30000 });
                        collector.on('collect', async i => {
                            if (i.customId === 'voto1') votos.duelo1++;
                            if (i.customId === 'voto2') votos.duelo2++;

                            await i.reply({ content: `Você votou em **${i.customId === 'voto1' ? duelo1 : duelo2}**!`, ephemeral: true });
                        });

                        collector.on('end', () => {
                            let resultado;
                            if (votos.duelo1 > votos.duelo2) {
                                resultado = `🏆 **${duelo1}** venceu com ${votos.duelo1} votos!`;
                            } else if (votos.duelo1 < votos.duelo2) {
                                resultado = `🏆 **${duelo2}** venceu com ${votos.duelo2} votos!`;
                            } else {
                                resultado = `🤝 Empate entre **${duelo1}** e **${duelo2}**!`;
                            }

                            DUELO.addFields({ name: "Resultado Final", value: resultado });
                            mensagem.edit({ embeds: [DUELO], components: [] });
                        });
                    }, 3000);
                }
                //MAGIA DOS MEMES
                if (roletabobby > 426 && roletabobby <= 435) {
                    embeds.setTitle("MEMEN ALEATÓRION")
                    embeds.setDescription("Essa carta lança uma magia que faz um meme aleatório")
                    embeds.setThumbnail("https://images2.imgbox.com/9c/47/NwK4NhNi_o.png")
                    const memeimagem = dataimagem.imagens.memes;
                    const randommeme = memeimagem[Math.floor(Math.random() * memeimagem.length)];
                    embeds.setImage(randommeme)
                }
                //PIETRO LUDWIG BULLYWUG II
                if (roletabobby > 435 && roletabobby <= 444) {
                    embeds.setTitle("PIETRO LUDWIG BULLYWUG II")
                    datafrase.dados.pietrosapo++
                    writeDataFraseToFile(datafrase)
                    embeds.setDescription("Essa carta irá te lembrar de que o Pietro, em algum lugar, é um sapo.")
                    embeds.setThumbnail("https://images2.imgbox.com/46/e0/0Gf5o4qP_o.png")
                }
                //HATSUNE MIKU
                if (roletabobby > 444 && roletabobby <= 453) {
                    datafrase.dados.hatsune++
                    writeDataFraseToFile(datafrase)
                    embeds.setTitle("HATSUNE MIKU")
                    embeds.setDescription("Essa carta irá te lembrar de que a Hatsune Miku existe e que você deve agradecer que ela existe no mesmo mundo que você.")
                    embeds.setThumbnail("https://images2.imgbox.com/84/bb/1qd4sntW_o.png")
                    const suneimagem = dataimagem.risorius.miku;
                    const randomsune = suneimagem[Math.floor(Math.random() * suneimagem.length)];
                    embeds.setImage(randomsune)
                }
                //PLAYMEMER
                if (roletabobby > 453 && roletabobby <= 462) {
                    embeds.setTitle("PLAYMEMER")
                    embeds.setDescription("Essa carta serve para zoar com a cara dos jogadores, lançando um meme aleatório das campanhas.")
                    embeds.setThumbnail("https://images2.imgbox.com/ad/4f/nnxnqeQq_o.png")
                    const playersmemes = dataimagem.risorius.memesplayers;
                    const randommemeplayers = playersmemes[Math.floor(Math.random() * playersmemes.length)];
                    embeds.setImage(randommemeplayers)
                }
                //LOCALIZATOR
                if (roletabobby > 462 && roletabobby <= 471) {
                    embeds.setTitle(`LOCALIZATOR`)
                    const locais = datafrase.nomes.Localizator;
                    const localrandom = locais[Math.floor(Math.random() * locais.length)];
                    embeds.setDescription(`Essa carta irá puxar um dispositivo localizador e pegar uma localização aleatória que os players estiveram durante as sessões de RPG!\n\n${localrandom}`)
                    embeds.setThumbnail("https://images2.imgbox.com/f5/44/m1CmFWNG_o.png")
                }
                //ANIMAIS FOFOS
                if (roletabobby > 471 && roletabobby <= 480) {
                    embeds.setTitle("AI CUTI CUTI")
                    embeds.setDescription("Essa carta irá te dar uma imagem aleatória de um animal fofo.")
                    embeds.setThumbnail("https://images2.imgbox.com/9f/ed/Ape1ssWO_o.png")
                    const animais = dataimagem.imagens.animais;
                    const randomanimais = animais[Math.floor(Math.random() * animais.length)];
                    embeds.setImage(randomanimais)
                }
                //PALAVRAO
                if (roletabobby > 480 && roletabobby <= 489) {
                    embeds.setTitle("PALAVRÃO")
                    const palavrao = datafrase.outros.palavrao;
                    const randompalavrao = palavrao[Math.floor(Math.random() * palavrao.length)];
                    embeds.setDescription(`Essa carta irá te dar um PALAVRÃO!\n\n${randompalavrao}`)
                    embeds.setThumbnail("https://images2.imgbox.com/ae/03/j8cOmUb8_o.png")
                }
                //MALDI-ÇO-NAR
                if (roletabobby > 489 && roletabobby <= 499) {
                    embeds.setTitle("MALDI-ÇO-NAR")
                    const maldiconar = dataimagem.risorius.maldiçonar;
                    const randommaldi = maldiconar[Math.floor(Math.random() * maldiconar.length)];
                    embeds.setDescription(`Essa carta irá lançar uma maldição aleatória no universo de Noite Escura!`)
                    embeds.setThumbnail("https://images2.imgbox.com/eb/29/8LG0w5GP_o.png")
                    embeds.setImage(randommaldi)
                }
                //LINHA DO EQUADOR
                if (roletabobby > 499 && roletabobby <= 500) {
                    embeds.setTitle("LINHA DO EQUADOR")
                    embeds.setDescription("Parabêns! Você tropeçou na Linha do Equador! Você chegou no meio TOTAL de tudo do Risorius!!")
                    embeds.setThumbnail("https://images2.imgbox.com/ae/3d/4VcQTjMJ_o.png")
                }
                //TOKENATOR
                if (roletabobby > 500 && roletabobby <= 507) {
                    embeds.setTitle("TOKENATOR")
                    const token = dataimagem.risorius.tokens;
                    const randomtoken = token[Math.floor(Math.random() * token.length)];
                    embeds.setDescription(`Essa carta irá lançar um ritual que irá trazer um Token aleatório de todas as campanhas!`)
                    embeds.setThumbnail("https://images2.imgbox.com/fe/88/F0rcIljP_o.png")
                    embeds.setImage(randomtoken)
                }
                //CASAL DO ANO
                if (roletabobby > 507 && roletabobby <= 516) {
                    embeds.setTitle("CASAIS DO ANO")
                    embeds.setDescription("Essa carta traz uma imagem aleatória dos ships que existem para lembrar dos maiores casais que já existiram.")
                    embeds.setThumbnail("https://images2.imgbox.com/5e/da/TnuhISjW_o.png");
                    const ships = dataimagem.risorius.ships;
                    const randomship = ships[Math.floor(Math.random() * ships.length)];
                    embeds.setImage(randomship)
                }
                //PERSONAGEM ALEATÓRIO
                if (roletabobby > 516 && roletabobby <= 525) {
                    embeds.setTitle("FIGURA MISTERIOSA")
                    embeds.setDescription("Essa carta serve para deixar registrado a existência de cada ser. Ela irá trazer um personagem aleatório de uma das campanhas feitas até agora.")
                    embeds.setThumbnail("https://images2.imgbox.com/64/f2/z1yOcYWg_o.png");
                    const figuras = dataimagem.risorius.figura;
                    const randomfigura = figuras[Math.floor(Math.random() * figuras.length)];
                    embeds.setImage(randomfigura)
                }
                //CARTA PEQUENA
                if (roletabobby > 525 && roletabobby <= 534) {
                    embeds.setTitle("ᵐᶦⁿᶦ ᶜᵃʳᵗᵃ")
                    embeds.setDescription("ᴱˢˢᵃ ᶜᵃʳᵗᵃ ᵉ́ ᵐᵘᶦᵗᵒ ᵖᵉᑫᵘᵉⁿᵃ")
                    embeds.setThumbnail("https://images2.imgbox.com/ae/3d/4VcQTjMJ_o.png")
                }
                //CARTA BONITA
                if (roletabobby > 534 && roletabobby <= 543) {
                    embeds.setTitle("𝕮𝖆𝖗𝖙𝖆 𝕭𝖔𝖓𝖎𝖙𝖆")
                    embeds.setDescription("𝕰𝖘𝖘𝖆 𝖈𝖆𝖗𝖙𝖆 𝖊́ 𝖒𝖚𝖎𝖙𝖔 𝖇𝖔𝖓𝖎𝖙𝖆!")
                    embeds.setThumbnail("https://images2.imgbox.com/15/e2/VocL118D_o.png")
                }
                //CARTA GIGANTE
                if (roletabobby > 543 && roletabobby <= 552) {
                    embeds.setTitle("𝐂 𝐀 𝐑 𝐓 𝐀  𝐆 𝐈 𝐆 𝐀 𝐍 𝐓 𝐄")
                    embeds.setDescription("𝐄\n𝐒\n𝐒\n𝐀\n\n𝐂\n𝐀\n𝐑\n𝐓\n𝐀\n\n𝐄́\n\n𝐌\n𝐔\n𝐈\n𝐓\n𝐎\n\n𝐆\n𝐈\n𝐆\n𝐀\n𝐍\n𝐓\n𝐄")
                    embeds.setThumbnail("https://images2.imgbox.com/fc/a3/OhwSEVlM_o.png")
                }
                //LEITURA MOMENTO
                if (roletabobby > 552 && roletabobby <= 561) {
                    embeds.setTitle("LEITURA MOMENTO")
                    embeds.setDescription("Essa carta irá magicamente te dar um documento aleatório de todas as campanhas. Hora de Refrescar a lore😉")
                    embeds.setThumbnail("https://images2.imgbox.com/36/f1/5LRCNsVC_o.png")
                    const documentos = dataimagem.imagens.documentos;
                    const randomdocumento = documentos[Math.floor(Math.random() * documentos.length)];
                    embeds.setImage(randomdocumento)
                }
                //ADOÇÃO DE PSEUDÔNIMO
                if (roletabobby > 561 && roletabobby <= 570) {
                    if (user.roles.cache.has(ADM)) {
                        roletabobby = 299
                    }
                    if (roletabobby > 554 && roletabobby <= 569) {
                        embeds.setTitle("ADOÇÃO DE PSEUDÔNIMO")
                        embeds.setDescription("Essa carta irá mudar o seu nome no servidor para algum aleatório.")
                        const nomes = datafrase.nomes.personagens;
                        const randmnomes = nomes[Math.floor(Math.random() * nomes.length)];
                        interaction.member.setNickname(randmnomes);
                        embeds.setThumbnail("https://images2.imgbox.com/3c/8d/zIssOdOA_o.png")
                    }
                }
                //EXAME MÉDICO
                if (roletabobby > 570 && roletabobby <= 579) {
                    embeds.setTitle("EXAME MÉDICO")
                    const exame = datafrase.outros.exames;
                    const randomexame = exame[Math.floor(Math.random() * exame.length)];
                    embeds.setDescription(`Essa carta irá chamar um doutor muito famoso do Distrito 3 de Daimonas, Doutor Tasheco. Ele irá te examinar, e dizer qual doença você tem:\n\n-Acredito que você tenha ${randomexame}`)
                    embeds.setThumbnail("https://images2.imgbox.com/66/a3/KfDQ7vY2_o.png")
                }
                //O MAIS HONRADO
                if (roletabobby > 579 && roletabobby <= 588) {
                    embeds.setTitle("O MAIS HONRADO")
                    embeds.setDescription(`Essa carta irá trazer o mais <honrado> para o servidor`)
                    embeds.setThumbnail("https://images2.imgbox.com/66/a3/KfDQ7vY2_o.png")
                    embeds.setImage("https://cdn.discordapp.com/attachments/1142623385944334449/1276248554121199809/O_MAIS_HONRADO.png?ex=66e68056&is=66e52ed6&hm=a0c31a5d4770388b25689967456ebe154e7dbaba6989224b558297bbd9df61f1&")
                }
                //CHAPÉU DE TARTARUGA
                if (roletabobby > 588 && roletabobby <= 597) {
                    embeds.setTitle("CHAPÉU DE TARTARUGA")
                    embeds.setDescription("Essa carta irá mostrar uma página aleatória da tão famosa HQ Chapéu de Tartaruga.")
                    embeds.setThumbnail("https://images2.imgbox.com/12/2e/SWKWnVUg_o.png")
                    const hqchapeu = dataimagem.risorius.chapeu;
                    const randomhq = hqchapeu[Math.floor(Math.random() * hqchapeu.length)];
                    embeds.setImage(randomhq)
                }
                //CATALISADORES
                if (roletabobby > 597 && roletabobby <= 606) {
                    embeds.setTitle("CATALISADORES")
                    embeds.setDescription("Essa carta irá trazer um traço de um dos catalisadores do universo de Ordem.")
                    embeds.setThumbnail("https://images2.imgbox.com/82/37/3os6oWhx_o.png")
                    const catalisadores = dataimagem.risorius.catalisadores;
                    const randomcata = catalisadores[Math.floor(Math.random() * catalisadores.length)];
                    embeds.setImage(randomcata)
                }
                //DADOS BANCÁRIOS
                if (roletabobby > 606 && roletabobby <= 615) {
                    embeds.setTitle("DADOS BANCÁRIOS")
                    embeds.setDescription(`Essa carta irá atrás de todos os dados bancários dos membros do servidor e deixar eles públicos!`)
                    embeds.setThumbnail("https://images2.imgbox.com/66/a3/KfDQ7vY2_o.png")
                    const dinheiroList = Object.entries(datadinheiro.DINHEIRO)
                        .map(([nome, valor]) => ({
                            nome: nome,
                            valor: valor
                        }))
                        .sort((a, b) => b.valor - a.valor);
                    const embedDinheiro = new EmbedBuilder()
                        .setColor("Gold")
                        .setTitle("💰 DADOS BANCÁRIOS 💰")
                        .setDescription("Os saldos dos membros do servidor foram vazados!")
                        .addFields(
                            dinheiroList.map(item => ({
                                name: item.nome,
                                value: `💵 **${item.valor}**`,
                                inline: true
                            }))
                        )
                        .setFooter({ text: "Isso pode causar brigas hein!😜" });
                    setTimeout(() => {
                        interaction.channel.send({ embeds: [embedDinheiro] });
                    }, 2000);
                }
                //EX-CHEFES
                if (roletabobby > 615 && roletabobby <= 624) {
                    embeds.setTitle("MEU EX CHEFE")
                    embeds.setDescription("Essa carta irá trazer algum chefe aleatório que foi morto durante as campanhas do servidor!")
                    embeds.setThumbnail("https://images2.imgbox.com/cf/f8/gMoVdy7w_o.png")
                    const boss = dataimagem.risorius.chefes;
                    const randomboss = boss[Math.floor(Math.random() * boss.length)];
                    embeds.setImage(randomboss)
                }
                //FRASERNATOR
                if (roletabobby > 624 && roletabobby <= 633) {
                    const { frasenator } = datafrase;
                    const { outros, copulativo, adjetivos, acoes, objetos } = frasenator;

                    embeds.setTitle("FRASERNATOR");
                    embeds.setDescription(`Essa carta irá criar uma frase aleatória com o SEU nome!`);
                    embeds.setThumbnail("https://images2.imgbox.com/a8/c8/JP0reC55_o.png");

                    function escolherAleatorio(lista) {
                        return lista[Math.floor(Math.random() * lista.length)];
                    }

                    function definirArtigo(palavra) {
                        const terminaEm = palavra.slice(-1);
                        return ["a", "l", ")", "m"].includes(terminaEm) ? "uma" : "um";
                    }

                    let frase = "";
                    let chance = Math.random() * 20;

                    if (chance <= 10) {
                        frase += escolherAleatorio(acoes);
                        if (Math.random() * 20 <= 14) {
                            const objeto = escolherAleatorio(objetos);
                            frase += ` ${escolherAleatorio(outros)} ${definirArtigo(objeto)} ${objeto}`;
                            if (Math.random() * 20 <= 14) {
                                frase += ` ${escolherAleatorio(adjetivos)}`;
                            }
                        }
                    } else {
                        frase += escolherAleatorio(copulativo);
                        if (Math.random() * 20 <= 6) {
                            frase += ` ${escolherAleatorio(adjetivos)}`;
                        } else {
                            const objeto = escolherAleatorio(objetos);
                            frase += ` ${escolherAleatorio(outros)} ${definirArtigo(objeto)} ${objeto}`;
                        }
                    }

                    interaction.channel.send(`<@${interaction.user.id}> ${frase}`);
                }
                //SUSSURROS HISTÓRICOS
                if (roletabobby > 633 && roletabobby <= 652) {
                    embeds.setTitle("SUSSURROS HISTÓRICOS")
                    embeds.setDescription("Essa carta irá sussurrar para você um conto de uma das sessões de RPG dentro deste servidor!")
                    embeds.setThumbnail("https://images2.imgbox.com/9a/53/lPKMWJ37_o.png")
                    const frasesbobby = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).sussurros;
                    const randomIndex = Math.floor(Math.random() * frasesbobby.length);
                    let randomMeme = "."
                    let imagem = "."
                    if (randomIndex == 0) {
                        const random = frasesbobby[randomIndex].EMPIREO
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/c9/61/D0xuAP00_o.png"
                    }
                    if (randomIndex == 1) {
                        const random = frasesbobby[randomIndex].EDFU
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/7f/82/0s1UlP5q_o.png"
                    }
                    if (randomIndex == 2) {
                        const random = frasesbobby[randomIndex].NOITEESCURA
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/a1/46/xkfejCBm_o.png"
                    }
                    if (randomIndex == 3) {
                        const random = frasesbobby[randomIndex].AFANO
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/4a/1e/jZ4jAfgH_o.png"
                    }
                    if (randomIndex == 4) {
                        const random = frasesbobby[randomIndex].TROPICAL
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/80/f4/ZuEe2Pve_o.png"
                    }
                    if (randomIndex == 5) {
                        const random = frasesbobby[randomIndex].THANATOS
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/40/b1/zwuJIKfb_o.png"
                    }
                    if (randomIndex == 6) {
                        const random = frasesbobby[randomIndex].SOLARENS
                        randomMeme = random[Math.floor(Math.random() * random.length)];
                        imagem = "https://images2.imgbox.com/b6/52/q7Nf0vdh_o.png"
                    }
                    const frases = "*sussurros...*\n\n\n" + "# " + randomMeme
                    interaction.user.send({
                        content: frases,
                        files: [{ attachment: imagem }]
                    })
                }
                //PADRÃOZINHO
                if (roletabobby > 652 && roletabobby <= 661) {
                    embeds.setTitle(`PADRÃOZINHO`)
                    embeds.setDescription(`Essa carta mostra o quão padrão você é na visão do Bobby. Você é tão padrão que ele vai fazer a sua próxima carta ser uma comum garantido.`)
                    embeds.setThumbnail("https://images2.imgbox.com/c3/08/EOYDhOEk_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Padraozinho)
                };
                //PRESS F TO PAY RESPECTS
                if (roletabobby > 661 && roletabobby <= 670) {
                    embeds.setTitle(`PRESS F TO PAY RESPECTS`)
                    const morto = datafrase.outros.Mortos;
                    const randommorto = morto[Math.floor(Math.random() * morto.length)];
                    embeds.setDescription(`Todos falam que eu não me importo, mas na verdade, me importo sim, afinal, esses mortos fedem mais que o teu banheiro HAHAHHAHA. Essa carta irá citar um personagem aleatório das campanhas que infelizmente veio a falecer... \n\nDeixe seu F para ${randommorto}`)
                    embeds.setThumbnail("https://images2.imgbox.com/1f/ca/4DEu6rR5_o.png")
                }
                //INIMIGOS DE PAIXÃO
                if (roletabobby > 670 && roletabobby <= 679) {
                    embeds.setTitle("INIMIGOS DE PAIXÃO")
                    embeds.setDescription("Essa carta irá trazer algum inimigo aleatório que teve nas campanhas deste servidor!")
                    embeds.setThumbnail("https://images2.imgbox.com/0e/be/BwDNqG4R_o.png")
                    const inimigo = dataimagem.risorius.inimigospixao;
                    const randominimigo = inimigo[Math.floor(Math.random() * inimigo.length)];
                    embeds.setImage(randominimigo)
                }
                //AUDIENCIA DO SHOW
                if (roletabobby > 679 && roletabobby <= 700) {
                    embeds.setTitle("AUDIÊNCIA DO JOGO")
                    embeds.setDescription(`Essa carta mostra os dados atuais do jogo do Risorius. As risadas sempre serão o melhor remédio!\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━∎\n∎Vezes Usado: ${datafrase.dados.usos}\n\n∎Cartas Totais: ${totalcartas}\n\n∎Status Totais: ${datafrase.dados.statustotais}\n\n∎Eventos iniciados: ${datafrase.dados.cartastipoevento}\n\n∎Cartas Heresia Pegas: ${datafrase.dados.heresia}\n\n∎Cartas Comuns Pegas: ${datafrase.dados.CartasComunsPegas}\n\n∎Cartas Positivas Pegas: ${datafrase.dados.cartaspositivaspegas}\n\n∎Cartas Negativas Pegas: ${datafrase.dados.cartasnegativaspegas}\n\n∎Cartas Ancestrais Pegas: ${datafrase.dados.heresia}\n\n∎Estrelas Cadentes vistas: ${datafrase.dados.estrelas}\n\n∎Vezes que Foram Banidos: ${datafrase.dados.banidos}\n\n∎Vezes que Perderam Itens: ${datafrase.dados.perderiten}\n\n∎Vezes que Ganharam Itens: ${datafrase.dados.ganhariten}\n\n∎Vezes que Ficaram de Castigo: ${datafrase.dados.castigo}\n\n∎Vezes que Lunar/Solar Foram Pegos: ${datafrase.dados.lunarsolar}\n\n∎Vezes que Lembramos do Pietro Sapo: ${datafrase.dados.pietrosapo}\n\n∎Vezes que a Maldição do Caos Foi Pega: ${datafrase.dados.bobby}\n\n∎Vezes Que Copiaram uma | atraC moc ohlepsE: ${datafrase.dados.espelho}\n\n∎Vezes que Roubaram Status de Outro Jogador: ${datafrase.dados.roubos}\n\n∎Vezes que Pegaram os Valores de Dragão/Cofre: ${datafrase.dados.cofredragao}\n\n∎Vezes que Lembramos de Agradecer a Hatsune Miku: ${datafrase.dados.hatsune}\n┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━∎`)
                    embeds.setThumbnail("https://images2.imgbox.com/04/7d/TRAuvCq5_o.png")
                }
            }
            //3 HERESIA (701-750)
            if (roletabobby > 700 && roletabobby <= 750) {
                if (user.roles.cache.has(divinoid) || user.roles.cache.has(fardoid)) {
                    const teste100 = getporce(701, 750)
                    embeds.setColor("DarkPurple")
                    embeds.setAuthor({ name: `Heresia`, iconURL: "https://htmlcolorcodes.com/assets/images/colors/dark-purple-color-solid-background-1920x1080.png" })
                    embeds.setFooter({ text: `Chance: ${teste100}%` });
                    datafrase.dados.heresia++
                    writeDataFraseToFile(datafrase)
                    //PAREGRINAÇÃO
                    if (roletabobby > 700 && roletabobby <= 716) {
                        embeds.setTitle(`Peregrinação`)
                        embeds.setDescription(`Eu não acredito mais em você.. Você é uma farsa e tudo o que você fez para mim?.\nEssa carta faz com que você troque solar por lunar e vice versa.`)
                        embeds.setThumbnail("https://images2.imgbox.com/a6/fa/TrFWEW8t_o.png")
                        if (user.roles.cache.has(divinoid)) {
                            user.roles.remove(divinoid);
                            interaction.member.roles.add(fardoid);
                        }
                        if (user.roles.cache.has(fardoid)) {
                            user.roles.remove(fardoid);
                            interaction.member.roles.add(divinoid);
                        }
                    }
                    //Apostasia
                    if (roletabobby > 716 && roletabobby <= 732) {
                        embeds.setTitle(`Apostasia`)
                        embeds.setDescription(`Um afastamento definitivo daquilo que você foi marcado.\nEssa carta faz com que você abandone a marca de uma entidade presa a você, perdendo status de Divino ou Fadado.`)
                        embeds.setThumbnail("https://images2.imgbox.com/89/ae/AFQEgsmT_o.png")
                        await user.roles.remove(divinoid);
                        await user.roles.remove(fardoid)
                    }
                    //ANCESTRALIDADE
                    if (roletabobby > 732 && roletabobby <= 750) {
                        embeds.setTitle(`Ancestralidade`)
                        embeds.setDescription(`Um conhecimento do passado que formou esse mundo.\nEssa carta faz com que você tenha mais sorte para conseguir cartas Ancestrais.`)
                        embeds.setThumbnail("https://images2.imgbox.com/3e/1c/isjICcHg_o.png")
                        adicionarRole(interaction.member, Ids.positivos.ancestralidade, "BFFS")
                    }

                } else { roletabobby = 299 - Math.floor(Math.random() * 100) + 1 }
            }
            //11/16 Inoportuna (100-299)
            if (roletabobby > 100 && roletabobby <= 299) {
                const teste100 = getporce(100, 299)
                embeds.setColor("DarkerGrey")
                embeds.setAuthor({ name: `Inoportuna`, iconURL: "https://images2.imgbox.com/82/79/wDFgjRpT_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //FALTA DE PREPARO
                if (roletabobby > 100 && roletabobby <= 130) {
                    embeds.setTitle(`FALTA DE PREPARO`)
                    embeds.setDescription(`Essa carta irá te lembrar que você é um vagabundo e que esqueceu de se preparar direito pro combate! Ela irá pagar todos os seus equipamentos.`)
                    embeds.setThumbnail("https://images2.imgbox.com/1e/df/Ung4ck95_o.png")
                    TIRAREQUIPAMENTO(user)
                }
                //DÍVIDAS
                if (roletabobby > 130 && roletabobby <= 150) {
                    embeds.setTitle(`DÍVIDAS`)
                    embeds.setDescription(`Essa carta vai te cobrar os 2k de Zens que você está devendo.`)
                    embeds.setThumbnail("https://images2.imgbox.com/1f/e0/QHUpG8va_o.png")
                    aplicarDinheiro(user, -2500, interaction.guild)
                }
                //AZAR POSITIVO
                if (roletabobby > 150 && roletabobby <= 170) {
                    embeds.setTitle(`AZAR POSITIVO`)
                    embeds.setDescription(`Você quer ter azar agora ou daqui 5 minutinhos?\n\n Essa carta irá ter 50% de chance de te dar um azar médio daqui 5 minutos`)
                    var chance = Math.floor(Math.random() * 10) + 1;
                    embeds.setThumbnail("https://images2.imgbox.com/03/22/Y1r3k5NL_o.png")
                    if (chance > 4) {
                        setTimeout(() => {
                            adicionarRole(interaction.member, Ids.unicos.Infortuna, "WFFS")
                        }, 300000);
                    }
                }
                //INCONVENIENTE
                if (roletabobby > 170 && roletabobby <= 190) {
                    embeds.setTitle(`INCONVENIÊNCIA`)
                    embeds.setDescription(`Essa carta traz uma pequena inconveniência para você, te dando azar minusculo na próxima carta`)
                    adicionarRole(interaction.member, Ids.unicos.Inconveniente, "WFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/ba/ba/YnRWv6fQ_o.png")
                }
                //ÂNCORA MÁGICA
                if (roletabobby > 190 && roletabobby <= 200) {
                    embeds.setTitle(`ÂNCORA DOURADA`)
                    embeds.setDescription(`Uma âncora de um antigo capitão de um návio apagado pelos mares. Esse artefato faz com que você tenha um azar constante em todas as suas jogadas.`)
                    embeds.setThumbnail("https://images2.imgbox.com/4b/0c/IjYtdrSu_o.png")
                    adicionarRole(interaction.member, Ids.artefatos.Ancora)
                }
                // GIGAMERON
                if (roletabobby > 200 && roletabobby <= 210) {
                    embeds.setTitle("GIGAMERON");
                    embeds.setDescription("Essa carta irá lançar uma magia que solta uma bomba numérica no canal, com números que crescem, diminuem, se repetem e vão se distorcendo com o tempo!");
                    embeds.setThumbnail("https://images2.imgbox.com/54/27/xiPpnxZw_o.png");
                    interaction.channel.send({ embeds: [embeds] });
                    const channel = interaction.client.channels.cache.get("1223006309025321080");
                    let valor = Math.floor(Math.random() * 9) + 1;
                    let multi = valor.toString();
                    let message = await channel.send(`${valor}`);
                    let tempo = Math.floor(Math.random() * 500) + 200;
                    let alternaCrescimento = Math.random() > 0.5;
                    let repeteValor = Math.random() > 0.7;
                    for (let i = 0; i < 1500; i++) {
                        if (alternaCrescimento) {
                            let novoValor = Math.floor(Math.random() * 10) + 1;
                            multi += novoValor;
                        } else {
                            if (multi.length > 1) {
                                multi = multi.slice(0, multi.length - 1);
                            }
                        }
                        if (repeteValor) {
                            multi = `${multi}${multi[multi.length - 1]}`;
                        }
                        tempo = Math.floor(Math.random() * 500) + 200;
                        await message.edit(multi);
                        await new Promise(resolve => setTimeout(resolve, tempo));
                    }
                    return;
                }
                //AZARADO
                if (roletabobby > 210 && roletabobby <= 230) {
                    embeds.setTitle(`AZAR DA VIDA`)
                    embeds.setDescription(`Essa carta faz com que todo aquele pequeno azar que você tem em dias comuns seja acumulado tudo na sua próxima carta, fazendo com que a sua próxima carta tenha um pequeno Azar`)
                    embeds.setThumbnail("https://images2.imgbox.com/5a/eb/eMhmYI6i_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Azarado, "WFFS")
                }
                //CASTIGO NO CANTO DA SALA
                if (roletabobby > 230 && roletabobby <= 240 && botModo.modo == "Sessão") {
                    if (user.roles.cache.has(ADM)) {
                        roletabobby = 299
                    }
                }
                if (roletabobby > 230 && roletabobby <= 240) {
                    embeds.setTitle(`CASTIGO NO CANTO DA SALA`)
                    embeds.setDescription(`Essa carta faz com que você fique de castigo por 5 minutos. Espero que se comporte na próxima vez ein mocinho!!`)
                    embeds.setThumbnail("https://images2.imgbox.com/09/d5/Vkw6AnJ9_o.png")
                    datafrase.dados.castigo++
                    setTimeout(async () => {
                        await user.timeout(300000, `Você está de castigo por se comportar extremamente mal! Devido a esse mal comportamento, você irá ficar no cantinho da sala bem quietinho até eu (Bobby) deixar sair em 5 minutos :D`)
                    }, 4000)
                }
                //NINHO DO DRAGÃO CINZENTO
                if (roletabobby > 240 && roletabobby <= 260) {
                    embeds.setTitle(`NINHO DO DRAGÃO CINZENTO`)
                    embeds.setDescription(`Essa carta te leva para o ninho do Dragão Cinzento... CUIDADO!! Ele está dormindo, então não pegue os pontos de perigo...\nEssa carta irá rolar 1d20, tendo essas opções:\n\n-Caso caia 1 você irá receber todos os pontos de perigo e resetar os valor de perigo\n-Caso caia valores maiores que 1 e menores que 20, você irá dobrar os pontos de perigo\n-Caso caia 20, você irá resetar os valores de perigo para 1\n\nCaso você pegue os valores de perigo, o dragão irá acordar e te assustar, fazendo com que sua próxima carta tenha um azar definido pela quantidade de perigo que você pegou (quanto mais, maior o azar e o susto, claro)\n\nNível de perigo atual: ${ninho}`)
                    embeds.setThumbnail("https://images2.imgbox.com/36/3c/IVRJEND3_o.png")
                    const dados = Math.floor(Math.random() * 20) + 1;
                    interaction.channel.send(`**${dados}**  ⟵ [${dados}] 1d20`);
                    if (dados == 1) {
                        datafrase.dados.cofredragao++
                        var testopadrao = `A pessoa que acordou o dragão foi ${interaction.user}! Mas não se preocupem, ele já voltou a dormir...`
                        interaction.member.roles.add(assustadoid);
                    }
                    if (dados == 20) {
                        var testopadrao = `A pessoa que derrotou o dragão foi ${interaction.user}. Porém cuidado! O filho do dragão voltou e o nível de perigo desceu para 1!`
                        datafrase.infos.ninho = 1
                    }
                    if (dados >= 2 && dados <= 19) {
                        datafrase.infos.ninho = datafrase.infos.ninho * 2
                        ninho = datafrase.infos.ninho
                        var testopadrao = `O ${interaction.user} conseguiu passar pelo dragão, porém o nível de perigo aumentou para ${ninho}`
                    }
                    setTimeout(() => {
                        interaction.channel.send(testopadrao)
                    }, 5000)
                };
                //LERDOU
                if (roletabobby > 260 && roletabobby <= 280) {
                    embeds.setTitle(`LERDOU`)
                    embeds.setDescription(`Essa carta faz com que você seja mais lento nas cartas. O Cooldown do bot para você é aumentado em 1.5x a partir de agora e caso tenha pego algum status de velocidade, ele será apagado.`)
                    embeds.setThumbnail("https://images2.imgbox.com/2d/60/skM4uoRA_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Lerdo, "WFFS")
                }
                //EU SEI UMA PIADA BOA
                if (roletabobby > 280 && roletabobby <= 299) {
                    embeds.setTitle(`EU SEI UMA PIADA BOA`)
                    embeds.setDescription(`Eu HAHAHAHAHA eu HAHAHAHAHAH sei uma piada HAHAHAHAHHA muito boa. \nEssa carta irá rir da piada que você é.`)
                    embeds.setThumbnail("https://images2.imgbox.com/30/ca/ORsrkleE_o.png")
                    var texto = "HA"
                    const mensagem = await interaction.user.send(`${texto}`)
                    for (var i = 0; i < 900; i++) {
                        texto = texto + "HA"
                        mensagem.edit(`${texto}`)
                    }
                }

            }
            //13 LAMENTÁVEL (50-99)
            if (roletabobby > 50 && roletabobby <= 99) {
                const teste100 = getporce(50, 99)
                embeds.setColor("DarkOrange")
                embeds.setAuthor({ name: `Lamentável`, iconURL: "https://images2.imgbox.com/81/82/q3lfQxx0_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //PERDA HISTÓRICA
                if (roletabobby > 50 && roletabobby <= 54) {
                    embeds.setTitle(`PERDA HISTÓRICA`)
                    embeds.setDescription(`Essa carta fará você perder todos os seus artefatos.`)
                    embeds.setThumbnail("https://images2.imgbox.com/1e/df/Ung4ck95_o.png")
                    TIRARARTEFATO(user)
                }
                //OLFATO
                if (roletabobby > 54 && roletabobby <= 58) {
                    embeds.setTitle(`OLFATO`)
                    embeds.setDescription(`O Olfato de Zerlar.`)
                    adicionarRole(interaction.member, Ids.artefatos.Olfato)
                    embeds.setThumbnail("https://images2.imgbox.com/f5/1c/1lbfJ92o_o.png")
                }
                //DOAÇÃO DUVIDOSA
                if (roletabobby > 58 && roletabobby <= 62) {
                    embeds.setTitle(`DOAÇÃO DUVIDOSA`)
                    embeds.setDescription(`Essa carta vai te lembrar que ano passado, dia 18 de junho, você havia doado 4k de Zens para uma empresa chamada "Memórias dos Tempos Felizes".`)
                    embeds.setThumbnail("https://images2.imgbox.com/1f/e0/QHUpG8va_o.png")
                    aplicarDinheiro(user, -4000, interaction.guild)
                }
                //TIGRO
                if (roletabobby > 62 && roletabobby <= 66) {
                    const now = new Date();
                    const hora = now.getHours().toString().padStart(2, '0');
                    const minuto = now.getMinutes().toString().padStart(2, '0');
                    embeds.setTitle(`TIGRO`)
                    embeds.setDescription(`Essa carta irá invocar a entidade "Tigro" um monstro cruel que utiliza de seu poder para forçar coincidências em pessoas necessitadas, criando expectativas que logo se quebram com a morte. Caso no momento que essa carta for pega a hora e o minuto for iguais (19:19 por exemplo) você irá ganhar o efeito "Contingente", caso não seja, irá ganhar o efeito "Desgraçado".`)
                    embeds.setThumbnail("https://images2.imgbox.com/96/2f/LIgFXjYM_o.png")
                    if (hora === minuto) {
                        adicionarRole(interaction.member, Ids.unicos.Contingente, "BFFS")
                    } else {
                        adicionarRole(interaction.member, Ids.unicos.Desgraca, "WFFS")
                    }
                }
                //DECADÊNCIA
                if (roletabobby > 66 && roletabobby <= 70) {
                    embeds.setTitle(`DECADÊNCIA`)
                    embeds.setDescription(`Essa carta é a mais má e pura Decadência de uma pessoa. Caso alguém caia nessa carta, ela irá jogar 12d6 e o valor que cair será a quantidade de vezes que você terá um azar. Todos que tiverem o Status Decadência terá um azar que será aumentado pela quantidade do valor da decadência, não importando se foi você ou não que aumentou a duração da carta.`)
                    embeds.setThumbnail("https://images2.imgbox.com/ba/a7/eFzKgYwC_o.png")
                    const dados = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
                    interaction.channel.send(`**${dados}**  ⟵ [${dados}] 12d6`);
                    datafrase.infos.decadencia = dados + datafrase.infos.decadencia
                    writeDataFraseToFile(datafrase)
                    adicionarRole(interaction.member, Ids.negativos.Decadencia, "WFFS")
                    setTimeout(() => {
                        interaction.channel.send(`${interaction.user} aumentou a duração da decadência em: ${dados} vezes\nAtualmente o valor é de: ${datafrase.infos.decadencia}`)
                    }, 4000)
                }
                //INFORTUNADO
                if (roletabobby > 70 && roletabobby <= 74) {
                    embeds.setTitle(`INFORTUNADO`)
                    embeds.setDescription(`Essa carta traz a infortuna, te dando um azar médio na próxima carta`)
                    adicionarRole(interaction.member, Ids.unicos.Infortuna, "WFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/96/2f/LIgFXjYM_o.png")
                }
                //Desprezar
                if (roletabobby > 74 && roletabobby <= 78) {
                    embeds.setTitle(`DESPREZO`)
                    embeds.setDescription(`Essa carta serve para mostrar o quão fudidx você é. \nO ${interaction.user} é um merda, fudido, desgraçado, feio, horroroso, horrendo, arrombado, capeta, vacilão, bosta, cu, fedido, cheiro de cu, ruim, horrivel, péssimo, horroroso, ser que da dó de olhar, cara que sinto dor de ver, nerd fudido,  cabeça de vento, paspalho, boboca, Zé Mané, lerdo, palerma, panaca, bocó, pateta, trapalhão, abobado, tanso, Zé Ruela, tonto, abestado, bananas, lesado, mula, jumento e pastrana. E espero que tu e teu dia vão para casa do Caralho seu merda! Você é tão fudido que eu vou te desprezar, estragar a sua sorte. \nA sua próxima carta será 100% de certeza NEGATIVA.`)
                    embeds.setThumbnail("https://images2.imgbox.com/4b/4c/DDzZxLUg_o.png")
                    adicionarRole(interaction.member, Ids.unicos.Desprezo, "WFFS")
                };
                //DOR NO RIM
                if (roletabobby > 78 && roletabobby <= 82) {
                    embeds.setTitle(`DOR NO RIM`)
                    embeds.setDescription(`A dor no Rim causa mais dano na sua sanidade do que no seu corpo. Em algum momento aleatório na próxima sessão, você vai sentir uma dor no rim, recebendo 1d4 de dano mental.`)
                    embeds.setThumbnail("https://images2.imgbox.com/fb/a6/bIHvY6Fk_o.png")
                    const dados = (Math.floor(Math.random() * 4) + 1)
                    interaction.channel.send(`**${dados}**  ⟵ [${dados}] 1d4`)
                }
                //EXPULSO DA SALA
                if (roletabobby > 82 && roletabobby <= 86 && botModo.modo == "Sessão") {
                    if (user.roles.cache.has(ADM)) { roletabobby = 99 }
                }
                if (roletabobby > 82 && roletabobby <= 86) {
                    embeds.setTitle(`EXPULSO DA SALA`)
                    embeds.setDescription(`Essa carta faz com que você fique de castigo por 15 minutos. Você não é mais uma criança para ficar fazendo essas coisas coisas ai.`)
                    embeds.setThumbnail("https://images2.imgbox.com/14/7e/XfY5IaJA_o.png")
                    datafrase.dados.castigo++
                    setTimeout(async () => {
                        await user.timeout(900000, `Não é mais brincadeira, para com isso. Estamos em uma sala de aula, respeite todos.`)
                    }, 4000)
                }
                //ESTACA ZERO
                if (roletabobby > 86 && roletabobby <= 90) {
                    embeds.setTitle(`ESTACA ZERØ`)
                    embeds.setDescription(`Essa carta irá te colocar na estaca zero, tirando todos os seus status e colocando um novo status de azar aleatório.`)
                    embeds.setThumbnail("https://images2.imgbox.com/00/21/2bCGxVAU_o.png")
                    if (!(user.roles.cache.has(protegidoid))) {
                        TIRARPOSITIVO(user)
                        TIRARNEGATIVO(user)
                    } else {
                        user.roles.remove(protegidoid)
                        interaction.channel.send(`${interaction.user}, Sua proteção se esgotou!`)
                    }
                    const randomItem = RandomEfeitoPositivo("negativo");
                    interaction.member.roles.add(randomItem.id);
                }
                //AFLIÇÃO
                if (roletabobby > 90 && roletabobby <= 94) {
                    embeds.setTitle(`AFLIÇÃO`)
                    embeds.setDescription(`Essa carta irá te dar uma agonia em sua vida, um sentimento e uma sensação de desconforto. Com este efeito você terá 25% de chance de receber um Azar médio toda vez que jogar no Risorius`)
                    embeds.setThumbnail("https://images2.imgbox.com/bb/3c/YGalobRk_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Aflicao, "WFFS")
                }
                //AIIII QUE PREGUIÇAAA
                if (roletabobby > 94 && roletabobby <= 97) {
                    embeds.setTitle(`AIIII QUE PREGUIÇAAA`)
                    embeds.setDescription(`Ai que preguiçaaaa, vou ficar de cama hoje. Essa carta faz com que você seja mais lento nas cartas. O Cooldown do bot para você é aumentado em 2.0x a partir de agora e caso tenha pego algum status de velocidade, ele será apagado.`)
                    embeds.setThumbnail("https://images2.imgbox.com/4c/cb/XDZWtUbd_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Preguiçoso, "WFFS")
                }
                //PROCRASTINADOR NATO
                if (roletabobby > 97 && roletabobby <= 99) {
                    embeds.setTitle(`PROCRASTINADOR NATO`)
                    embeds.setDescription(`Você é tão bom nisso que venceu um torneio mundial de procrastinar. Foi declarado o vencedor após você não ir ao torneio por preguiça.\n Essa carta faz com que você seja mais lento nas cartas. O Cooldown do bot para você é aumentado em 2.5x a partir de agora e caso tenha pego algum status de velocidade, ele será apagado.`)
                    embeds.setThumbnail("https://images2.imgbox.com/c2/f9/Eum56aM7_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Letargico, "WFFS")
                }
            }
            //8 MISERÁVEL (20-49)
            if (roletabobby > 20 && roletabobby <= 49) {
                const teste100 = getporce(20, 49)
                embeds.setColor("DarkRed")
                embeds.setAuthor({ name: `Miserável`, iconURL: "https://images2.imgbox.com/89/61/1XorRaX8_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //PIX FAKE
                if (roletabobby > 20 && roletabobby <= 23) {
                    embeds.setTitle(`PIX FAKE`)
                    embeds.setDescription(`CUIDADO! Você errou um número do CPF do vendedor e sem querer você mandou 8k de Zens para o Jorge da Silva Pinto! Ele não vai devolver >:(`)
                    embeds.setThumbnail("https://images2.imgbox.com/1f/e0/QHUpG8va_o.png")
                    aplicarDinheiro(user, -8000, interaction.guild)
                }
                //DESGRAÇADO
                if (roletabobby > 23 && roletabobby <= 26) {
                    embeds.setTitle(`DESGRAÇADO`)
                    embeds.setDescription(`Essa carta traz toda a desgraça do mundo para você, fazendo com que sua próxima carta tenha um Azar grande`)
                    adicionarRole(interaction.member, Ids.unicos.Desgraca, "WFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/1f/ae/AQvzVQRG_o.png")
                }
                //JOGAR MALDADE
                if (roletabobby > 26 && roletabobby <= 28) {
                    embeds.setTitle(`JOGAR MALDADE`)
                    const MALDICOES = datafrase.efeitos.persomaldi;
                    const RANDOMMALDI = MALDICOES[Math.floor(Math.random() * MALDICOES.length)];
                    embeds.setDescription(`Você irá receber uma Maldade de um personagem de jogador aleatório deste servidor. \nConsidere está Maldade como se o seu personagem tivesse acordado muito mal para fazer aquela coisa especifica\n(Está Maldade é apenas para uma sessão!)\n\n${RANDOMMALDI}`)
                    embeds.setThumbnail("https://images2.imgbox.com/e5/d3/nYOAwhJO_o.png")
                }
                //BANIDO DO CAMPUS
                if (roletabobby > 28 && roletabobby <= 32) {
                    if (roletabobby > 26 && roletabobby <= 32 && botModo.modo == "Sessão") {
                        if (user.roles.cache.has(ADM)) { roletabobby = 49 }
                    }
                    if (roletabobby > 26 && roletabobby <= 32) {
                        const comandos = interaction.client.channels.cache.get(comandosid);
                        embeds.setTitle(`BANIDO DO CAMPUS`)
                        embeds.setDescription(`Essa carta faz com que você seja banido até que as autoridades te liberem. Você não pode cuspir na cara do professor e falar que ele é um merda e falar que as IAs vão pegar o trabalho.`)
                        embeds.setThumbnail("https://images2.imgbox.com/02/6e/Kjvl86NZ_o.png")
                        datafrase.dados.castigo++
                        setTimeout(async () => {
                            await user.timeout(3600000, `Você está banido até que volte com os advogados.`)
                        }, 4000)
                        setTimeout(async () => {
                            comandos.send(`Após a chegada dos advogados, ${interaction.user} foi preso e agora está na liberdade condicional! \nTomem cuidado!`)
                        }, 3600000)
                    }
                }
                //HORA CAÓTICA
                if (roletabobby > 32 && roletabobby <= 36) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = 49 }
                    if (roletabobby > 32 && roletabobby <= 36) {
                        embeds.setTitle(`HORA CAÓTICA`)
                        embeds.setDescription(`Essa carta irá fazer com que suas cartas ou tenham um azar mediano ou tenham uma sorte mediana durante 60 minutos, variando a cada vez que usa. Esse evento vai acontecer em 1 minuto... O Risorius ficou caótico!`)
                        embeds.setThumbnail("https://images2.imgbox.com/f2/2e/DzUNc0B5_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            interaction.channel.send(`@everyone !! Graças ao ${interaction.user} os próximos 60 minutos o Risorius terá ou uma sorte média ou dar um azar mediano. Se divirtam!`)
                            datafrase.eventos.tipo = "caotico"
                            writeDataFraseToFile(datafrase)
                            setTimeout(async () => {
                                datafrase.eventos.tipo = "normal"
                                interaction.channel.send(`Tivemos o fim da -Hora Caótica-... MAS AS PIADAS PERMANECEM EM PÉ!`)
                                writeDataFraseToFile(datafrase)
                            }, 3600000);
                        }, 30000)
                    }
                }
                //SISTEMA QUEBRADO
                if (roletabobby > 36 && roletabobby <= 40) {
                    embeds.setTitle(`SISTEMA QUEBRADO`)
                    embeds.setDescription(`Essa carta serve para aqueles que reclamam que o sistema está quebrando, fazendo com que SUAS PERNAS sejam quebradas!! Essa carta irá te dar o status Quebrado, fazendo com que toda vez que você jogue uma carta ela tenha 10% de chance de NÃO funcionar (caso não funcione, o cooldown irá se manter).`)
                    embeds.setThumbnail("https://images2.imgbox.com/86/0c/zOEcXkBx_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Quebrado, "WFFS")
                }
                //ENERGIA CAÓTICA
                if (roletabobby > 40 && roletabobby <= 43) {
                    embeds.setTitle(`ENERGIA CAÓTICA`)
                    embeds.setDescription(`E̸͔̗̅͑s̸̗͍̅s̷͈̣̈a̷̞̦̍͝ ̷̣̄c̶̺̗̈́ȁ̸̲r̴̛̘̙̉t̶͕̓a̸͍̕͠ ̸̩̕͜i̴̼͋̅r̸̬̂á̵͕̞̀̽ ̴̜̔̕d̴͔͂͝e̴̮̚s̶̢̜̔̆t̵͕͗r̷̯̯̄͐ǘ̴̡͈ḯ̸͉̥̀r̶̻̻͐͠ ̷̢̬̀t̸̟̫̂ȗ̶͓̗d̶̪̿o̴̠͝ ̸̥͐e̸̦͊ ̶̱̼̄͂t̴̜̠̒̑o̷͙̅d̵̳̐o̷͉͗̉s̸̹̓ ̷̹͠ȩ̴̣̇m̴̃͜ ̶͕̒ṳ̷̆m̶̲̓ ̶̫̗͠c̵̠̩͊â̸͚̘̊ö̵̩͇́̄s̶̠͑͘ ̵͈̈s̸̼͆́e̴̤̒m̶̥͘ ̵̮̫͗f̷͙̮͗ỉ̷͔͜m̵̞̀͝.̶͚͆͌ ̷̨̪́Ǎ̷͈ ̶̖̾s̸͖̀͜ų̷̺̐a̶̗͗̚ ̶̝̃͐ṕ̶̧̿r̶̢͓̔͝ó̴̧͈̍́x̷̛̳̅i̷͔̔m̶͎̩̔a̸̦̓͝ ̴̠͙̀c̶̛̣͒a̷͖̔ŕ̵̛̝̹t̸̼̏ą̵̻̄̑ ̸̳̜̏̋t̸̬́ę̶̛̃r̶̜̩̾̀á̸̞̗̽ ̴̹͋u̶̫͆͂ṃ̵̌ ̸͎͐̅a̵̬̽t̶̫͓͂̀r̸͕̿i̸͚̳͛̈́b̵̠̊ú̶̝̿t̴͙̕o̵̱̎̚ ̸̖̇a̷͔͚͒ļ̴͔̄e̵͔̿̚a̸̱͂͋ţ̴̮̉ó̶̗̪̿r̵͇͐̕ī̷̙̫͐o̸͉̔͛,̵̮̈́ ̷̖̜͆v̸̺̓͝a̴͈̽̑r̴̪͆i̴̯̅͛a̷̞͠ṇ̴̟̓̈́ḓ̷͊͗o̷̘̾͝ ̶͖̻̾d̸̙́ê̷̯̯ ̶̛͈1̶̨̳͊ ̴̥̤̍ȧ̸̭̤ ̸̹̩̐͠1̸̢͍͛͠0̸̗̰̔͑0̸͓̖̊̋%̷̜̿,̷͍̂̽ ̸̱͠s̷̰̦͊͋e̸̹̐ň̴̡͕̈́ḋ̷͕̞o̶̻̓̑ ̷̬͝o̵̧̩̒ú̸̖̒ ̸̨̊͝s̷̼̐ǫ̷͆͋r̸͈̺̈́ṭ̸̅̂e̶̳͋͝ ̵̿͂ͅo̶̹̿̈ǘ̶͊͜͜ ̵͚̊ạ̷̝͊̚z̴̗̀̈́à̷͇͕r̵̜̣͐̎`)
                    adicionarRole(interaction.member, Ids.unicos.Caos, "WFFS")
                    embeds.setThumbnail("https://images2.imgbox.com/12/94/To8EjuhG_o.png")
                }
                //MAL AGOURO
                if (roletabobby > 43 && roletabobby <= 46) {
                    embeds.setTitle(`MAL AGOURO`)
                    embeds.setDescription(`Você é o mais puro suco da maldade... E É ISSO QUE EU MAIS GOSTO! Essa carta irá dar a todos do servidor um Status de Azar Médio.`)
                    embeds.setThumbnail("https://images2.imgbox.com/9a/33/9CYmLhiT_o.png")
                    adicionarRoleTodos(interaction.guild, Ids.unicos.Infortuna)
                };
                //FAXINA PORCA
                if (roletabobby > 46 && roletabobby <= 49) {
                    embeds.setTitle(`FAXINA PORCA`)
                    embeds.setDescription(`Eca, que nojo, você tem coisas boas de mais, deixa eu te limpar...\n\n(limpando...)\n\n.Pronto! Agora você não tem mais nenhum status positivo com você!`)
                    embeds.setThumbnail("https://images2.imgbox.com/a2/a2/jNhnJibQ_o.png")
                    if (!(user.roles.cache.has(protegidoid))) {
                        TIRARNEGATIVO(user)
                    } else {
                        user.roles.remove(protegidoid)
                        interaction.channel.send(`${interaction.user}, sua proteção foi gastada!`)
                    }
                }

            }
            //4 CALAMITOSA (5-19)
            if (roletabobby > 5 && roletabobby <= 19) {
                const teste100 = getporce(5, 19)
                embeds.setColor("Orange")
                embeds.setAuthor({ name: `Calamitosa`, iconURL: "https://images2.imgbox.com/88/be/X9QUTvMs_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                //HELP MEU PRESIDENTE!
                if (roletabobby > 5 && roletabobby <= 9) {
                    embeds.setTitle(`HELP MEU PRESIDENTE!`)
                    embeds.setDescription(`Presidente: Eu preciso de sua ajuda! O país precisa de você! Iremos falir se você não mandar esse pix para mim!!!\nVocê: AI MEU DEUS PRESIDENTE!!! EU IREI MANDAR PARA VOCÊ AGORA!!!! SALVE O NOSSO PAÍS!!\n*você mandou um pix de 15k para o Presidente do país e em menos de uma semana sai nos jornais que ele foi preso por tráfico de drogas.*`)
                    embeds.setThumbnail("https://images2.imgbox.com/fe/6e/3arBwLst_o.png")
                    aplicarDinheiro(user, -15000, interaction.guild)
                }
                //DOBRA E PASSA
                if (roletabobby > 9 && roletabobby <= 11) {
                    embeds.setTitle(`DOBRA E PASSA`)
                    embeds.setDescription(`A calamidade de perder algo que você lutou é triste, vejo em seu olhar. MAS PARA MIM NÃO!HAHAHHA\n Essa carta faz com que você DOE um status positivo que você tenha para alguma pessoa aleatória do servidor! Além disso, você irá doar um extra!\n\n Com um item eu sinto dó, com dois eu caio na gargalhada!!`)
                    embeds.setThumbnail("https://images2.imgbox.com/67/bb/enXJG8ZJ_o.png")
                    const guild = interaction.guild;
                    const userRandom = Object.values(Ids.usuarios).filter(id => id !== user.id);
                    const statusPositivos = Object.values(Ids.positivos);
                    const maxTentativas = 200;
                    let contador = 0;
                    let member = null;

                    while (contador < maxTentativas) {
                        contador++;
                        const randomUserId = userRandom[Math.floor(Math.random() * userRandom.length)];
                        member = await guild.members.fetch(randomUserId).catch(() => null);

                        if (member) {
                            break;
                        }
                    }

                    if (!member) {
                        console.error("Erro: Nenhum membro válido foi encontrado para receber o status.");
                        return interaction.channel.send("⚠ Não foi possível encontrar um membro para receber o status positivo. ⚠");
                    }

                    const statusDoUsuario = user.roles.cache.filter(role => statusPositivos.includes(role.id));

                    if (statusDoUsuario.size === 0) {
                        return interaction.channel.send("⚠ Você não possui status positivos para doar. ⚠");
                    }

                    for (const [roleId] of statusDoUsuario) {
                        await user.roles.remove(roleId);
                        await member.roles.add(roleId);
                    }

                    interaction.channel.send(`Graças a ${interaction.user}, ${member.nickname || member.user.username} recebeu uma dádiva! HAHAHAHAHA`);

                    const BUFFRANDOM = Object.values(Ids.positivos);
                    const BUFF = BUFFRANDOM[Math.floor(Math.random() * BUFFRANDOM.length)];
                    await member.roles.add(BUFF);

                    datafrase.infos.espelho = roletabobby;
                    writeDataFraseToFile(datafrase);
                }
                //ANTI-VÍCIO
                if (roletabobby > 11 && roletabobby <= 15) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = 19 }
                    if (roletabobby > 7 && roletabobby <= 12) {
                        embeds.setTitle(`ANTI-VÍCIO`)
                        embeds.setDescription(`Essa carta irá lembrar todos vocês que vício nunca é legal. Por 60 minutos, o Risorius estará BLOQUEADO para TODOS. Esse evento vai acontecer em 1 minuto...`)
                        embeds.setThumbnail("https://images2.imgbox.com/ec/3c/53H1vuNb_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            interaction.channel.send(`@everyone !! Graças ao ${interaction.user} o Risorius estará indisponível por 60 minutos!`)
                            setTimeout(async () => {
                                datafrase.eventos.tipo = "normal"
                                interaction.channel.send(`Tivemos o fim do Anti-Vício... Não se esqueçam que VÍCIO NÃO É LEGAL!`)
                                writeDataFraseToFile(datafrase)
                            }, 36000);
                        }, 30000)
                    }
                }
                //WORST FRIENDS FOREVER!
                if (roletabobby > 15 && roletabobby <= 19) {
                    embeds.setTitle(`WORST FRIENDS FOREVER!`)
                    embeds.setDescription(`Nós somos Melhores Inimigos! Está escrito no fundo da privada!\nA carta irá pegar uma pessoa aleatória e fazer ela ser sua inimiga declarada. Ao estarem com cargos de WFFs, vocês irão compartilhar TODOS os status NEGATIVOS (Menos efeitos Lunares) que um dos dois pegarem em cartas.`)
                    embeds.setThumbnail("https://images2.imgbox.com/4c/f7/euESgdY3_o.png")
                    const guild = interaction.guild;
                    const userIds = Object.values(Ids.usuarios);

                    adicionarRole(interaction.member, Ids.negativos.WFFs, "WFFS")

                    const eligibleUsers = [];

                    for (const id of userIds) {
                        const member = await guild.members.fetch(id).catch(() => null);
                        if (member && member.id !== interaction.member.id && !member.roles.cache.has(Ids.negativos.WFFs)) {
                            eligibleUsers.push(member);
                        }
                    }

                    if (eligibleUsers.length === 0) {
                        return interaction.channel.send("⚠ Não existe pessoas que queiram ser seu inimigo ⚠");
                    }

                    const randomUserId = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
                    const randomMember = await guild.members.fetch(randomUserId);
                    await adicionarRole(randomMember, Ids.negativos.WFFs, "WFFS")

                    interaction.channel.send(`🎉 ${randomMember.user.tag} é o seu nêmesis!`);
                }
            }
            //11 AMALDIÇOADA (1-4)
            if (roletabobby > -299 && roletabobby <= 5) {
                const teste100 = getporce(1, 4)
                embeds.setColor("Red")
                embeds.setAuthor({ name: `Amaldiçoada`, iconURL: "https://images2.imgbox.com/52/b8/aOqgO6nC_o.png" })
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                adicionarRole(interaction.member, Ids.unicos.Maldicao, "WFFS")
                //PERDER ITEM
                if (roletabobby > 2 && roletabobby <= 5) {
                    embeds.setTitle(`PIADA CRUEL`)
                    datafrase.dados.perderiten++
                    writeDataFraseToFile(datafrase)
                    embeds.setDescription(`Essa carta é um chamado do Deus da Comédia, um chamado bom para ele mas cruel para você... Deus da Comédia irá pegar um dos itens do seu inventário na próxima sessão.\n\n (Caso você não tenha nenhum item no inventário, a carta irá anular uma carta de -Valor Lendário- que tenha pego e não tenha ganhado o item ainda. Caso você não tenha NENHUM dos dois, a carta não irá funcionar)`)
                    embeds.setThumbnail("https://images2.imgbox.com/d8/83/3KudwvyY_o.png")
                }
                //A MALDIÇÃO DO CAOS
                if(roletabobby > -4 && roletabobby <= 2 && botModo.modo == "Sessão"){
                    roletabobby = -50
                }
                if (roletabobby > -4 && roletabobby <= 2) {
                    datafrase.dados.bobby++
                    embeds.setTitle(`MALDIÇÃO DO CAOS`)
                    embeds.setDescription(`Essa carta irá invocar o poder do verdadeiro caos do Deus da Comédia. Além disso, você ficará amaldiçoado, fazendo com que você tenha um azar ENORME na próxima carta. \n\nO caos irá dominar o servidor...`)
                    embeds.setThumbnail("https://images2.imgbox.com/f1/9e/6vQUHHhG_o.png")
                    const nomebobby = "Bobby";
                    const avatarbobby = "https://images2.imgbox.com/0e/f6/mNnY7rrO_o.png";
                    const caos = Math.floor(Math.random() * 200) + 1;
                    const tempoCaos = Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000;
                    const ideiasid = '1157781850442436680';
                    const ideias = interaction.client.channels.cache.get(ideiasid);
                    interaction.client.user.setAvatar(avatarbobby);
                    interaction.client.user.setUsername(nomebobby);
                    console.log(tempoCaos);

                    interaction.channel.send("⚠️ O caos começa em... 10 segundos! ⚠️").then(message => {
                        let contagem = 10;
                        const countdown = setInterval(() => {
                            if (contagem > 0) {
                                message.edit(`⚠️ O caos começa em... ${contagem} segundos! ⚠️`);
                                contagem--;
                            } else {
                                clearInterval(countdown);
                                message.edit("🔥🔥🔥 O CAOS CHEGOU!!! 🔥🔥🔥");

                                ideias.threads.create({
                                    name: `Agradecimento ao Amaldiçoado!`,
                                    message: {
                                        content: `Obrigado ${interaction.user}! Espero que todos parabenizem o ${interaction.user} por me permitir trazer o caos nesse servidor!`
                                    }
                                });
                                const MEMESJSON = dataimagem.imagens.memes;
                                const GATOSJSON = dataimagem.risorius.gatosmemes;

                                for (let i = 0; i < caos; i++) {
                                    setTimeout(() => {
                                        const nomes = datafrase.nomes.personagens;
                                        const randmnomes = nomes[Math.floor(Math.random() * nomes.length)];


                                        const idsUsuarios = Object.values(Ids.usuarios).filter(id => id !== "424982351593078785"); // Remove Fábio
                                        const vitimaId = idsUsuarios[Math.floor(Math.random() * idsUsuarios.length)];
                                        console.log(vitimaId)
                                        interaction.guild.members.fetch(vitimaId)
                                            .then(vitima => {
                                                if (vitima) {
                                                    vitima.setNickname(randmnomes).catch(console.error);
                                                } else {
                                                    console.error("Membro não encontrado.");
                                                }
                                            })
                                            .catch(console.error);


                                        const randomgato = GATOSJSON[Math.floor(Math.random() * GATOSJSON.length)];
                                        const randomeme = MEMESJSON[Math.floor(Math.random() * MEMESJSON.length)];

                                        interaction.channel.send(randomeme);
                                        interaction.user.send(randomgato);

                                        if (Math.random() > 0.7) {
                                            const caosMsgs = [
                                                "🔥 O FIM ESTÁ PRÓXIMO! 🔥",
                                                "🌀 O CAOS REINA ABSOLUTO! 🌀",
                                                "😂 MEMES PARA TODOS! 😂",
                                                "🐱 Gatos sagrados estão entre nós! 🐱",
                                                "🚨 ALERTA: O Bobby tomou conta! 🚨"
                                            ];
                                            interaction.channel.send(caosMsgs[Math.floor(Math.random() * caosMsgs.length)]);
                                        }
                                        const suspenseMsgs = [
                                            "😈 Algo está errado...",
                                            "🔥 O chão está tremendo...",
                                            "😱 Eu sinto... a presença dele...",
                                            "⚠️ NÃO DEVIA TER APERTADO ESSE BOTÃO! ⚠️",
                                            "💀 Vocês já eram... 3...",
                                            "💀 Vocês já eram... 2...",
                                            "💀 Vocês já eram... 1..."
                                        ];
                                        suspenseMsgs.forEach((msg, index) => {
                                            setTimeout(() => {
                                                interaction.channel.send(msg);
                                            }, index * 2000);
                                        });

                                        interaction.guild.channels.create({
                                            name: `caos-${Math.floor(Math.random() * 999)}`,
                                            type: 0,
                                            reason: "Caos máximo!",
                                        }).then(channel => {
                                            channel.send("👁️👄👁️ O Bobby vê tudo...").catch(console.error);
                                            setTimeout(() => channel.delete().catch(console.error), 30000);
                                        });

                                        setTimeout(() => {
                                            interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
                                                const msgAleatoria = messages.random();
                                                msgAleatoria.edit("🔴 [MENSAGEM CENSURADA PELO BOBBY] 🔴").catch(console.error);
                                            });
                                        }, Math.random() * tempoCaos);


                                    }, Math.random() * tempoCaos);
                                }

                                setTimeout(async () => {
                                    const nomenormal = "Sol";
                                    const avatarnormal = 'https://images2.imgbox.com/df/e9/DcGo6iIv_o.png';
                                    interaction.client.user.setAvatar(avatarnormal);
                                    interaction.client.user.setUsername(nomenormal);
                                    interaction.channel.send("☀️ A ordem foi restaurada... por enquanto.");
                                }, 600000);
                            }
                        }, 1000);
                    });

                };
                //BANIMENTO AMALDIÇOADO
                if (roletabobby > -15 && roletabobby <= -4) {
                    embeds.setTitle(`BANIMENTO AMALDIÇOADO`)
                    const tempo = Math.floor(Math.random() * 4) + 1
                    embeds.setDescription(`Essa carta irá te amaldiçoar, te banindo do Risórius por ${tempo} horas. Você é uma piada tão engraçada que está roubando o show do meu jogo, tire esse tempo para refletir e deixar de ser uma piada..`)
                    embeds.setThumbnail("https://images2.imgbox.com/ad/c8/mmeYPJoi_o.png")
                    const timer = tempo * 3600000
                    adicionarRole(interaction.member, Ids.negativos.Banido)
                    datafrase.dados.banidos++
                    writeDataFraseToFile(datafrase)
                    setTimeout(async () => {
                        await user.roles.remove(BAN);
                    }, timer)
                }
                //MALDIÇÃO DO MARLAN
                if (roletabobby > -30 && roletabobby <= -15) {
                    if (datafrase.eventos.tipo != "normal") { roletabobby = -50 }
                    if (roletabobby > -30 && roletabobby <= -15) {
                        embeds.setTitle(`MALDIÇÃO DE MARLAN`)
                        embeds.setDescription(`Essa carta irá trazer a presença do Marlan, o Deus do Azar, deixando o mais puro azar e sentimentos extremos a todos, aumentando o azar das cartas de todos por 60 minutos. Esse evento vai acontecer em 10 minutos...\n\n(Esse azar acumula com outros status)`)
                        embeds.setThumbnail("https://images2.imgbox.com/1b/ac/cMm40x99_o.png")
                        datafrase.eventos.tipo = "bloqueado"
                        datafrase.dados.cartastipoevento++
                        writeDataFraseToFile(datafrase)
                        setTimeout(async () => {
                            interaction.channel.send(`@everyone !! Graças ao ${interaction.user} um pacto foi feito, trazendo a presença de Marlan, o Deus da Azar. Os próximos 60 minutos vocês terão azar em todas as cartas. O meu divertimento é a queda de vocês...`)
                            datafrase.eventos.tipo = "marlan"
                            writeDataFraseToFile(datafrase)
                            setTimeout(async () => {
                                datafrase.eventos.tipo = "normal"
                                interaction.channel.send(`Tivemos o fim da Maldição do Pacto... Não se esqueçam`)
                                writeDataFraseToFile(datafrase)
                            }, 3600000);
                        }, 30000)
                    }
                }
                //MALDIÇÃO DE MALITIAS
                if (roletabobby > -48 && roletabobby <= -30) {
                    embeds.setTitle(`MALDIÇÃO DE MALITIAS`)
                    embeds.setDescription(`Malitias, o Demônio do Ódio irá te Amaldiçoar, guardando seus sentimentos em ti. \nEssa carta faz com que Malitias ANULE a próxima carta divina que você for pegar, fazendo com que ela se torne uma carta azarada garantida.`)
                    embeds.setThumbnail("https://images2.imgbox.com/4a/43/YKMNLUKO_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Malcuidado, "WFFS")
                }
                //MALDIÇÃO DAS APOSTAS
                if (roletabobby > -70 && roletabobby <= -48) {
                    embeds.setTitle(`MALDIÇÃO DAS APOSTAS`)
                    embeds.setDescription(`Talvez seja azar? Ou você é apenas um trapaceiro ruim, mas isso não importa, o que importa é que você foi pego trapaceando nos jogos do Bobby e advinha? Ele não está feliz com isso.\nEssa carta faz com que você tenha azar nos jogos do Bobby, tendo mais chance de ganhar recompensas ruins.\n\n-Trapaceando no meu jogo é? HAHAHAHHAHAHAHHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHAHA`)
                    embeds.setThumbnail("https://images2.imgbox.com/a9/37/TaT3KdOU_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Trapaceiro, "WFFS")
                }
                //LÍNGUA DE GATO PRETO
                if (roletabobby > -90 && roletabobby <= -70) {
                    embeds.setTitle(`LÍNGUA DE GATO PRETO`)
                    embeds.setDescription(`A língua de gato preto é algo muito comum para fazer maldições para pessoas. Ela te traz um estrago na sua vida, destruíndo todos os momentos de felicidade que você poderia ter. Esta carta irá te dar uma Língua de Gato morto, um item amaldiçoado que fará você ter um multiplicador em todos os status de azar em 1.25x`)
                    embeds.setThumbnail("https://images2.imgbox.com/22/45/aB9cUHXi_o.png")
                    adicionarRole(interaction.member, Ids.negativos.Lingua, "WFFS")
                }
                //PACTO DE DINHEIRO
                if (roletabobby > -110 && roletabobby <= -90) {
                    embeds.setTitle(`PACTO DE DINHEIRO`)
                    embeds.setDescription(`Uma entidade endiabrada surge à sua frente, um mal indescritível... Ela rouba 75 mil do seu dinheiro e sussurra que um dia voltará...`)
                    embeds.setThumbnail("https://images2.imgbox.com/fe/6e/3arBwLst_o.png")
                    aplicarDinheiro(user, -75000, interaction.guild)
                }
                //CHARISMA
                if (roletabobby > -130 && roletabobby <= -110) {
                    embeds.setTitle(`CHARISMA`)
                    embeds.setDescription(`Charisma é um jogo traiçoeiro. Alguns até dizem que é amaldiçoado, mas a verdade... É que a culpa é toda a sua por correr tal risco.\nEssa carta poderá tirar uma grande quantidade de dinheiro ou de dar uma pequena quantidade.`)
                    embeds.setThumbnail("https://images2.imgbox.com/45/dd/yNdBaPOt_o.png")
                    const valorAleatorio = Math.floor(Math.random() * (2500 - (-50000) + 1)) + (-50000);
                    console.log(valorAleatorio)
                    aplicarDinheiro(user, valorAleatorio, interaction.guild)
                }
                //QUIZ DO BOBBYLHÃO
                if (roletabobby > -275 && roletabobby <= -130) {
                    embeds.setTitle(`QUIZ DO BOBBYLHÃO`);
                    embeds.setDescription(`O Quiz do Bobbylhão foi criado muito recentemente após um grupo de aventureiros chamado de "Eclipse" ganhou fama. Essa carta irá fazer uma pergunta aleatória e para responder você deve digitar e enviar um número de 1 a 4 no chat. \n\nVocê sempre irá perder, acertando ou errando, mas, pelo menos acertando você perderá menos do que errando ou não respondendo... \n\nBOA SORTE VOCÊ TEM 60 SEGUNDOS! HAHAHAHHAHAHAHA`);
                    embeds.setThumbnail("https://images2.imgbox.com/45/dd/yNdBaPOt_o.png");
                    const questionsjson = datafrase.questions;
                    const randomquestao = questionsjson[Math.floor(Math.random() * questionsjson.length)];
                    setTimeout(async () => {
                        const QUESTAO = new EmbedBuilder()
                        .setTitle('🧠 QUIZ DO BOBBYLHÃO 🧠')
                        .setDescription(`${randomquestao.question}\n\n${randomquestao.options
                            .map((option, index) => `**${index + 1}.** ${option}`)
                            .join('\n')}`)
                        .setColor('Random');
                    await interaction.channel.send({ embeds: [QUESTAO] });

                    const filter = (response) => {
                        return response.author.id === interaction.user.id && /^[1-4]$/.test(response.content);
                    };
                    const collector = interaction.channel.createMessageCollector({
                        filter,
                        time: 60000, 
                        max: 1,
                    });

                    collector.on('collect', (message) => {
                        const userAnswer = parseInt(message.content, 10) - 1;
                        if (userAnswer === randomquestao.correct) {
                            interaction.followUp(`🎉 Parabéns, ${interaction.user}! Você acertou...`);
                            aplicarDinheiro(user, -5000, interaction.guild)
                        } else {
                            const randomItem = RandomEfeitoPositivo("negativo");
                            interaction.member.roles.add(randomItem.id);
                            aplicarDinheiro(user, -5000, interaction.guild)
                            interaction.followUp(`❌QUE PENINHA HAHAHAH, ${interaction.user}! A resposta correta era: **${randomquestao.options[randomquestao.correct]}**.`);
                        }
                    });

                    collector.on('end', (collected) => {
                        if (collected.size === 0) {
                            interaction.followUp('⏳ O TEMPO ACABOU! O TEMPO ACABOU! E VOCÊ SE DANOU!!! HAHAHAHAHHA');
                            aplicarDinheiro(user, -50000, interaction.guild)
                        }
                    });
                    }, 10000)
                }
                //LÍNGUA
                if (roletabobby > -375 && roletabobby <= -275) {
                    embeds.setTitle(`LÍNGUA`)
                    embeds.setDescription(`A Língua de Zerlar.`)
                    embeds.setThumbnail("https://images2.imgbox.com/e6/b3/5MS4ub3v_o.png")
                    adicionarRole(interaction.member, Ids.artefatos.Lingua)
                }
            }
            //LUNAR
            if (roletabobby <= -375) {
                const teste100 = 466 / 10000
                datafrase.dados.lunarsolar++
                embeds.setColor("Purple")
                embeds.setAuthor({ name: `Lunar`, iconURL: "https://images2.imgbox.com/0f/6b/LoRFGdn4_o.png" })
                embeds.setTimestamp()
                embeds.setFooter({ text: `Chance: ${teste100}%` });
                embeds.setTitle(`FARDO ETERNO`)
                embeds.setDescription(`Essa carta é considerada aquilo que é mais maldito no universo, e o seu azar foi o que criou isso, foi ele quem criou a existência amaldiçoada dessa carta, você que criou o próprio conceito da Lua... \n\nA Lua irá te dar um fardo eterno fazendo com que TODAS as suas cartas apartir de agora tenham azar. Além disso, quaisquer Status de sorte que você ter serão Apagados da existência.\nPor fim, caso tenha pego quaisquer itens ou vantagens para a próxima sessão, eles serão desconsiderados.\n\n(caso você já tenha usado a vantagem na sessão, ou ganhou o item, a carta não terá efeito)`)
                embeds.setThumbnail("https://images2.imgbox.com/2f/df/JjdnE0lI_o.png")
                TIRARPOSITIVO(user)
                adicionarRole(interaction.member, Ids.negativos.Fardo)
            }


            datafrase.infos.espelho = roletabobby
            if (!user.roles.cache.has(leiguidadeid)) {
                interaction.channel.send({ embeds: [embeds] })
            } else {
                embeds.setTitle(`?`)
                embeds.setDescription(`?`)
                interaction.channel.send({ embeds: [embeds] })
            }
            writeDataFraseToFile(datafrase)
            embeds.setImage(null)
        }
        timeout[interaction.user.id] = Date.now();
    }
};