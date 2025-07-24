const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cara")
        .setDescription("Cara ou Coroa?"),

    async execute(interaction) {
        const resultados = ["Cara", "Coroa"];
        const resultado = resultados[Math.floor(Math.random() * resultados.length)];
        const embed = new EmbedBuilder()
            .setColor(resultado === "Cara" ? "Green" : "Red")
            .setTitle("👤 Cara ou Coroa 👑")
            .setDescription(`O resultado é: **${resultado}**!`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
