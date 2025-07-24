const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'comunidade', 'musicas.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('musicasop')
        .setDescription('Escolha uma música de Ordem Paranormal')
        .addStringOption(option =>
            option.setName('musicas')
                .setDescription('Escolha uma música ou pesquise por tags.')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const suggestions = [];

        Object.entries(data).forEach(([category, documents]) => {
            Object.entries(documents).forEach(([docTitle, docData]) => {
                const tags = docData.tags || [];
                const combinedSearchSpace = [
                    { type: 'title', value: docTitle.toLowerCase() },
                    { type: 'category', value: category.toLowerCase() },
                    ...tags.map(tag => ({ type: 'tag', value: tag.toLowerCase() }))
                ];
                let score = 0;
                combinedSearchSpace.forEach(item => {
                    if (item.value.includes(focusedValue)) {
                        if (item.type === 'title') score += 3; 
                        if (item.type === 'tag') score += 2;  
                        if (item.type === 'category') score += 1; 
                    }
                });

                if (score > 0) {
                    const displayName = `${category} - ${docTitle}`.slice(0, 100);
                    suggestions.push({
                        name: displayName,
                        value: `${category},${docTitle}`,
                        score
                    });
                }
            });
        });

        const sortedSuggestions = suggestions
            .sort((a, b) => b.score - a.score)
            .slice(0, 25);

        await interaction.respond(sortedSuggestions.map(s => ({
            name: s.name,
            value: s.value
        })));
    },

    async execute(interaction) {
        const selectedValue = interaction.options.getString('musicas');
        const [category, docTitle] = selectedValue.split(',');

        const documents = data[category];
        if (!documents || !documents[docTitle]) {
            return interaction.reply({ content: 'Documento não encontrado.', ephemeral: true });
        }

        const docData = documents[docTitle];
        const docLink = docData.link;
        const responseMessage = `m!p ${docLink}`;

        try {
            await interaction.reply({ content: responseMessage, ephemeral: true });
        } catch (error) {
            await interaction.reply({ content: 'Houve um erro ao enviar a resposta.', ephemeral: true });
        }
    },
};
