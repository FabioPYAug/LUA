const { SlashCommandBuilder } = require("discord.js");
const fs = require('fs');
const adm = "1099030674574422107";

const timeout = [];
const milesegundos = 86400000; 
const segundos = milesegundos / 3600000;

const perfis = {
    bobby: {
        nome: "Bobby",
        avatar: "https://i.postimg.cc/NFsQsd2h/MALDI-O-DO-CAOS.png"
    },
    sol: {
        nome: "Sol",
        avatar: "https://i.postimg.cc/MZ5WPJgz/SOL-BOT.png"
    },
    lua: {
        nome: "Lua",
        avatar: "https://images2.imgbox.com/5d/a8/gTzRXdi9_o.png"
    },
    transmissor: {
        nome: "Transmissor",
        avatar: "https://i.postimg.cc/J0pMGjjs/PC.png"
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("perfil")
        .setDescription("Escolha a skin de perfil com estilo.")
        .addStringOption(option =>
            option.setName("perfil")
                .setDescription("Escolha um perfil para a boa noite.")
                .setRequired(true)
                .addChoices(
                    { name: 'Bobby', value: 'bobby' },
                    { name: 'Sol', value: 'sol' },
                    { name: 'Lua', value: 'lua' },
                    { name: 'Transmissor', value: 'transmissor' }
                )
        ),

    async execute(interaction) {
        const user = interaction.member;
        const escolha = interaction.options.getString("perfil");

        if (timeout.includes(interaction.user.id)) {
            return await interaction.reply({
                content: `Este comando só pode ser usado uma vez a cada ${segundos} horas!`,
                ephemeral: true
            });
        }

        if (!user.roles.cache.has(adm)) {
            return interaction.reply({
                content: 'Você não tem permissão para usar este comando.',
                ephemeral: true
            });
        }

        const perfil = perfis[escolha];
        if (!perfil) {
            return interaction.reply({
                content: "Perfil não encontrado.",
                ephemeral: true
            });
        }

        await interaction.reply(`# Obrigado por mudar a minha skin! \nAlterando para o perfil: **${perfil.nome}**`);

        try {
            await interaction.client.user.setAvatar(perfil.avatar);
            await interaction.client.user.setUsername(perfil.nome);
        } catch (error) {
            return interaction.followUp({
                content: `Erro ao atualizar o perfil: ${error.message}`,
                ephemeral: true
            });
        }

        timeout.push(interaction.user.id);
        setTimeout(() => {
            const index = timeout.indexOf(interaction.user.id);
            if (index !== -1) timeout.splice(index, 1);
        }, milesegundos);
    }
};
