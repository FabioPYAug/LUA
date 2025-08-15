const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'comunidade', 'tokens.json');
const tokenDoDiaPath = path.join(__dirname, '..', 'comunidade', 'tokens_do_dia.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const cooldowns = new Map();
const COOLDOWN_MS = 12 * 60 * 60 * 1000;
const { adicionarRole, aplicarDinheiro, Ids } = require('../includes/functions.js');

const sequencias = path.join(__dirname, '..', 'comunidade', 'sequencia.json');

function clearCooldown(userId) {
    cooldowns.delete(userId);
}

function clearAllCooldowns() {
    cooldowns.clear();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('personagem')
        .setDescription('Tente adivinhar o personagem do dia!')
        .addStringOption(option =>
            option
                .setName('opcao')
                .setDescription('Escolha um personagem')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const suggestions = data
            .filter(token =>
                token.nome.toLowerCase().includes(focusedValue)
            )
            .map(token => ({
                name: token.nome,
                value: token.nome
            }));

        await interaction.respond(suggestions.slice(0, 25));
    },

    async execute(interaction) {
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

        let tokenDoDia;
        try {
            const tokenData = fs.readFileSync(tokenDoDiaPath, 'utf8').trim();
            tokenDoDia = JSON.parse(tokenData);
        } catch (err) {
            return interaction.reply({
                content: '❌ Não foi possível verificar o token do dia.',
                ephemeral: true
            });
        }

        const nomeCorreto = tokenDoDia.nome.toLowerCase();

        // Carregar sequencia.json para atualizar dados do usuário
        const sequenciaData = JSON.parse(fs.readFileSync(sequencias, 'utf8'));
        let stats = null;

        if (usuarioCerto) {
            const [nomeUsuario] = usuarioCerto;
            if (!sequenciaData.personagem[nomeUsuario]) {
                sequenciaData.personagem[nomeUsuario] = { sequencia: 0, acertos: 0, erros: 0 };
            }
            stats = sequenciaData.personagem[nomeUsuario];

            if (nomeSelecionado === nomeCorreto) {
                stats.sequencia += 1;
                stats.acertos += 1;
            } else {
                stats.sequencia = 0;
                stats.erros += 1;
            }

            fs.writeFileSync(sequencias, JSON.stringify(sequenciaData, null, 2), 'utf8');
        }

        const embed = new EmbedBuilder()
            .setColor(nomeSelecionado === nomeCorreto ? 0x00ff00 : 0xff0000)
            .setTitle(nomeSelecionado === nomeCorreto ? "🎉 Acertou!" : "❌ Errou!")
            .setDescription(`# <@${interaction.user.id}> errou o token do dia...`)
            .addFields(
                { name: "Sequência", value: stats ? `${stats.sequencia}` : "—", inline: true },
                { name: "Acertos", value: stats ? `${stats.acertos}` : "—", inline: true },
                { name: "Erros", value: stats ? `${stats.erros}` : "—", inline: true }
            )
            .setTimestamp();

        if (nomeSelecionado === nomeCorreto) {
            const member = interaction.member;
            await interaction.reply({ embeds: [embed], ephemeral: true });

            await adicionarRole(member, Ids.unicos.Glorificado, "BFFS");
            await aplicarDinheiro(member, 1000, interaction.guild);

        } else {
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },

    clearCooldown,
    clearAllCooldowns
};
