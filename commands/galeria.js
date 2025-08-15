const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'comunidade', 'galeria.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const quantidade = data.length;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('galeria')
        .setDescription(`Veja uma das ${quantidade} imagens da galeria do RPG!`)
        .addStringOption(option =>
            option
                .setName('opcao')
                .setDescription('Escolha um token')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const suggestions = data
            .filter(imagem =>
                imagem.nome.toLowerCase().includes(focusedValue) ||
                (imagem.tags && imagem.tags.some(tag => tag.toLowerCase().includes(focusedValue))) ||
                (imagem.Campanha && imagem.Campanha.toLowerCase().includes(focusedValue))
            )

            .map(imagem => ({
                name: imagem.nome,
                value: imagem.nome
            }));

        await interaction.respond(suggestions.slice(0, 25));
    },

    async execute(interaction) {
        const nomeSelecionado = interaction.options.getString('opcao');
        const personagem = data.find(img => img.nome.toLowerCase() === nomeSelecionado.toLowerCase());

        if (!personagem) {
            return interaction.reply({
                content: "❌ Personagem não encontrado.",
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${personagem.nome}`)
            .setImage(personagem.imagem)
            .addFields(
                { name: "**Campanha**", value: personagem.Campanha, inline: false },
                { name: "**Aparição**", value: personagem.Aparição, inline: false }
            )
            .setColor('Random');

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
