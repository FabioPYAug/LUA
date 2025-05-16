const { SlashCommandBuilder } = require("discord.js")
const fs = require('fs');

var timeout = [];
const milesegundos = 86400000;
const segundos = milesegundos / 3600000

module.exports = {
    data: new SlashCommandBuilder()
        .setName("noite")
        .setDescription("Boa Noite!"),

    async execute(interaction) {
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Este comando só pode ser usado uma vez a cada ${segundos} horas!`, ephemeral: true});
        await interaction.reply("# Boa Noite!🌙")

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
    }
}