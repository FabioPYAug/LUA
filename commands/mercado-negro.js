const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Ids, TIRARNEGATIVO } = require('../includes/functions.js');
const fs = require('fs');
const path = require('path');
const frasespath = path.join(__dirname, '..', 'comunidade', 'dinheiro.json');
const modopath = path.join(__dirname, '..', 'comunidade', 'bot.json');

const mestre = "1099030674574422107"

function readDataModoFromFile() {
    if (fs.existsSync(modopath)) {
        const jsonModo = fs.readFileSync(modopath, "utf8");
        return JSON.parse(jsonModo);
    }
    return { DINHEIRO: {} }; 
}

let botModo = readDataModoFromFile();

function readDataFromFile() {
    if (fs.existsSync(frasespath)) {
        const JSONDADOS = fs.readFileSync(frasespath, 'utf8');
        return JSON.parse(JSONDADOS);
    }
    return { DINHEIRO: {} };
}

async function writeDataToFile(data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(frasespath, jsonString, 'utf8');
}

const data = readDataFromFile();

async function Compra(carteira, valor, nomePagador) {
    if (carteira < valor) {
        return false;
    }
    carteira -= valor;
    data.DINHEIRO[nomePagador] = carteira;
    await writeDataToFile(data);
    return true;
}

async function atualizarInteracao(i, conteudo, componentes = [], embeds = []) {
    try {
        await i.update({
            content: conteudo,
            embeds: embeds,
            components: componentes,
        });
    } catch (error) {
        console.error("Erro ao atualizar interação:", error);
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('contrabando')
        .setDescription('Acesse o mercado negro...')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Escolha um alvo de sua maldade')
                .setRequired(true) 
        ),
    async execute(interaction) {
        const selectedUser = interaction.options.getUser('usuario') || interaction.user;
        const member = interaction.guild.members.cache.get(selectedUser.id);

        const idToNameMap = Object.fromEntries(
            Object.entries(Ids.usuarios).map(([name, id]) => [id, name])
        );

        const user = interaction.member;
        const userId = user.id;

        const nomePagador = idToNameMap[userId];

        if (!nomePagador) {
            return interaction.reply({ content: 'Usuário não encontrado na lista de registros.', ephemeral: true });
        }

        const carteiraDinheiro = data.DINHEIRO[nomePagador];

        const itens = [
            { nome: 'AZAR PEQUENO', preco: 6000, descricao: 'Irá dar Azar Pequeno ao Usuário' },
            { nome: 'AZAR MÉDIO', preco: 12000, descricao: 'Irá dar Azar Médio ao Usuário' },
            { nome: 'AZAR GRANDE', preco: 20000, descricao: 'Irá dar Azar Grande ao Usuário' },
            { nome: 'RETIRADA DA CALL', preco: 20000, descricao: 'Irá tirar o usuário da call' },
            { nome: 'GRAVIDADE INVERTIDA', preco: 30000, descricao: 'Irá dar Sorte Invertida ao Usuário' },
        ];

        const itensPorPagina = 3;
        let paginaAtual = 0;

        function gerarEmbed(pagina) {
            const startIndex = pagina * itensPorPagina;
            const itensPagina = itens.slice(startIndex, startIndex + itensPorPagina);

            const embed = new EmbedBuilder()
                .setTitle('W∩ᴚ∩ƆSᙠO')
                .setDescription('W∩ᴚ∩ƆSᙠO é um mercado negro obscuro e escondido da sociedade, acessível apenas àqueles escolhidos antes mesmo de sair do útero da mãe.')
                .setColor('DarkPurple');

            itensPagina.forEach(item => {
                embed.addFields(
                    { name: item.nome, value: `${item.descricao}\nPreço: ${item.preco} ZENS`, inline: false }
                );
            });

            return embed;
        }

        function gerarBotoes(pagina) {
            const row = new ActionRowBuilder();
            itens.slice(pagina * itensPorPagina, pagina * itensPorPagina + itensPorPagina).forEach((item, index) => {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`comprar_${pagina * itensPorPagina + index}`)
                        .setLabel(`${item.nome}`)
                        .setStyle(ButtonStyle.Primary)
                );
            });
            if (pagina > 0) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('pagina_anterior')
                        .setLabel('Página Anterior')
                        .setStyle(ButtonStyle.Secondary)
                );
            }

            if ((pagina + 1) * itensPorPagina < itens.length) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('proxima_pagina')
                        .setLabel('Próxima Página')
                        .setStyle(ButtonStyle.Secondary)
                );
            }

            return row;
        }

        const embed = gerarEmbed(paginaAtual);
        const botoes = gerarBotoes(paginaAtual);

        await interaction.reply({
            embeds: [embed],
            components: [botoes],
            ephemeral: true
        });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 180000 });

        collector.on('collect', async (i) => {
            try {
                if (i.customId.startsWith('comprar_')) {
                    const index = parseInt(i.customId.split('_')[1]);
                    const itemComprado = itens[index];

                    if (itemComprado.nome === "AZAR PEQUENO") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(member.roles.cache.has(Ids.unicos.Azarado)){
                                await interaction.channel.send({content: "Ele já tem esse produto!", ephemeral: true})
                                return;
                            }
                            member.roles.add(Ids.unicos.Azarado)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "AZAR MÉDIO") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(member.roles.cache.has(Ids.unicos.Infortuna)){
                                await interaction.channel.send({content: "Ele já tem esse produto!", ephemeral: true})
                                return;
                            }
                            member.roles.add(Ids.unicos.Infortuna)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "AZAR GRANDE") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(member.roles.cache.has(Ids.unicos.Desgraca)){
                                await interaction.channel.send({content: "Ele já tem esse produto!", ephemeral: true})
                                return;
                            }
                            member.roles.add(Ids.unicos.Desgraca)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "GRAVIDADE INVERTIDA") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(member.roles.cache.has(Ids.unicos.Contracao)){
                                await interaction.channel.send({content: "Ele já tem esse produto!", ephemeral: true})
                                return;
                            }
                            member.roles.add(Ids.unicos.Contracao)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "RETIRADA DA CALL") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(member.roles.cache.has(mestre) || botModo.modo == "Sessão"){
                                await interaction.channel.send({content: "Não tenho permissão para fazer isso", ephemeral: true})
                                return;
                            } 
                            const nickname = user.nickname ? user.nickname : user.user.username;
                            member.timeout(1000, `O ${nickname} comprou Timeout de 1s em você.`)
                            response = 'Compra realizada com sucesso!'
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                                     
                }

                if (i.customId === 'pagina_anterior') {
                    paginaAtual--;
                } else if (i.customId === 'proxima_pagina') {
                    paginaAtual++;
                }

                const novoEmbed = gerarEmbed(paginaAtual);
                const novosBotoes = gerarBotoes(paginaAtual);

                await i.update({
                    embeds: [novoEmbed],
                    components: [novosBotoes],
                });
            } catch (error) {
                console.error("Erro na coleta de interação:", error);
            }
        });

        collector.on('end', async () => {
            await interaction.editReply({
                components: [],
            });
        });
    },
};
