const { SlashCommandBuilder } = require('@discordjs/builders');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'comunidade', 'reports.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Escreva um feedback de um bug ou ideia para o Sol!')
        .addStringOption(option =>
            option.setName('feedback')
                .setDescription('Local onde irá escrever o Feedback.')
                .setRequired(true)),
    async execute(interaction) {
        const reportContent = interaction.options.getString('feedback');

        let reports = [];
        
        if (existsSync(filePath)) {
            const data = readFileSync(filePath);
            reports = JSON.parse(data);
        }

        reports.push({
            user: interaction.user.tag,
            content: reportContent,
            timestamp: new Date().toISOString()
        });

        writeFileSync(filePath, JSON.stringify(reports, null, 2));

        await interaction.reply({ content: 'Feedback salvo com sucesso!', ephemeral: true });
    }
};
