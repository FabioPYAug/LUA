const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'comunidade', 'ritual.json');
const ritualDoDiaPath = path.join(__dirname, '..', 'comunidade', 'ritual_do_dia.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const cooldowns = new Map();
const COOLDOWN_MS = 12 * 60 * 60 * 1000;
const { adicionarRole, aplicarDinheiro, Ids } = require('../includes/functions.js');



function clearCooldown(userId) {
    cooldowns.delete(userId);
}

function clearAllCooldowns() {
    cooldowns.clear();
}

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
        const sequencias = path.join(__dirname, '..', 'comunidade', 'sequencia.json');
        const userId = interaction.user.id;
        const now = Date.now();
        const usuarioCerto = Object.entries(Ids.usuarios).find(([nome, id]) => id === userId);

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + COOLDOWN_MS;
            if (now < expirationTime) {
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
                content: 'Não foi possível verificar o ritual do dia.',
                ephemeral: true
            });
        }

        const nomeCorreto = ritualDoDia.nome.toLowerCase();
        let stats = { sequencia: 0, acertos: 0, erros: 0 };

        if (nomeSelecionado === nomeCorreto) {
            if (usuarioCerto) {
                const [nomeUsuario] = usuarioCerto;
                const sequenciaData = JSON.parse(fs.readFileSync(sequencias, 'utf8'));

                if (sequenciaData.ritual[nomeUsuario]) {
                    sequenciaData.ritual[nomeUsuario].sequencia += 1;
                    sequenciaData.ritual[nomeUsuario].acertos += 1;
                    stats = sequenciaData.ritual[nomeUsuario];
                }

                fs.writeFileSync(sequencias, JSON.stringify(sequenciaData, null, 2), 'utf8');
            }

            const member = interaction.member;
            await adicionarRole(member, Ids.unicos.Glorificado, "BFFS");
            await aplicarDinheiro(member, 1000, interaction.guild);

            const embed = new EmbedBuilder()
                .setTitle(' ')
                .setDescription(`# 🎉<@${interaction.user.id}> **acertou o ritual do dia!**`)
                .setColor('Green')
                .addFields(
                    { name: 'Sequência', value: `${stats.sequencia}`, inline: true },
                    { name: 'Acertos', value: `${stats.acertos}`, inline: true },
                    { name: 'Erros', value: `${stats.erros}`, inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } else {
            if (usuarioCerto) {
                const [nomeUsuario] = usuarioCerto;
                const sequenciaData = JSON.parse(fs.readFileSync(sequencias, 'utf8'));

                if (sequenciaData.ritual[nomeUsuario]) {
                    sequenciaData.ritual[nomeUsuario].sequencia = 0;
                    sequenciaData.ritual[nomeUsuario].erros += 1;
                    stats = sequenciaData.ritual[nomeUsuario];
                }

                fs.writeFileSync(sequencias, JSON.stringify(sequenciaData, null, 2), 'utf8');
            }

            const embed = new EmbedBuilder()
                .setTitle(' ')
                .setDescription(`# ❌<@${interaction.user.id}> **errou o ritual do dia...**`)
                .setColor('Red')
                .addFields(
                    { name: 'Sequência', value: `${stats.sequencia}`, inline: true },
                    { name: 'Acertos', value: `${stats.acertos}`, inline: true },
                    { name: 'Erros', value: `${stats.erros}`, inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    },

    clearCooldown,
    clearAllCooldowns
};
