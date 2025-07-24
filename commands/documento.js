const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'comunidade', 'documentos.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('documentos')
        .setDescription('Escolha um documento de RPG.')
        .addStringOption(option =>
            option.setName('documento')
                .setDescription('Escolha um documento ou pesquise por tags.')
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
        const selectedValue = interaction.options.getString('documento');
        const [category, docTitle] = selectedValue.split(',');

        const documents = data[category];
        if (!documents || !documents[docTitle]) {
            return interaction.reply({ content: 'Documento não encontrado.', ephemeral: true });
        }

        const docData = documents[docTitle];
        const docLink = docData.link;
        const responseMessage = `Aqui está o documento **${docTitle}** da campanha **${category}**`;

        try {
            await interaction.reply({ content: 'Enviando Documento no privado...', ephemeral: true });
            await interaction.user.send({ content: responseMessage, files: [{ attachment: docLink }] });
        } catch (error) {
            await interaction.reply({ content: 'Não foi possível enviar a mensagem no privado.', ephemeral: true });
        }
    },
};
