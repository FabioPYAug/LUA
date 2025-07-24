const { SlashCommandBuilder } = require("discord.js")
const { aplicarDinheiro, VerificarDinheiro, Ids } = require('../includes/functions.js');
const fs = require('fs');

var timeout = [];
const milesegundos = 86400000;
const segundos = milesegundos / 3600000

module.exports = {
    data: new SlashCommandBuilder()
        .setName("glória")
        .setDescription("Glória ao Sol!"),

    async execute(interaction) {
        const user = interaction.member;
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Este comando só pode ser usado uma vez a cada ${segundos} horas!`, ephemeral: true});
        await interaction.reply("# Glória ao Sol☀")
        aplicarDinheiro(user, 250, interaction.guild);

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
    }
}