const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { aplicarDinheiro, VerificarDinheiro, Ids } = require('../includes/functions.js');

const predefinedList = [
    { title: 'Aljava de Narlon' },
    { title: 'BobbySpot' },
    { title: 'Cinquentinha' },
    { title: 'Escolhidos Pela Risada' },
    { title: '21 Bobbys' },
    { title: 'Charisma' },
    { title: 'Bordadas Dadas' },
    { title: 'Anelismo' },
    { title: 'Dinôrin' },
    { title: 'Cavalons' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('Escolha uma opção de jogos do Bobby!')
        .addIntegerOption(option =>
            option.setName('valor')
                .setDescription('Escolha a quantia que será apostada.')
                .setMinValue(1)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('opcao')
                .setDescription('Escolha um tipo de jogo.')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const suggestions = predefinedList
            .filter(item => item.title.toLowerCase().includes(focusedValue))
            .map(item => ({ name: item.title, value: item.title }));

        await interaction.respond(suggestions.slice(0, 25));
    },
    async execute(interaction) {
        const user = interaction.member;
        const aposta = interaction.options.getInteger('valor');
        const selectedOption = interaction.options.getString('opcao');
        const selectedGame = predefinedList.find(item => item.title === selectedOption);
        const valorAtual = VerificarDinheiro(user)
        if (valorAtual < aposta) {
            return interaction.reply({ content: `Você não tem dinheiro suficiente para apostar **${aposta}** ZENS!`, ephemeral: true });
        }

        if (selectedGame) {
            const embed = new EmbedBuilder()
                .setTitle(selectedGame.title.toUpperCase())
                .setDescription(`${interaction.user} apostou **${aposta}** ZENS🤑💰`)
                .setColor(0x00AE86);

            switch (selectedGame.title) {
                case 'Aljava de Narlon': {
                    const quantiFlechas = Math.floor(Math.random() * 10) + 1;
                    const valorBalas = Array.from(
                        new Set(
                            Array.from({ length: quantiFlechas * 2 }, () => Math.floor(Math.random() * 20) + 1)
                        )
                    ).slice(0, quantiFlechas);

                    embed.addFields({ name: 'Flechas Mágicas', value: valorBalas.join(', ') });
                    const message = await interaction.reply({ embeds: [embed], fetchReply: true });

                    let tentativas = 0;

                    const interval = setInterval(async () => {
                        if (tentativas >= 5) {
                            clearInterval(interval);

                            const ganho = Math.floor(aposta * (1 + quantiFlechas * 0.25));
                            aplicarDinheiro(user, ganho, interaction.guild);
                            embed.addFields({
                                name: 'Resultado Final',
                                value: `Parabéns! Você conseguiu evitar todas as flechas mágicas. Você ganhou **${ganho}** ZENS!`,
                            });
                            await message.edit({ embeds: [embed] });
                            return;
                        }

                        const resultadoTiro = Math.floor(Math.random() * 20) + 1;

                        if (valorBalas.includes(resultadoTiro)) {
                            clearInterval(interval);

                            const perda = -Math.floor(aposta * (1 + quantiFlechas * 0.25));
                            aplicarDinheiro(user, perda, interaction.guild);
                            embed.addFields({
                                name: `Tentativa ${tentativas + 1}`,
                                value: `Resultado: ${resultadoTiro}\nUma flecha mágica acertou sua cabeça e você perdeu **${Math.abs(perda)}** ZENS!`,
                            });
                            await message.edit({ embeds: [embed] });
                            return;
                        }

                        embed.addFields({
                            name: `Tentativa ${tentativas + 1}`,
                            value: `Resultado: ${resultadoTiro}\n`,
                        });
                        await message.edit({ embeds: [embed] });

                        tentativas++;
                    }, 2000);
                    break;
                }

                case 'BobbySpot': {
                    const figuras = ['🍒', '🍋', '🔔', '⭐', '💎'];
                    const multiplicadores = {
                        '🍒': 5,
                        '🍋': 4,
                        '🔔': 3,
                        '⭐': 2,
                        '💎': 1,
                    };
                    const maxTentativas = 1;

                    const message = await interaction.reply({ embeds: [embed], fetchReply: true });

                    let tentativas = 0;
                    let ganhou = false;

                    const interval = setInterval(async () => {
                        if (tentativas >= maxTentativas) {
                            clearInterval(interval);

                            if (!ganhou) {
                                const perda = -Math.floor(aposta);
                                aplicarDinheiro(user, perda, interaction.guild);
                                embed.addFields({
                                    name: 'Resultado Final',
                                    value: `Infelizmente você não conseguiu nada. Você perdeu **${Math.abs(perda)}** ZENS!`,
                                });
                                await message.edit({ embeds: [embed] });
                            }
                            return;
                        }

                        const resultadoRodada = Array.from({ length: 3 }, () =>
                            figuras[Math.floor(Math.random() * figuras.length)]
                        );

                        embed.addFields({
                            name: `Rodada ${tentativas + 1}`,
                            value: `Resultado: ${resultadoRodada.join(' | ')}`,
                        });

                        if (new Set(resultadoRodada).size === 1) {
                            ganhou = true;
                            clearInterval(interval);

                            const figura = resultadoRodada[0];
                            const multiplicador = multiplicadores[figura];
                            const ganho = Math.floor(aposta * multiplicador);
                            aplicarDinheiro(user, ganho, interaction.guild);
                            embed.addFields({
                                name: 'Você Ganhou!',
                                value: `Parabéns! Você conseguiu um trio de **${figura}**. Você ganhou **${ganho}** ZENS!`,
                            });
                            await message.edit({ embeds: [embed] });
                            return;
                        }

                        const duplas = resultadoRodada.filter((item, index) => item === resultadoRodada[index + 1]);
                        if (duplas.length > 0) {
                            const figura = duplas[0];
                            const multiplicador = multiplicadores[figura] * 0.5;
                            const ganho = Math.floor(aposta * multiplicador);
                            ganhou = true;
                            clearInterval(interval);
                            aplicarDinheiro(user, ganho, interaction.guild);
                            embed.addFields({
                                name: 'Você Ganhou uma Dupla!',
                                value: `Você conseguiu uma dupla de **${figura}**. Você ganhou **${ganho}** ZENS!`,
                            });
                            await message.edit({ embeds: [embed] });
                            return;
                        }

                        await message.edit({ embeds: [embed] });
                        tentativas++;
                    }, 2000);

                    break;
                }

                case 'Cinquentinha': {
                    const chanceDeGanho = Math.random() < 0.5;
                    const resultado = chanceDeGanho ? 'Você ganhou!' : 'Você perdeu!';
                    const porcentagem = 1.05;
                    const valorMudanca = Math.floor(aposta * porcentagem);

                    const message = await interaction.reply({ embeds: [embed], fetchReply: true });

                    if (chanceDeGanho) {
                        aplicarDinheiro(user, valorMudanca, interaction.guild);
                        embed.addFields({
                            name: resultado,
                            value: `Parabéns! Você ganhou **${valorMudanca}** ZENS!`,
                        });

                    } else {
                        aplicarDinheiro(user, -valorMudanca, interaction.guild);
                        embed.addFields({
                            name: resultado,
                            value: `Infelizmente, você perdeu **${Math.abs(valorMudanca)}** ZENS!`,
                        });
                    }

                    await message.edit({ embeds: [embed] });
                    break;
                }

                case 'Escolhidos Pela Risada': {
                    const opcoes = [
                        { descricao: 'Aumenta 10% da sua aposta', efeito: (valor) => Math.floor(valor * 0.1) },
                        { descricao: 'Diminui 10% da sua aposta', efeito: (valor) => -Math.floor(valor * 0.1) },
                        { descricao: 'Divide o valor da aposta por 2', efeito: (valor) => Math.floor(valor / 2) },
                        { descricao: 'Multiplica a aposta por 2', efeito: (valor) => Math.floor(valor * 2) },
                        { descricao: 'Diminui 20% da sua aposta', efeito: (valor) => -Math.floor(valor * 0.2) },
                        { descricao: 'Irá dividir por 1d10', efeito: (valor) => Math.floor(valor / (Math.floor(Math.random() * 10) + 1)) },
                        { descricao: 'Recebe 50% de volta', efeito: (valor) => Math.floor(valor * 0.5) },
                        { descricao: 'Perde 5% da aposta', efeito: (valor) => -Math.floor(valor * 0.05) },
                        { descricao: 'Aposta dobra, mas perde metade', efeito: (valor) => Math.floor(valor * 2) - Math.floor(valor / 2) },
                        { descricao: 'Multiplica por 1d3', efeito: (valor) => Math.floor(valor * (Math.floor(Math.random() * 3) + 1)) },
                    ];

                    const sorteio = opcoes[Math.floor(Math.random() * opcoes.length)];
                    const valorAlterado = sorteio.efeito(aposta);

                    const message = await interaction.reply({ embeds: [embed], fetchReply: true });

                    embed.addFields({
                        name: 'RISADAS',
                        value: `O escolhido foi:\n\n**${sorteio.descricao}**\n${valorAlterado >= 0 ? `Você ganhou ${valorAlterado} ZENS!` : `Você perdeu ${Math.abs(valorAlterado)} ZENS!`}`,
                    });

                    if (valorAlterado >= 0) {
                        aplicarDinheiro(user, valorAlterado, interaction.guild);
                    } else {
                        aplicarDinheiro(user, valorAlterado, interaction.guild);
                    }
                    await message.edit({ embeds: [embed] });
                    break;
                }

                case '21 Bobbys': {
                    const maxValor = 21;
                    const cartas = [
                        { nome: 'A', valor: 11 }, { nome: '2', valor: 2 }, { nome: '3', valor: 3 },
                        { nome: '4', valor: 4 }, { nome: '5', valor: 5 }, { nome: '6', valor: 6 },
                        { nome: '7', valor: 7 }, { nome: '8', valor: 8 }, { nome: '9', valor: 9 },
                        { nome: '10', valor: 10 }, { nome: 'J', valor: 10 }, { nome: 'Q', valor: 10 },
                        { nome: 'K', valor: 10 }
                    ];

                    const puxarCarta = () => cartas[Math.floor(Math.random() * cartas.length)];

                    let jogadorCartas = [puxarCarta(), puxarCarta()];
                    let jogadorTotal = jogadorCartas.reduce((soma, carta) => soma + carta.valor, 0);

                    let casaCartas = [puxarCarta(), puxarCarta()];
                    let casaTotal = casaCartas.reduce((soma, carta) => soma + carta.valor, 0);

                    const embed = new EmbedBuilder()
                        .setTitle('21 Bobbys')
                        .setDescription(`${interaction.user} apostou **${aposta}** ZENS🤑💰`)
                        .setColor(0x00AE86);

                    const atualizarEmbed = async (status = '') => {
                        embed.spliceFields(0, embed.data.fields?.length || 0);
                        embed.addFields(
                            {
                                name: 'Suas Cartas',
                                value: jogadorCartas.length > 0
                                    ? `${jogadorCartas.map(c => c.nome).join(', ')} (Total: ${jogadorTotal})`
                                    : 'Nenhuma carta ainda.',
                                inline: true
                            },
                            {
                                name: 'Cartas do Bobby',
                                value: casaCartas.length > 0
                                    ? `${casaCartas.map(c => c.nome).join(', ')} (Total: ${casaTotal})`
                                    : 'Nenhuma carta ainda.',
                                inline: true
                            },
                            {
                                name: 'Status',
                                value: status || 'Aguardando...',
                                inline: false
                            }
                        );
                        await interaction.editReply({ embeds: [embed] });
                    };

                    await interaction.reply({ embeds: [embed] });
                    await atualizarEmbed();

                    const collector = interaction.channel.createMessageCollector({
                        filter: (m) => m.author.id === interaction.user.id,
                        time: 60000
                    });

                    collector.on('collect', async (m) => {
                        const comando = m.content.toLowerCase();

                        if (comando === 'parar') {
                            collector.stop('parar');
                        } else if (comando === 'puxar') {
                            const novaCarta = puxarCarta();
                            jogadorCartas.push(novaCarta);
                            jogadorTotal += novaCarta.valor;

                            if (jogadorTotal > maxValor) {
                                collector.stop('estourou');
                            } else {
                                await atualizarEmbed();
                            }
                        } else {
                            await m.reply('Comandos válidos: **puxar** ou **parar**.');
                        }
                    });

                    collector.on('end', async (_, motivo) => {
                        if (motivo === 'estourou') {
                            const perda = -aposta;
                            aplicarDinheiro(user, perda, interaction.guild);
                            await atualizarEmbed(`Você ultrapassou ${maxValor} e perdeu **${Math.abs(perda)}** ZENS!`);
                            return;
                        }

                        while (casaTotal < 17) {
                            const novaCarta = puxarCarta();
                            casaCartas.push(novaCarta);
                            casaTotal += novaCarta.valor;
                        }

                        let status;
                        if (casaTotal > maxValor || jogadorTotal > casaTotal) {
                            const ganho = aposta * 2;
                            aplicarDinheiro(user, ganho, interaction.guild);
                            status = `Você venceu! Você ganhou **${ganho}** ZENS!`;
                        } else if (casaTotal > jogadorTotal) {
                            const perda = -aposta;
                            aplicarDinheiro(user, perda, interaction.guild);
                            status = `A casa venceu com ${casaTotal} pontos. Você perdeu **${Math.abs(perda)}** ZENS!`;
                        } else {
                            status = 'Empate! Ninguém ganhou ou perdeu ZENS.';
                        }

                        await atualizarEmbed(status);
                    });
                    break;
                }

                case 'Charisma': {
                    const opcoes = [
                        { descricao: 'Aumenta 10% da sua aposta', efeito: (valor) => Math.floor(valor * 0.1) },
                        { descricao: 'Diminui 10% da sua aposta', efeito: (valor) => -Math.floor(valor * 0.1) },
                        { descricao: 'Divide o valor da aposta por 2', efeito: (valor) => Math.floor(valor / 2) },
                        { descricao: 'Multiplica a aposta por 2', efeito: (valor) => Math.floor(valor * 2) },
                        { descricao: 'Diminui 20% da sua aposta', efeito: (valor) => -Math.floor(valor * 0.2) },
                        { descricao: 'Irá dividir por 1d10', efeito: (valor) => Math.floor(valor / (Math.floor(Math.random() * 10) + 1)) },
                        { descricao: 'Recebe 50% de volta', efeito: (valor) => Math.floor(valor * 0.5) },
                        { descricao: 'Perde 5% da aposta', efeito: (valor) => -Math.floor(valor * 0.05) },
                        { descricao: 'Aposta dobra, mas perde metade', efeito: (valor) => Math.floor(valor * 2) - Math.floor(valor / 2) },
                        { descricao: 'Multiplica por 1d3', efeito: (valor) => Math.floor(valor * (Math.floor(Math.random() * 3) + 1)) },
                        { descricao: 'Recebe 100 ZENS', efeito: (valor) => 100 },
                        { descricao: 'Perde 200 ZENS', efeito: (valor) => -200 },
                        { descricao: 'Recebe um bônus de 10 ZENS por cada carta', efeito: (valor) => valor * 0.1 },
                        { descricao: 'Multiplica sua aposta por 3', efeito: (valor) => Math.floor(valor * 3) },
                        { descricao: 'Diminui sua aposta por 50 ZENS', efeito: (valor) => -50 },
                        { descricao: 'Recebe um item que vale 200 ZENS', efeito: (valor) => 200 },
                        { descricao: 'Venceu um desafio e ganha 500 ZENS!', efeito: (valor) => 500 },
                        { descricao: 'Perde 30% do valor apostado', efeito: (valor) => -Math.floor(valor * 0.3) },
                        { descricao: 'Recebe 150 ZENS por uma missão bem feita', efeito: (valor) => 150 },
                        { descricao: 'Ganha 200 ZENS ao completar uma tarefa', efeito: (valor) => 200 },
                        { descricao: 'Aposta é multiplicada por 4', efeito: (valor) => Math.floor(valor * 4) },
                        { descricao: 'Recebe 10% de cada transação que fez recentemente', efeito: (valor) => Math.floor(valor * 0.1) },
                        { descricao: 'Perde 10% do valor apostado em uma jogada', efeito: (valor) => -Math.floor(valor * 0.1) },
                        { descricao: 'Ganha 50% de bônus sobre sua aposta', efeito: (valor) => Math.floor(valor * 0.5) },
                        { descricao: 'Perde metade do valor apostado', efeito: (valor) => -Math.floor(valor / 2) },
                        { descricao: 'Recupera 80% da aposta', efeito: (valor) => Math.floor(valor * 0.8) },
                        { descricao: 'Ganha 1000 ZENS pela sorte', efeito: (valor) => 1000 },
                        { descricao: 'Perde 200 ZENS devido a uma falha', efeito: (valor) => -200 },
                        { descricao: 'Ganha 100 ZENS por uma escolha estratégica', efeito: (valor) => 100 },
                        { descricao: 'Seu valor é multiplicado por 1d5', efeito: (valor) => Math.floor(valor * (Math.floor(Math.random() * 5) + 1)) },
                        { descricao: 'Recebe 200 ZENS por ter acertado um desafio', efeito: (valor) => 200 },
                        { descricao: 'Perde 15% do valor apostado', efeito: (valor) => -Math.floor(valor * 0.15) },
                        { descricao: 'Seu valor de aposta é dobrado e você ganha mais 50 ZENS', efeito: (valor) => Math.floor(valor * 2) + 50 },
                        { descricao: 'Você fica com 5% a mais do valor apostado', efeito: (valor) => Math.floor(valor * 0.05) },
                        { descricao: 'Recebe uma recompensa de 300 ZENS por um bom trabalho', efeito: (valor) => 300 },
                        { descricao: 'Perde 10% da aposta, mas recebe 10 ZENS como consolo', efeito: (valor) => -Math.floor(valor * 0.1) + 10 },
                        { descricao: 'Multiplica sua aposta por 1.5', efeito: (valor) => Math.floor(valor * 1.5) },
                        { descricao: 'Você perde a aposta, mas a casa lhe dá 100 ZENS', efeito: (valor) => -valor + 100 },
                        { descricao: 'Você acerta um truque e recebe 400 ZENS', efeito: (valor) => 400 },
                        { descricao: 'Sua aposta dobra, mas você perde 100 ZENS no caminho', efeito: (valor) => Math.floor(valor * 2) - 100 },
                        { descricao: 'Você ganha 20 ZENS pela sorte', efeito: (valor) => 20 },
                        { descricao: 'Você perde 20% da aposta', efeito: (valor) => -Math.floor(valor * 0.2) },
                        { descricao: 'Sua aposta aumenta 10%, mas você perde 50 ZENS', efeito: (valor) => Math.floor(valor * 0.1) - 50 },
                        { descricao: 'Recebe 500 ZENS por um investimento inteligente', efeito: (valor) => 500 },
                        { descricao: 'Recebe 200 ZENS após uma negociação bem sucedida', efeito: (valor) => 200 },
                        { descricao: 'Perde 10% da aposta por ser apressado', efeito: (valor) => -Math.floor(valor * 0.1) },
                        { descricao: 'Você encontra uma bolsa com 150 ZENS', efeito: (valor) => 150 },
                        { descricao: 'Recebe 50% a mais de lucro', efeito: (valor) => Math.floor(valor * 0.5) },
                        { descricao: 'Você paga 30 ZENS para um bom conselho e recebe um retorno de 60 ZENS', efeito: (valor) => 60 },
                        { descricao: 'Seu valor é dividido entre 1d5, mas você ganha um bônus extra de 100 ZENS', efeito: (valor) => Math.floor(valor / (Math.floor(Math.random() * 5) + 1)) + 100 },
                        { descricao: 'Recebe 250 ZENS após completar uma missão secreta', efeito: (valor) => 250 },
                        { descricao: 'Perde 40% do valor apostado devido a uma escolha errada', efeito: (valor) => -Math.floor(valor * 0.4) },
                        { descricao: 'Aposta multiplica por 1.5, mas você perde 100 ZENS', efeito: (valor) => Math.floor(valor * 1.5) - 100 },
                        { descricao: 'Recebe 200 ZENS de um bônus por boa sorte', efeito: (valor) => 200 },
                        { descricao: 'Aposta é dividida por 2, mas você ganha 50 ZENS extra', efeito: (valor) => Math.floor(valor / 2) + 50 },
                        { descricao: 'Você tem a chance de ganhar 200 ZENS ou perder tudo em um único movimento', efeito: (valor) => Math.random() > 0.5 ? 200 : -valor },
                        { descricao: 'Você perde metade da aposta, mas ganha 100 ZENS por resistência', efeito: (valor) => -Math.floor(valor / 2) + 100 },
                        { descricao: 'Você recebe 300 ZENS após completar um desafio pessoal', efeito: (valor) => 300 },
                        { descricao: 'Você recebe 150 ZENS ao conquistar uma missão difícil', efeito: (valor) => 150 },
                        { descricao: 'Você recebe 50% de volta após perder a aposta', efeito: (valor) => Math.floor(valor * 0.5) },
                        { descricao: 'Recebe 600 ZENS por um feito histórico', efeito: (valor) => 600 },
                        { descricao: 'Você perde 20 ZENS por uma falha na jogada', efeito: (valor) => -20 },
                        { descricao: 'Aposta dobra, mas você perde metade', efeito: (valor) => Math.floor(valor * 2) - Math.floor(valor / 2) },
                        { descricao: 'Você recebe 1000 ZENS após conquistar uma grande vitória', efeito: (valor) => 1000 },
                        { descricao: 'Você ganha 250 ZENS por uma troca vantajosa', efeito: (valor) => 250 },
                        { descricao: 'Você perde 200 ZENS após errar a jogada', efeito: (valor) => -200 },
                        { descricao: 'Você ganha um bônus de 500 ZENS por um grande trabalho', efeito: (valor) => 500 },
                        { descricao: 'Sua aposta dobra, mas você perde 10% do valor', efeito: (valor) => Math.floor(valor * 2) - Math.floor(valor * 0.1) },
                        { descricao: 'Você ganha 200 ZENS de um mentor sábio', efeito: (valor) => 200 },
                        { descricao: 'Você perde 50 ZENS após uma decisão ruim', efeito: (valor) => -50 },
                        { descricao: 'Recebe 100 ZENS de gratidão por seu trabalho', efeito: (valor) => 100 },
                        { descricao: 'Perde 20 ZENS após uma escolha equivocada', efeito: (valor) => -20 },
                        { descricao: 'Recebe 400 ZENS de recompensa por perseverança', efeito: (valor) => 400 },
                        { descricao: 'Você ganha 150 ZENS por uma excelente performance', efeito: (valor) => 150 },
                        { descricao: 'Você perde 100 ZENS após um erro estratégico', efeito: (valor) => -100 },
                        { descricao: 'Você ganha 500 ZENS após uma ótima negociação', efeito: (valor) => 500 },
                        { descricao: 'Você perde metade da aposta após um erro grave', efeito: (valor) => -Math.floor(valor / 2) },
                        { descricao: 'Você ganha 200 ZENS após um excelente investimento', efeito: (valor) => 200 },
                        { descricao: 'Recebe 300 ZENS por uma tarefa extra', efeito: (valor) => 300 },
                        { descricao: 'Você ganha 50 ZENS por completar um desafio', efeito: (valor) => 50 },
                        { descricao: 'Perde 30% da aposta devido a uma jogada mal feita', efeito: (valor) => -Math.floor(valor * 0.3) },
                        { descricao: 'Você perde 500 ZENS por uma decisão arriscada', efeito: (valor) => -500 },
                        { descricao: 'O valor da sua aposta é reduzido pela metade', efeito: (valor) => Math.floor(valor / 2) },
                        { descricao: 'Perde 15% da aposta devido a uma distração', efeito: (valor) => -Math.floor(valor * 0.15) },
                        { descricao: 'Sua aposta é triplicada, mas você perde metade', efeito: (valor) => Math.floor(valor * 3) - Math.floor(valor / 2) },
                        { descricao: 'Perde 100 ZENS por uma escolha apressada', efeito: (valor) => -100 },
                        { descricao: 'Perde 40% da aposta devido a uma falha no julgamento', efeito: (valor) => -Math.floor(valor * 0.4) },
                        { descricao: 'Você perde 200 ZENS após uma jogada infeliz', efeito: (valor) => -200 },
                        { descricao: 'Sua aposta dobra, mas você perde 30% no caminho', efeito: (valor) => Math.floor(valor * 2) - Math.floor(valor * 0.3) },
                        { descricao: 'Você perde 50% da aposta por tomar uma decisão equivocada', efeito: (valor) => -Math.floor(valor / 2) },
                        { descricao: 'Sua aposta diminui em 25%, mas você perde mais 50 ZENS', efeito: (valor) => Math.floor(valor * 0.75) - 50 },
                        { descricao: 'Você perde 10% da aposta por uma decisão apressada', efeito: (valor) => -Math.floor(valor * 0.1) },
                        { descricao: 'Perde 250 ZENS por falha em uma estratégia', efeito: (valor) => -250 },
                        { descricao: 'Você perde metade da aposta em uma jogada arriscada', efeito: (valor) => -Math.floor(valor / 2) },
                        { descricao: 'Sua aposta é cortada em 60%, mas você perde 50 ZENS', efeito: (valor) => Math.floor(valor * 0.4) - 50 },
                        { descricao: 'Perde 10% da aposta devido a um erro de cálculo', efeito: (valor) => -Math.floor(valor * 0.1) },
                        { descricao: 'Você perde 150 ZENS por tentar algo arriscado', efeito: (valor) => -150 },
                        { descricao: 'Perde 300 ZENS devido a uma escolha fatal', efeito: (valor) => -300 },
                        { descricao: 'Aposta diminui em 10%, mas você perde 100 ZENS no processo', efeito: (valor) => Math.floor(valor * 0.9) - 100 },
                        { descricao: 'Perde 5% da aposta por um erro de estratégia', efeito: (valor) => -Math.floor(valor * 0.05) },
                        { descricao: 'Sua aposta diminui em 50%, mas você perde mais 200 ZENS', efeito: (valor) => Math.floor(valor * 0.5) - 200 },
                        { descricao: 'Você perde 20% da aposta devido a uma distração', efeito: (valor) => -Math.floor(valor * 0.2) }
                    ];

                    const sorteio = opcoes[Math.floor(Math.random() * opcoes.length)];
                    const valorAlterado = sorteio.efeito(aposta);
                    const message = await interaction.reply({ embeds: [embed], fetchReply: true });
                    embed.addFields({
                        name: 'CHARISMA',
                        value: `A sorte decidiu:\n\n**${sorteio.descricao}**\n${valorAlterado >= 0 ? `Você ganhou ${valorAlterado} ZENS!` : `Você perdeu ${Math.abs(valorAlterado)} ZENS!`}`,
                    });
                    aplicarDinheiro(user, valorAlterado, interaction.guild);
                    await message.edit({ embeds: [embed] });
                    break;
                }

                case 'Bordadas Dadas': {
                    const valorCartao = 75;
                    const premios = [
                        { descricao: 'Você ganhou 200 ZENS!', valor: 500 },
                        { descricao: 'Você ganhou 150 ZENS!', valor: 200 },
                        { descricao: 'Você ganhou 50 ZENS!', valor: 50 },
                        { descricao: 'Você ganhou 10 ZENS!', valor: 10 },
                        { descricao: 'Você perdeu a raspadinha!', valor: -valorCartao }
                    ];
                
                    if (aposta < valorCartao) {
                        return interaction.reply({ content: 'Você não tem ZENS suficientes para comprar uma raspadinha!', ephemeral: true });
                    }
                
                    aplicarDinheiro(user, -valorCartao, interaction.guild);
                    const cartao = [];
                    for (let i = 0; i < 9; i++) {
                        cartao.push(Math.floor(Math.random() * 5));
                    }
            
                    let textoCartao = 'Raspando o cartão...\n\n';
                    for (let i = 0; i < 9; i++) {
                        textoCartao += cartao[i] === 0 ? '❌ ' : '✅ ';
                        if ((i + 1) % 3 === 0) textoCartao += '\n';
                    }
                
                    const resultadoCartao = cartao.reduce((acc, casa) => acc + casa, 0);  
                    let premio = premios[4]; 
                    if (resultadoCartao >= 20) {
                        premio = premios[0];
                    } else if (resultadoCartao >= 15) {
                        premio = premios[1];  
                    } else if (resultadoCartao >= 10) {
                        premio = premios[2]; 
                    } else if (resultadoCartao >= 5) {
                        premio = premios[3]; 
                    }
        
                    embed.addFields({
                        name: 'Raspadinha',
                        value: `${textoCartao}\n\n**Resultado:** ${premio.descricao}`,
                    });
                
                    aplicarDinheiro(user, premio.valor, interaction.guild);
            
                    await interaction.reply({ embeds: [embed] });
                    break;
                }
                
                default: {
                    await interaction.reply({
                        content: `O jogo **${selectedGame.title}** não está implementado ainda.`,
                        ephemeral: true,
                    });
                }
            }
        }

    },
};
