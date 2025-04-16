const { SlashCommandBuilder } = require("discord.js")
const fs = require('fs');
const adm = "1099030674574422107"

var timeout = [];
const milesegundos = 86400000;
const segundos = milesegundos / 3600000

module.exports = {
    data: new SlashCommandBuilder()
        .setName("noite")
        .setDescription("Boa Noite"),

    async execute(interaction) {
        user = interaction.member
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Este comando só pode ser usado uma vez a cada ${segundos} horas!`, ephemeral: true});
        if (!user.roles.cache.has(adm)) {
            return interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
        }
        await interaction.reply("# Boa Noite🌙")
        const nomenormal = "Lua"
        const avatarnormal = 'https://images2.imgbox.com/5d/a8/gTzRXdi9_o.png'; 
        interaction.client.user.setAvatar(avatarnormal);
        interaction.client.user.setUsername(nomenormal);

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
    }
}