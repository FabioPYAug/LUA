const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Envia as informações do servidor!"),

    async execute(interaction) {
        const { guild } = interaction;
        const totalMembers = guild.memberCount;
        const totalRoles = guild.roles.cache.size;
        const totalChannels = guild.channels.cache.size;
        const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size;
        const categories = guild.channels.cache.filter(channel => channel.type === 4).size;
        const totalBoosts = guild.premiumSubscriptionCount || 0;
        const totalEmojis = guild.emojis.cache.size;
        const boostTier = guild.premiumTier;
        const botsCount = guild.members.cache.filter(m => m.user.bot).size;

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Informações do Servidor: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: "Nome do Servidor", value: guild.name, inline: false },
                { name: "Data de Criação", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
                { name: "Proprietário", value: `<@${guild.ownerId}>`, inline: false },
                { name: "Membros", value: `${totalMembers}`, inline: true },
                { name: "Bots", value: `${botsCount}`, inline: true },
                { name: "Cargos", value: `${totalRoles}`, inline: true },
                { name: "Total de Canais", value: `${totalChannels}`, inline: false },
                { name: "Canais de Texto", value: `${textChannels}`, inline: true },
                { name: "Canais de Voz", value: `${voiceChannels}`, inline: true },
                { name: "Categorias", value: `${categories}`, inline: true },
                { name: "Emojis Disponíveis", value: `${totalEmojis}`, inline: true },
                { name: "Boosts no Servidor", value: `${totalBoosts}`, inline: true },
                { name: "Nível de Boost", value: `Nível ${boostTier}`, inline: true }
            )
            .setFooter({ text: `Informações requisitadas por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
