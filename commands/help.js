const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
var timeout = [];
const milesegundos = 240000;
const segundos = milesegundos / 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Exibe um menu de ajuda com coisas relacionadas ao bot'),
    async execute(interaction) {
        if (timeout.includes(interaction.user.id)) {
            return await interaction.reply({
                content: `Este comando está em cooldown, espere ${segundos} segundos`,
                ephemeral: true
            });
        }

        const helpMenu = new StringSelectMenuBuilder()
            .setCustomId('help-menu')
            .setPlaceholder('Selecione uma categoria para obter ajuda')
            .addOptions([
                {
                    label: 'Artefatos',
                    description: 'Informações sobre *Artefatos*',
                    value: 'artefatos',
                },
                {
                    label: 'Comando /feedback',
                    description: 'Informações sobre o comando /feedback',
                    value: 'feedback',
                },
                {
                    label: 'Comando /figura',
                    description: 'Informações sobre o comando /figura',
                    value: 'figura',
                },
                {
                    label: 'Comando /livro',
                    description: 'Informações sobre o comando /livro',
                    value: 'livro',
                },
                {
                    label: 'Comando /pix',
                    description: 'Informações sobre o comando /pix',
                    value: 'pix',
                },
                {
                    label: 'Comando /risorius',
                    description: 'Informações sobre o comando /risorius',
                    value: 'risorius',
                },
                {
                    label: 'Efeitos Negativos',
                    description: 'Informações sobre os efeitos *Negativos*',
                    value: 'efeitonegativo',
                },
                {
                    label: 'Efeitos Positivos',
                    description: 'Informações sobre os efeitos *Positivos*',
                    value: 'efeitopositivo',
                },
                {
                    label: 'Efeitos Únicos',
                    description: 'Informações sobre os efeitos *Únicos*',
                    value: 'efeitounico',
                },
                {
                    label: 'Equipamentos',
                    description: 'Informações sobre os Equipamentos',
                    value: 'equipamento',
                },
                {
                    label: 'Conjunto de Jogos de Zoystea',
                    description: 'Informações sobre os Jogos de Zoystea',
                    value: 'zoystea',
                },
                {
                    label: 'Conjunto de Jogos de Aystea',
                    description: 'Informações sobre os Jogos de Aystea',
                    value: 'aystea',
                },
                {
                    label: 'Comando /sussurros',
                    description: 'Informações sobre o comando /sussurros',
                    value: 'sussurros',
                },
                {
                    label: 'Comando /documentos',
                    description: 'Informações sobre o comando /documentos',
                    value: 'documentos',
                },
            ]);

        const menuRow = new ActionRowBuilder().addComponents(helpMenu);

        const initialEmbed = new EmbedBuilder()
            .setTitle('Menu de Ajuda')
            .setDescription('Selecione uma categoria abaixo para obter ajuda sobre comandos específicos.')
            .setColor('Blue')
            .setTimestamp();

        await interaction.reply({
            embeds: [initialEmbed],
            components: [menuRow],
            ephemeral: true,
        });

        const filter = (i) => i.customId === 'help-menu' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 180000,
        });

        collector.on('collect', async (menuInteraction) => {
            const selectedCategory = menuInteraction.values[0];
            let helpEmbed;

            switch (selectedCategory) {
                case 'documentos':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /documentos')
                        .setDescription('Este comando permite escolher um dos documentos disponíveis no bot. Você pode escolher entre todos aqueles que foram apresentados durante as campanhas de RPG! Além disso, a pesquisa é inteligente, ou seja, poderá pesquisar por palavras similares como <livro> ou <quintana>.')
                        .setColor('Red');
                    break;
                case 'sussurros':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /sussurros')
                        .setDescription('Este comando permite escolher uma das sessões das campanhas feitas até o momento. Ao escolher uma das sessões você irá receber no privado uma mensagem contendo o resumo da sessão escolhida.')
                        .setColor('Green');
                    break;
                case 'aystea':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /gamble')
                        .setDescription('Este comando irá te mostrar uma seleção de jogos criados pelo Bobby. Nesses jogos você deverá apostar um valor mínimo de 1 ZENS e escolher qual jogo deseja apostar.\n\nO conjunto de Aystea é composto por:')
                        .addFields(
                            { name: 'CHARISMA', value: 'Irá tirar um número de 1 a 100 e cada um deles irá fazer algo com o seu dinheiro. T U D O é possível.' },
                            { name: 'BORDADAS DADAS', value: 'A custo de 75 ZENS você irá comprar uma raspadinha onde cada um dos 9 espaços poderão ser ✅ (Vale algum ponto) ou ❌ (Não vale ponto). Irá somar todos os pontos da cartela e dependendo a soma irá pegar uma quantia de ZEN específica.' },
                            { name: 'ANELISMO', value: 'Ainda não está pronto.' },
                            { name: 'DINÔRIN', value: 'Ainda não está pronto.' },
                            { name: 'CAVALONS', value: 'Ainda não está pronto.' },
                        )
                        .setColor('Purple');
                    break;
                case 'zoystea':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /gamble')
                        .setDescription('Este comando irá te mostrar uma seleção de jogos criados pelo Bobby. Nesses jogos você deverá apostar um valor mínimo de 1 ZENS e escolher qual jogo deseja apostar.\n\nO conjunto de Zoystea é composto por:')
                        .addFields(
                            { name: 'ALJAVA DE NARLON', value: 'Você tem 5 tentativas para pegar flechas de uma aljava com 20 flechas. Entre elas, 1 a 10 são mágicas. Se pegar flechas mágicas, perderá ZENS conforme a quantidade. Se não pegar nenhuma flecha mágica, ganhará ZENS conforme o número de flechas mágicas na aljava.' },
                            { name: 'BOBBYSPOT', value: 'Irá roletar 3 icones e caso eles formem duplas ou trios você ganhará. Cada um deles equivale a um multiplicador especifico de ZENS, sendo as duplas menos que os trios.' },
                            { name: 'CINQUENTINHA', value: 'Você irá jogar seu dinheiro em uma roleta 50% vermelha e 50% azul, caso você pegue azul você irá multiplicar seu dinheiro, senão irá perder tudo.' },
                            { name: 'ESCOLHIDO PELA RISADA', value: 'Irá tirar um número de 1 a 10 e cada um deles irá fazer algo com o seu dinheiro, desde perder até multiplicar por 1d3.' },
                            { name: '21 BOBBYS', value: 'Você irá jogar blackjack com Bobby (casa) e você precisa tirar mais que a quantidade de Bobby porém, tem que ser 21 ou menos. Caso ultrapasse 21 ou tire menos que a Casa, você perde.\n-Puxar: Digite no chat "puxar" para puxar mais uma carta;\n-Parar: Digite no chat "parar" para parar.\n\nCaso ganhe, irá multiplicar seu dinheiro.' },
                        )
                        .setColor('Purple');
                    break;
                case 'pix':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /pix')
                        .setDescription('Este comando permite enviar uma quantia de dinheiro para outro usuário no servidor; você deverá especificar o valor (não podendo ultrapassar o saldo da sua carteira), escolher o destinatário e, opcionalmente, adicionar uma mensagem.\nUm recibo será enviado para ambas as partes.')
                        .setColor('Green');
                    break;
                case 'feedback':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /feedback')
                        .setDescription('Este comando permite enviar uma mensagem de feedback para o banco de informações no bot. Ela pode ser usada para dar uma ideia de algo ou até para caso ocorra algum bug.')
                        .setColor('Blue');
                    break;
                case 'risorius':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /risorius')
                        .setDescription('Este comando irá jogar uma carta aleatória, possuindo atualmente **154 cartas**. Cada carta fará algo, podendo ser uma carta do tipo **Evento**, **Sessão**, **Efeito**, **Artefato** e **Equipamento**. Existem as seguintes raridades de cartas:')
                        .addFields(
                            { name: 'ANCESTRAL', value: '13 Cartas' },
                            { name: 'DIVINAS', value: '0.4% de Chance - 9 Cartas' },
                            { name: 'INIGUALÁVEL', value: '1.4% de Chance - 4 Cartas' },
                            { name: 'MARAVILHOSA', value: '3% de Chance - 8 Cartas' },
                            { name: 'SUPERIOR', value: '5% de Chance - 12 Cartas' },
                            { name: 'BENÉVOLA', value: '15% de Chance - 14 Cartas' },
                            { name: 'COMUM', value: '40.5% de Chance - 44 Cartas' },
                            { name: 'HERESIA', value: '4.9% de Chance - 3 Cartas' },
                            { name: 'INOPORTUNA', value: '19.9% de Chance - 11 Cartas' },
                            { name: 'LAMENTÁVEL', value: '4.9% de Chance - 13 Cartas' },
                            { name: 'MISERÁVEL', value: '2.9% de Chance - 8 Cartas' },
                            { name: 'CALAMITOSA', value: '1.4% de Chance - 4 Cartas' },
                            { name: 'AMALDIÇOADA', value: '0.4% de Chance - 11 Cartas' },
                            { name: 'SOLAR', value: '0.15% de Chance - 1 Carta' },
                            { name: 'LUNAR', value: '0.15% de Chance - 1 Carta' }
                        )
                        .setColor('Purple');
                    break;
                case 'figura':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /figura')
                        .setDescription('Este comando irá te dar as seguintes opções de personagens para interagir: Parisa, Poyo, Joaozinho e Astério! \n\nAo selecionar um deles, você poderá ter acesso a uma das seguintes opções (vale lembrar que nem todos os personagens podem fazer todas essas ações):')
                        .addFields(
                            { name: 'APARÊNCIA', value: 'Irá mandar uma imagem contendo o personagem\n' },
                            { name: 'ARTES', value: 'Irá mandar uma imagem de uma arte feita pelo personagem\n' },
                            { name: 'COMPETIR', value: 'Você irá competir com o personagem para saber quem tira o maior valor em 1d20\n' },
                            { name: 'CONSELHOS', value: 'Irá receber um conselho do personagem\n' },
                            { name: 'DADOS', value: 'Irá receber uma ficha com os dados básicos do personagem\n' },
                            { name: 'EXPRESSÕES', value: 'Irá receber pequenos emojis com expressões do personagem\n' },
                            { name: 'FRASE ALEATÓRIA', value: 'Irá receber uma frase aleatória do personagem\n' },
                            { name: 'HORÓSCOPO', value: 'Irá receber um horóscopo do personagem\n' },
                            { name: 'PIADAS', value: 'Irá receber uma piada do personage\n' },
                            { name: 'PLAYLIST', value: 'Irá receber uma playlist do Spotify relacionado ao personagem\n' },
                            { name: 'QUANTIDADE DE FRASES', value: 'Irá receber a quantia de frases totais do personagem\n' }
                        )
                        .setColor('DarkGreen');
                    break;
                case 'livro':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Comando /livro')
                        .setDescription('Este comando irá te dar uma opção de qual sistema você deseja pegar e através dele você irá poder escolher qual livro deseja. Atualmente tem esses sistemas:\u200B')
                        .addFields(
                            { name: 'Ordem Paranormal RPG', value: '\u200B' },
                            { name: 'Tormenta20', value: '\u200B' },
                            { name: 'Dungeons & Dragons', value: '\u200B' },
                            { name: 'Call of Cthulhu', value: '\u200B' }
                        )
                        .setColor('Orange');
                    break;
                case 'efeitopositivo':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Efeitos Positivos')
                        .setDescription('Efeitos Positivos são aqueles que só podem ser usados várias vezes e que trazem algo positivo ao usar o comando. Eles são:')
                        .addFields(
                            { name: 'ACELERADO', value: 'Irá diminuir o cooldown do Risorius em 2.0x' },
                            { name: 'ANCESTRALIDADE', value: 'Irá aumentar a chance de pegar uma carta Ancestral no Risorius' },
                            { name: 'BEM-CUIDADO', value: 'Irá fazer com que você não pegue uma carta Amaldiçoada (desfaz ao uso) e converte em 100% de Sorte' },
                            { name: 'BFFS', value: 'Irá compartilhar os efeitos de sorte com outras pessoas que também possuem esse efeito' },
                            { name: 'BURLADOR', value: 'Irá aumentar os ganhos de ZENS no comando Jogatina' },
                            { name: 'CELERÍSSIMO', value: 'Irá diminuir o cooldown do Risorius em 2.5x' },
                            { name: 'CÔNJUGE', value: 'Irá compartilhar os ganhos e perdas de dinheiro com outras pessoas que também possuem esse efeito' },
                            { name: 'DOGMA', value: 'Fará ser impossível de se pegar Lunar e Solar, porém, sempre dará Sorte/Azar de acordo com qual tiver mais ou menos' },
                            { name: 'ENTRELAÇADOS', value: 'Irá dar 3% de sorte enquanto ainda tiver laços' },
                            { name: 'EVENTUALIDADE', value: 'Irá ter 10% de chance de ganhar 8% de sorte' },
                            { name: 'HERONOS', value: 'Irá diminuir o cooldown do Risorius em 5.0x' },
                            { name: 'JUHUR', value: 'Irá aumentar MUITO os ganhos de ZENS no comando Jogatina' },
                            { name: 'PROTEGIDO', value: 'Irá anular cartas que apagam status' },
                            { name: 'RÁPIDO', value: 'Irá diminuir o cooldown do Risorius em 1.5x' },
                            { name: 'SOLAR', value: 'Irá evoluir os status SpeedRunner e Burlador e irá dar uma sorte de 1-10%' },
                            { name: 'SPEEDRUNNER', value: 'Irá diminuir o cooldown do Risorius em 3.0x' },
                            { name: 'TREVO DOURADO', value: 'Irá multiplicar a sorte em 1.10' },
                            { name: 'VIGILANTE', value: 'Irá anular os roubos de Status' },
                        )
                        .setColor('Gold');
                    break;
                case 'efeitonegativo':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Efeitos Negativos')
                        .setDescription('Efeitos Negativos são aqueles que só podem ser usados várias vezes e que trazem algo negativo ao usar o comando. Eles são:')
                        .addFields(
                            { name: 'AFLIÇÃO', value: 'Irá ter 10% de chance de ganhar 8% de azar' },
                            { name: 'BANIDO', value: 'Você estará banido do Risorius' },
                            { name: 'DECADÊNCIA', value: 'Irá dar 3% + (1.5 x Valor do Decadência) de azar' },
                            { name: 'DESTRUIÇÃO', value: 'Irá fazer com que tenha 50% de chance do risorius não funcionar' },
                            { name: 'ESPELHO QUEBRADO', value: 'Irá fazer com que tenha 25% de chance da cópia não funcionar' },
                            { name: 'FARDO', value: 'Irá evoluir os status Quebrado e Espelho e irá dar um azar de 1-10%' },
                            { name: 'LERDO', value: 'Irá aumentar o cooldown do Risorius em 1.5x' },
                            { name: 'LEIGO', value: 'Irá subsituir o conteúdo da carta por *?*' },
                            { name: 'LETÁRGICO', value: 'Irá aumentar o cooldown do Risorius em 2.5x' },
                            { name: 'LÍNGUA DE GATO PRETO', value: 'Irá multiplicar o azar em 1.10' },
                            { name: 'MAL-CUIDADO', value: 'Irá fazer com que você não pegue uma carta Abençoada (desfaz ao uso) e converte em 100% de azar' },
                            { name: 'PREGUIÇOSO', value: 'Irá diminuir o cooldown do Risorius em 2.0x' },
                            { name: 'QUEBRADO', value: 'Irá fazer com que tenha 10% de chance do risorius não funcionar' },
                            { name: 'TRAPACEIRO', value: 'Irá diminuir a quantidade de ZENs ganhos na Jogatina' },
                            { name: 'WFFS', value: 'Irá compartilhar os efeitos de azar com outras pessoas que também possuem esse efeito' }
                        )
                        .setColor('Red');
                    break;
                case 'equipamento':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Equipamentos')
                        .setDescription('Equipamentos são itens que os user podem pegar para auxiliar em Raids. Eles são:')
                        .addFields(
                            { name: 'ESPADA CURTA', value: 'Causa 1d6 de dano' },
                            { name: 'ESPADA LONGA', value: 'Causa 1d8 de dano' },
                            { name: 'CAJADO MÁGICO', value: 'Causa 1d6 de dano' },
                            { name: 'PARISA', value: 'Causa 3d8 de dano' },
                            { name: 'FOICE DE HURN', value: 'Causa 1d10 + 1d8 + 1d12 de dano' },
                            { name: 'CEIFADORA DO LUAR', value: 'Causa 2d20 de dano' }
                        )
                        .setColor('DarkOrange');
                    break;
                case 'artefatos':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Artefatos')
                        .setDescription('Artefatos são itens antigos que se podem pegar em qualquer lugar, podendo dar efeitos positivos ou negativos. Os artefatos são diferentes dos efeitos, então eles vão ficar com você até algo tirar. Eles são:')
                        .addFields(
                            { name: 'ÂNCORA DOURADA', value: 'Irá dar 1% de azar' },
                            { name: 'COTIDIANÁRIO', value: 'Irá dar 2% de chance de ser comum' },
                            { name: 'AMULETO', value: 'Irá transformar a carta *Zé Ninguém* do Risorius no efeito Abençoado' },
                            { name: 'QUILLIX', value: 'Irá dar 1% de sorte' },
                            { name: 'UMBRELA', value: 'Irá te deixar imune a efeitos negativos de eventos' },
                            { name: 'ZERLAR', value: 'Ao juntar os 6 sentidos de Zerlar você poderá ter um desejo que NÃO afete diretamente personagens nos RPGs (uso único)' }
                        )
                        .setColor('DarkBlue');
                    break;
                case 'efeitounico':
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Efeitos Únicos')
                        .setDescription('Efeitos únicos são aqueles que só podem ser usados uma vez em algum comando específico. Eles são:')
                        .addFields(
                            { name: 'ABENÇOADO', value: 'Irá te dar 35% de Sorte' },
                            { name: 'AFORTUNADO', value: 'Irá te dar 8% de Sorte' },
                            { name: 'AMALDIÇOADO', value: 'Irá te dar 35% de Azar' },
                            { name: 'ASSUSTADO', value: 'Irá te dar uma % de azar de acordo com o Ninho do Dragão Cinzento' },
                            { name: 'AZARADO', value: 'Irá te dar 4% de Azar' },
                            { name: 'CAÓTICO', value: 'Irá fazer 1-50% azar ou sorte' },
                            { name: 'COINCIDENTE', value: 'Irá te dar 2% de sorte' },
                            { name: 'CONTINGENTE', value: 'Irá te dar 15% de sorte' },
                            { name: 'CONTRAÇÃO', value: 'Irá inverter sua sorte/azar' },
                            { name: 'DESGRAÇA', value: 'Irá te dar 17.5% de azar' },
                            { name: 'DESPREZO', value: 'Irá te dar 100% de azar' },
                            { name: 'DESVIRTUADO', value: 'Irá fazer a sua próxima carta ser de certeza uma interferência em RPG' },
                            { name: 'ESPELHO', value: 'Irá copiar a última carta usada' },
                            { name: 'GLORIFICADO', value: 'Irá te dar 100% de sorte' },
                            { name: 'IMPERADOR', value: 'Irá te dar uma % de sorte de acordo com o Cofre da Dinastia' },
                            { name: 'INCONVENIENTE', value: 'Irá te dar 2% de azar' },
                            { name: 'INFORTUNA', value: 'Irá te dar 8% de azar' },
                            { name: 'MEIANOVE', value: 'Irá te dar 6.9% de sorte ou azar' },
                            { name: 'NORMALIZATOR', value: 'Irá te dar 10% de chance de vir comum' },
                            { name: 'PADRÃOZINHO', value: 'Irá te dar 100% de chance de vir comum' },
                            { name: 'VENTURADO', value: 'Irá te dar 4% de sorte' },
                        )
                        .setColor('DarkRed');
                    break;
                default:
                    helpEmbed = new EmbedBuilder()
                        .setTitle('Erro')
                        .setDescription('Categoria selecionada inválida.')
                        .setColor('Red');
                    break;
            }

            await menuInteraction.update({
                embeds: [helpEmbed],
                components: [menuRow],
            });
        });

        collector.on('end', async () => {
            try {
                const disabledMenu = new StringSelectMenuBuilder(helpMenu).setDisabled(true);
                const disabledRow = new ActionRowBuilder().addComponents(disabledMenu);

                await interaction.editReply({
                    components: [disabledRow],
                });
            } catch (error) {
                if (error.code !== 10062) {
                    console.error('Erro ao desabilitar o menu:', error);
                }
            }
        });

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout = timeout.filter(id => id !== interaction.user.id);
        }, milesegundos);
    },
};
