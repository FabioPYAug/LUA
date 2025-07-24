const { SlashCommandBuilder } = require('@discordjs/builders');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const path = require('path');
const { report } = require('process');

const filePath = path.join(__dirname, '..', 'comunidade', 'citações.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('citar')
        .setDescription('Escreva uma citação para a Lua!')
        .addStringOption(option =>
            option.setName('citação')
                .setDescription('Escreva a sua citação.')
                .setRequired(true)),
    async execute(interaction) {
        const conteudo = interaction.options.getString('citação');

        let reports = [];
        
        if (existsSync(filePath)) {
            const data = readFileSync(filePath);
            reports = JSON.parse(data);
        }
        var user = interaction.user.username;
        var data = new Date().toISOString();
        var ano = data.substring(0, 4);
        reports.push(`*"${conteudo}" - ${user}, ${ano}*`);


        writeFileSync(filePath, JSON.stringify(reports, null, 2));
        await interaction.reply({ content: 'Citação salva com sucesso!', ephemeral: true });
    }
};
