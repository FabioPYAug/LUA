const { SlashCommandBuilder } = require('@discordjs/builders');

const adm = "1099030674574422107"
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Apaga as últimas mensagens enviadas no canal')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Número de mensagens a serem apagadas')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.member;
        const quantidade = interaction.options.getInteger('quantidade');

        if (!user.roles.cache.has(adm)) {
            return interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
        }

        if (quantidade < 1 || quantidade > 100) {
            return interaction.reply({ content: 'Por favor, insira um número entre 1 e 100.', ephemeral: true });
        }

        try {
            const deletedMessages = await interaction.channel.bulkDelete(quantidade, true);
            await interaction.reply({ content: `**A sombra púrpura da Lua tirou ${deletedMessages.size} purezas e bondades daqui**`});
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Houve um erro ao tentar apagar as mensagens.', ephemeral: true });
        }
    },
};