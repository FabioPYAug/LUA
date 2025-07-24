const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timer")
        .setDescription("Configura um timer para receber uma mensagem privada.")
        .addIntegerOption(option => 
            option.setName("minutos")
                .setDescription("Quantos minutos o timer deve durar.")
                .setRequired(true)),

    async execute(interaction) {
        const minutos = interaction.options.getInteger("minutos");

        if (minutos <= 0) {
            return await interaction.reply({ 
                content: "Por favor, insira um valor válido de minutos (maior que 0).", 
                ephemeral: true 
            });
        }

        await interaction.reply({ 
            content: `Timer de ${minutos} minuto(s) configurado! A Lua irá te enviar uma mensagem no privado quando o timer acabar.`, 
            ephemeral: true 
        });

        const milissegundos = minutos * 60 * 1000;
        setTimeout(async () => {
            try {
                await interaction.user.send(`Seu timer de ${minutos} minuto(s) terminou!`);
            } catch (error) {
                console.error("Erro ao enviar mensagem privada:", error);
            }
        }, milissegundos);
    }
};
