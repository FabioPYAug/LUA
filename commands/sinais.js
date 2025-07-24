const { SlashCommandBuilder } = require("discord.js");

const autorizado = ["424982351593078785"];
const mensagensPredefinidas = [
    ["Mensagem 1", "https://i.postimg.cc/PfMZkM6T/1.png", "https://i.postimg.cc/nzNQ3dTt/1.png", "https://i.postimg.cc/gk2PMYXm/1.png", "https://i.postimg.cc/pTJgZ7Pm/1.png", "https://i.postimg.cc/qBQP69mY/2.png", "https://i.postimg.cc/kX4kQfz5/1.png", "https://i.postimg.cc/CLQ9mbps/2.png", "https://i.postimg.cc/P5v9cNts/1.png", "https://i.postimg.cc/DzVHKFZW/1.png", "https://i.postimg.cc/J0dYYCvz/3.png", "https://i.postimg.cc/J4G2DtHD/1.png", "https://i.postimg.cc/QMr4yb41/3.png", "https://i.postimg.cc/PxX6tqkq/4.png", "https://i.postimg.cc/j5MMCrs4/1.png", "https://i.postimg.cc/7PQBkDtx/4.png", "https://i.postimg.cc/8zLwMvp5/1.png", "https://i.postimg.cc/zBGksPnb/1.png"]
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sinais")
        .setDescription("Envia sinais para usuários específicos")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Escolha o usuário para enviar os sinais.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("mensagem")
                .setDescription("Escolha a mensagem para enviar.")
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async execute(interaction) {
        const userId = interaction.user.id;
        if (!autorizado.includes(userId)) {
            return await interaction.reply({
                content: "Você não tem permissão para usar este comando.",
                ephemeral: true,
            });
        }
        const targetUser = interaction.options.getUser("usuario");
        const mensagemNome = interaction.options.getString("mensagem");
        const mensagem = mensagensPredefinidas.find(msg => msg[0] === mensagemNome);

        if (!mensagem) {
            return await interaction.reply({
                content: "Mensagem não encontrada. Verifique sua escolha.",
                ephemeral: true,
            });
        }

        await interaction.reply({
            content: `Preparando para enviar "${mensagemNome}" para ${targetUser.tag}...`,
            ephemeral: true,
        });

        try {
            for (let i = 1; i < mensagem.length; i++) {
                if (mensagem[i]) {
                    await targetUser.send({ files: [mensagem[i]] });
                }
            }
            await interaction.followUp({
                content: `Sinal "${mensagemNome}" enviado para ${targetUser.tag} com sucesso!`,
                ephemeral: true,
            });
        } catch (error) {
            console.error(`Erro ao enviar sinal para ${targetUser.tag}:`, error);
            await interaction.followUp({
                content: `Ocorreu um erro ao enviar o sinal para ${targetUser.tag}. Verifique o console para mais detalhes.`,
                ephemeral: true,
            });
        }
    },

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);

        if (focusedOption.name === "mensagem") {
            const choices = mensagensPredefinidas.map(([nome]) => nome);
            const filtered = choices.filter(choice =>
                choice.toLowerCase().startsWith(focusedOption.value.toLowerCase())
            );
            await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
        }
    },
};
