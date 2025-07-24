const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const os = require("os");
const { dados } = require('../includes/dados.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Envia informações sobre o bot!"),

    async execute(interaction) {
        const client = interaction.client;

        const ping = client.ws.ping;
        const uptime = Math.floor(client.uptime / 1000);
        const totalGuilds = client.guilds.cache.size;
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const embed = new EmbedBuilder()
            .setColor(`${dados.cor}`)
            .setTitle(`${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Ping", value: `${ping}ms`, inline: false },
                { name: "Versão do bot", value: `${dados.botVersion}`, inline: true },
                { name: "Uptime", value: `<t:${Math.floor(Date.now() / 1000 - uptime)}:R>`, inline: true },
                { name: "Servidores Monitorados", value: `${totalGuilds}`, inline: true },
                { name: "Usuários Atendidos", value: `${totalUsers}`, inline: true },
                { name: "Uso de Memória", value: `${memoryUsage} MB`, inline: true },
                { name: "Bibliotecas", value: "discord.js e Node.js", inline: true },
            )
            .setFooter({ text: "Obrigado por usar a Lua :D"})
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
