const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Envia as informações do seu User no Server!"),

    async execute(interaction) {
        const user = interaction.user;
        const member = interaction.guild.members.cache.get(user.id); 
        const accessibleChannels = interaction.guild.channels.cache.filter(channel =>
            channel.permissionsFor(member).has("ViewChannel")
        );
        const activities = member.presence?.activities.map(activity => activity.name).join(", ") || "Nenhuma";

        const devices = member.presence?.clientStatus
    ? Object.keys(member.presence.clientStatus).join(", ")
    : "Desconhecido";

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Informações de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Nome de Usuário", value: user.username, inline: true },
                { name: "Status", value: member.presence?.status || "Offline", inline: true },
                { name: "Data de Criação da Conta", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
                { name: "Data de Entrada no Servidor", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
                { name: "Quantidade de Canais Acessíveis", value: `${accessibleChannels.size}`, inline: true },
                { name: "Conectado via", value: devices, inline: true },
                { name: "Atividade Atual", value: activities, inline: true },
                { name: "Boost no Servidor", value: member.premiumSince ? "Sim" : "Não", inline: true },
            )
            .setFooter({ text: `Informações requisitadas por ${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();


        await interaction.reply({ embeds: [embed] });
    }
};
