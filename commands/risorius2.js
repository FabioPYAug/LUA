const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const frasesJSON = require('../comunidade/risorius.json');
const imagensJSON = require('../comunidade/imagens.json');

const { TIRARPOSITIVO, TIRARNEGATIVO, EFEITOS, EVENTOS, WFFs, BFFs, TIRARARTEFATO, TIRAREQUIPAMENTO, RaidBoss, EVOLUCAO, Artefatos, RandomEfeitoPositivo, TIRARARTEFATOS, OutrosValores, adicionarRole, aplicarDinheiro, adicionarRoleTodos, aplicarDinheiroTodos, Ids } = require('../includes/functions.js');
const { sortearPorPeso, VerificarCargo, AplicarCargos } = require('../includes/risorius.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bobbytarot')
    .setDescription('Sorteie uma carta aleatória!'),

  async execute(interaction) {
    const ADM = "1099030674574422107"
    if (!interaction.member.roles.cache.has(ADM)) {
      interaction.reply({ content: "Risorius está sendo atualizado! Novidades em breve...", ephemeral: true })
      return
    }

    const cartasOriginal = require('../comunidade/cartas.json');
    const cartasJSON = JSON.parse(JSON.stringify(cartasOriginal));

    // VERIFICAÇÃO DE STATUS
    let envelope = ""
    const cargos = VerificarCargo(interaction.member);
    if (cargos.length > 0) {
      const efeitos = AplicarCargos(cargos, interaction.member);
      if (efeitos.efeitoComum !== 1) {
        cartasJSON.forEach((raridade) => {
          if (raridade.raridade === "Comum") {
            raridade.peso *= efeitos.efeitoComum;
            console.log(raridade.peso)
          }
        });
      }

      if (efeitos.efeitosGerais.includes('Envelope')) {
        envelope = "||";
      }

    }

    // SORTEAR AS CARTAS
    const totalPesoRaridades = cartasJSON.reduce((acc, r) => acc + r.peso, 0);
    const raridadeSorteada = sortearPorPeso(cartasJSON);
    const totalPesoCartas = raridadeSorteada.cartas.reduce((acc, c) => acc + c.peso, 0);
    const cartaSorteada = sortearPorPeso(raridadeSorteada.cartas);
    const probabilidade =
      (raridadeSorteada.peso / totalPesoRaridades) *
      (cartaSorteada.peso / totalPesoCartas);
    const probPercent = (probabilidade * 100).toFixed(2);

    const embed = new EmbedBuilder()
      .setTitle(`**${raridadeSorteada.raridade}** - ${probPercent}%`)
      .setColor(raridadeSorteada.cor)
      .setDescription(`# ${envelope} ${cartaSorteada.nome} ${envelope} \n ${envelope} ${cartaSorteada.descrição} ${envelope}`)
      .setThumbnail(cartaSorteada.thumbnail || null)
      .setImage(cartaSorteada.imagem || null);

    await interaction.reply({ embeds: [embed] });
    switch (cartaSorteada.nome) {
      case 'AI CUTI CUTI':
        const animaisjson = imagensJSON.imagens.animais;
        const randomanimal = animaisjson[Math.floor(Math.random() * animaisjson.length)];
        interaction.followUp(randomanimal)
        break;

      case 'LOCALIZATOR':
        const lugarjson = frasesJSON.nomes.Localizator;
        const randomlugar = lugarjson[Math.floor(Math.random() * lugarjson.length)];
        interaction.followUp(`*${randomlugar}*`);
        break;

      case 'PLAYMEMER':
        const playermemejson = imagensJSON.risorius.memesplayers;
        const randompmeme = playermemejson[Math.floor(Math.random() * playermemejson.length)];
        interaction.followUp(randompmeme)
        break;

      case 'HATSUNE MIKU':
        const sunejson = imagensJSON.risorius.miku;
        const randommiku = sunejson[Math.floor(Math.random() * sunejson.length)];
        interaction.followUp(randommiku)
        break;

      case 'MEMEN ALEATÓRION':
        const memejson = imagensJSON.imagens.memes;
        const randomeme = memejson[Math.floor(Math.random() * memejson.length)];
        interaction.followUp(randomeme)
        break;

      case 'DUELO DAS LENDAS':
        setTimeout(async () => {
          const LENDAS = frasesJSON.nomes.personagens;
          const duelo1 = LENDAS[Math.floor(Math.random() * LENDAS.length)];
          const duelo2 = LENDAS[Math.floor(Math.random() * LENDAS.length)];
          const infoddoduelo = frasesJSON.outros.batalhas;
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
          const votedUsers = new Set();

          const collector = mensagem.createMessageComponentCollector({
            filter: i => i.customId === 'voto1' || i.customId === 'voto2',
            time: 30000
          });

          collector.on('collect', async i => {
            if (votedUsers.has(i.user.id)) {
              await i.reply({ content: 'Você já votou neste duelo!', ephemeral: true });
              return;
            }

            votedUsers.add(i.user.id);
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
        break;

      case 'MUSICAN LETÓRIAN':
        const musicasJSON = frasesJSON.outros.playlists;
        const randommusica = musicasJSON[Math.floor(Math.random() * musicasJSON.length)];
        interaction.followUp(`*${randommusica}*`);
        break;

      case 'ZÉ NINGUÉM':
        if (interaction.member.roles.cache.has("1396929283129217044")) {
          adicionarRole(interaction.member, Ids.unicos.Bencao, "BFFS")
        }
        break;

      case 'NERDIE':
        const nerdimage = imagensJSON.risorius.paulowaifus;
        const randomnerd = nerdimage[Math.floor(Math.random() * nerdimage.length)];
        interaction.followUp(randomnerd)
        break;

      case 'ITENATOR':
        const itensJSON = frasesJSON.nomes.itens;
        const randomitem = itensJSON[Math.floor(Math.random() * itensJSON.length)];
        interaction.followUp(`*${randomitem}*`);
        break;

      case 'JOGO DE CARTAS':
        const cartasImagem = imagensJSON.risorius.cartas;
        const randomCarta = cartasImagem[Math.floor(Math.random() * cartasImagem.length)];
        interaction.followUp(randomCarta)
        break;

      case 'NORMALIZATOR':
        adicionarRole(interaction.member, Ids.unicos.Normalizator)
        break;

      case 'OBRIGADO KASANE TETO!':
        const tetoimagem = imagensJSON.risorius.teto;
        const randomteto = tetoimagem[Math.floor(Math.random() * tetoimagem.length)];
        interaction.followUp(randomteto)
        break;

      case 'NHAM NHAM!':
        const comidaimagem = imagensJSON.risorius.comida;
        const randomcomida = comidaimagem[Math.floor(Math.random() * comidaimagem.length)];
        interaction.followUp(randomcomida)
        break;

      case 'BISCOITO DA SORTE':
        const BiscoitoJSON = frasesJSON.outros.biscoito;
        const randombiscoito = BiscoitoJSON[Math.floor(Math.random() * BiscoitoJSON.length)];
        interaction.followUp(`*${randombiscoito}*`);
        break;

      case 'COTIDIANÁRIO':
        adicionarRole(interaction.member, Ids.artefatos.Cotidianario)
        break;

      case 'QUIZ SOBRE MIM?':
        const NOMESJSON = frasesJSON.outros.quiz;
        const quiz = NOMESJSON[Math.floor(Math.random() * NOMESJSON.length)];
        interaction.followUp(quiz);
        break;

      case 'ECHO':
        const channel = interaction.channel;
        const fetchedMessages = await channel.messages.fetch({ limit: 100 });
        const userMessages = fetchedMessages
          .filter(msg => msg.author.id === interaction.user.id)
          .first(10);

        if (userMessages.length === 0) {
          embed.addFields({ name: "Nenhuma transmissão encontrada", value: "Não há mensagens recentes suas neste canal." });
        } else {
          const formatted = userMessages.map(msg => {
            let content = msg.content;
            if (!content) {
              if (msg.attachments.size > 0) content = '[Anexo]';
              else if (msg.embeds.length > 0) content = '[Embed]';
              else if (msg.stickers.size > 0) content = '[Sticker]';
              else content = '[Sem conteúdo]';
            }

            return `📡 **${msg.createdAt.toLocaleString()}**\n${content}`;
          }).join('\n\n');

          embed.addFields({ name: "Transmissões captadas:", value: formatted.slice(0, 1024) });
        }
        await interaction.editReply({ embeds: [embed] });

        break;

      default:
        break;
    }
  },
};


