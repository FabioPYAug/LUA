const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'comunidade', 'ritual.json');
const ritualDoDiaPath = path.join(__dirname, '..', 'comunidade', 'ritual_do_dia.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const cooldowns = new Map();
const COOLDOWN_MS = 12 * 60 * 60 * 1000;
const { adicionarRole, aplicarDinheiro, Ids } = require('../includes/functions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ritual')
        .setDescription('Tente adivinhar o ritual do dia!')
        .addStringOption(option =>
            option
                .setName('opcao')
                .setDescription('Escolha um ritual')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const suggestions = data
            .filter(ritual =>
                ritual.nome.toLowerCase().includes(focusedValue)
            )
            .map(ritual => ({
                name: ritual.nome,
                value: ritual.nome
            }));

        await interaction.respond(suggestions.slice(0, 25));
    },

    async execute(interaction) {
        const userId = interaction.user.id;
        const now = Date.now();

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + COOLDOWN_MS;
            if (now < expirationTime) {
                const timeLeft = expirationTime - now;
                const hours = Math.floor(timeLeft / (60 * 60 * 1000));
                const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

                return interaction.reply({
                    content: `⏳ Você já teve a sua tentativa de hoje!!`,
                    ephemeral: true
                });
            }
        }

        cooldowns.set(userId, now);

        const nomeSelecionado = interaction.options.getString('opcao').toLowerCase();

        let ritualDoDia;
        try {
            const ritualData = fs.readFileSync(ritualDoDiaPath, 'utf8').trim();
            ritualDoDia = JSON.parse(ritualData);
        } catch (err) {
            return interaction.reply({
                content: '❌ Não foi possível verificar o ritual do dia.',
                ephemeral: true
            });
        }

        const nomeCorreto = ritualDoDia.nome.toLowerCase();

        if (nomeSelecionado === nomeCorreto) {
            const member = interaction.member;

            await adicionarRole(member, Ids.unicos.Glorificado, "BFFS");
            await aplicarDinheiro(member, 5000, interaction.guild);

            await interaction.reply({
                content: `O usuário <@${interaction.user.id}> acertou >:D`
            });
        } else {
            await interaction.reply({
                content: `Você errou. Tente novamente uma próxima vez :/`,
                ephemeral: true
            });
        }
    }
};
