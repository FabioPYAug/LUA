const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Ids, TIRARNEGATIVO } = require('../includes/functions.js');
const fs = require('fs');
const path = require('path');
const imagenspath = path.join(__dirname, '..', 'comunidade', 'imagens.json');
const frasespath = path.join(__dirname, '..', 'comunidade', 'dinheiro.json');

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
        .setName('loja')
        .setDescription('Acesse a loja para comprar itens'),
    async execute(interaction) {
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
            { nome: 'ANIMAL ALEATÓRIO', preco: 5, descricao: 'Irá enviar uma imagem de um Animal Aleatório' },
            { nome: 'MEME ALEATÓRIO', preco: 5, descricao: 'Irá enviar uma imagem de um Meme Aleatório' },
            { nome: 'DOCUMENTO ALEATÓRIO', preco: 5, descricao: 'Irá enviar uma imagem de um Documento Aleatório' },
            { nome: 'ÁGIL', preco: 2500, descricao: 'Irá dar o efeito Ágil' },
            { nome: 'ENTRELAÇADOS', preco: 5000, descricao: 'Irá dar o efeito Entrelaçados' },
            { nome: 'SORTE PEQUENA', preco: 5000, descricao: 'Irá dar Sorte Pequena' },
            { nome: 'SORTE MÉDIA', preco: 10000, descricao: 'Irá dar Sorte Média' },
            { nome: 'PROTEGIDO', preco: 15000, descricao: 'Irá dar o efeito Protegido' },
            { nome: 'SORTE GRANDE', preco: 17777, descricao: 'Irá dar Sorte Grande' },
            { nome: 'HIGIENIZAR IMPUREZAS', preco: 30000, descricao: 'Irá limpar os status negativos' },
        ];

        const itensPorPagina = 3;
        let paginaAtual = 0;

        function gerarEmbed(pagina) {
            const startIndex = pagina * itensPorPagina;
            const itensPagina = itens.slice(startIndex, startIndex + itensPorPagina);

            const embed = new EmbedBuilder()
                .setTitle('𝙻𝙾𝙹𝙰 𝙴𝙲𝙲𝙻𝙴𝚂𝙸𝙰')
                .setDescription('Ecclesia é a MAIOR loja de Zoystea! Tendo tudo que um aventureiro, fazendeiro ou até morador quer!\n\nEscolha qual desses itens você deseja!')
                .setColor('Green');

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

                    if (itemComprado.nome === "ANIMAL ALEATÓRIO") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            const imagensData = JSON.parse(fs.readFileSync(imagenspath, 'utf-8'));
                            const randomAnimal = imagensData.imagens.animais[
                                Math.floor(Math.random() * imagensData.imagens.animais.length)
                            ];
                            await interaction.channel.send({ content: randomAnimal });
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "MEME ALEATÓRIO") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            const imagensData = JSON.parse(fs.readFileSync(imagenspath, 'utf-8'));
                            const randomAnimal = imagensData.imagens.memes[
                                Math.floor(Math.random() * imagensData.imagens.memes.length)
                            ];
                            await interaction.channel.send({ content: randomAnimal });
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "DOCUMENTO ALEATÓRIO") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            const imagensData = JSON.parse(fs.readFileSync(imagenspath, 'utf-8'));
                            const randomAnimal = imagensData.imagens.documentos[
                                Math.floor(Math.random() * imagensData.imagens.documentos.length)
                            ];
                            await interaction.channel.send({ content: randomAnimal });
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "ENTRELAÇADOS") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(user.roles.cache.has(Ids.positivos.Entrelacados)){
                                await interaction.channel.send({content: "Você já tem esse produto!", ephemeral: true})
                                return;
                            }
                            interaction.member.roles.add(Ids.positivos.Entrelacados)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "ÁGIL") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(user.roles.cache.has(Ids.positivos.rapido)){
                                await interaction.channel.send({content: "Você já tem esse produto!", ephemeral: true})
                                return;
                            }
                            interaction.member.roles.add(Ids.positivos.rapido)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "PROTEGIDO") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(user.roles.cache.has(Ids.positivos.Protegido)){
                                await interaction.channel.send({content: "Você já tem esse produto!", ephemeral: true})
                                return;
                            }
                            interaction.member.roles.add(Ids.positivos.Protegido)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "HIGIENIZAR IMPUREZAS") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            TIRARNEGATIVO(user)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "SORTE PEQUENA") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(user.roles.cache.has(Ids.unicos.Venturado)){
                                await interaction.channel.send({content: "Você já tem esse produto!", ephemeral: true})
                                return;
                            }
                            interaction.member.roles.add(Ids.unicos.Venturado)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "SORTE MÉDIA") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(user.roles.cache.has(Ids.unicos.Afortunado)){
                                await interaction.channel.send({content: "Você já tem esse produto!", ephemeral: true})
                                return;
                            }
                            interaction.member.roles.add(Ids.unicos.Afortunado)
                            await atualizarInteracao(i, `Você comprou: ${itemComprado.nome}! Obrigado pela sua compra!`);
                        } else {
                            await atualizarInteracao(i, "Você não tem dinheiro suficiente para comprar este item!");
                        }
                        return;
                    }
                    if (itemComprado.nome === "SORTE GRANDE") {
                        const compraBemSucedida = await Compra(carteiraDinheiro, itemComprado.preco, nomePagador);
                        if (compraBemSucedida) {
                            if(user.roles.cache.has(Ids.unicos.Contingente)){
                                await interaction.channel.send({content: "Você já tem esse produto!", ephemeral: true})
                                return;
                            }
                            interaction.member.roles.add(Ids.unicos.Contingente)
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
