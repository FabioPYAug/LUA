const { SlashCommandBuilder } = require("discord.js");

const autorizado = ["424982351593078785"]; 
const imagensPorUsuario = {
    "1054515144950030356": [ 
        "https://i.postimg.cc/PfMZkM6T/1.png",
        "https://i.postimg.cc/nzNQ3dTt/1.png",
        "https://i.postimg.cc/gk2PMYXm/1.png",
        "https://i.postimg.cc/pTJgZ7Pm/1.png",
        "https://i.postimg.cc/qBQP69mY/2.png",
        "https://i.postimg.cc/kX4kQfz5/1.png",
        "https://i.postimg.cc/CLQ9mbps/2.png",
        "https://i.postimg.cc/P5v9cNts/1.png",
        "https://i.postimg.cc/DzVHKFZW/1.png",
        "https://i.postimg.cc/J0dYYCvz/3.png",
        "https://i.postimg.cc/J4G2DtHD/1.png",
        "https://i.postimg.cc/QMr4yb41/3.png",
        "https://i.postimg.cc/PxX6tqkq/4.png",
        "https://i.postimg.cc/j5MMCrs4/1.png",
        "https://i.postimg.cc/7PQBkDtx/4.png",
        "https://i.postimg.cc/8zLwMvp5/1.png",
        "https://i.postimg.cc/zBGksPnb/1.png"
    ],
    "862809964401393665": [ 
        "https://i.postimg.cc/PfMZkM6T/1.png",
        "https://i.postimg.cc/nzNQ3dTt/1.png",
        "https://i.postimg.cc/gk2PMYXm/1.png",
        "https://i.postimg.cc/pTJgZ7Pm/1.png",
        "https://i.postimg.cc/qBQP69mY/2.png",
        "https://i.postimg.cc/kX4kQfz5/1.png",
        "https://i.postimg.cc/CLQ9mbps/2.png",
        "https://i.postimg.cc/P5v9cNts/1.png",
        "https://i.postimg.cc/DzVHKFZW/1.png",
        "https://i.postimg.cc/J0dYYCvz/3.png",
        "https://i.postimg.cc/J4G2DtHD/1.png",
        "https://i.postimg.cc/QMr4yb41/3.png",
        "https://i.postimg.cc/PxX6tqkq/4.png",
        "https://i.postimg.cc/j5MMCrs4/1.png",
        "https://i.postimg.cc/7PQBkDtx/4.png",
        "https://i.postimg.cc/8zLwMvp5/1.png",
        "https://i.postimg.cc/zBGksPnb/1.png"
    ],
    "1002730228998742067": [ 
        "https://i.postimg.cc/PfMZkM6T/1.png",
        "https://i.postimg.cc/nzNQ3dTt/1.png",
        "https://i.postimg.cc/gk2PMYXm/1.png",
        "https://i.postimg.cc/pTJgZ7Pm/1.png",
        "https://i.postimg.cc/qBQP69mY/2.png",
        "https://i.postimg.cc/kX4kQfz5/1.png",
        "https://i.postimg.cc/CLQ9mbps/2.png",
        "https://i.postimg.cc/P5v9cNts/1.png",
        "https://i.postimg.cc/DzVHKFZW/1.png",
        "https://i.postimg.cc/J0dYYCvz/3.png",
        "https://i.postimg.cc/J4G2DtHD/1.png",
        "https://i.postimg.cc/QMr4yb41/3.png",
        "https://i.postimg.cc/PxX6tqkq/4.png",
        "https://i.postimg.cc/j5MMCrs4/1.png",
        "https://i.postimg.cc/7PQBkDtx/4.png",
        "https://i.postimg.cc/8zLwMvp5/1.png",
        "https://i.postimg.cc/zBGksPnb/1.png"
    ],
    "340298478494154752": [ 
        "https://i.postimg.cc/PfMZkM6T/1.png",
        "https://i.postimg.cc/nzNQ3dTt/1.png",
        "https://i.postimg.cc/gk2PMYXm/1.png",
        "https://i.postimg.cc/pTJgZ7Pm/1.png",
        "https://i.postimg.cc/qBQP69mY/2.png",
        "https://i.postimg.cc/kX4kQfz5/1.png",
        "https://i.postimg.cc/CLQ9mbps/2.png",
        "https://i.postimg.cc/P5v9cNts/1.png",
        "https://i.postimg.cc/DzVHKFZW/1.png",
        "https://i.postimg.cc/J0dYYCvz/3.png",
        "https://i.postimg.cc/J4G2DtHD/1.png",
        "https://i.postimg.cc/QMr4yb41/3.png",
        "https://i.postimg.cc/PxX6tqkq/4.png",
        "https://i.postimg.cc/j5MMCrs4/1.png",
        "https://i.postimg.cc/7PQBkDtx/4.png",
        "https://i.postimg.cc/8zLwMvp5/1.png",
        "https://i.postimg.cc/zBGksPnb/1.png"
    ],
    "309439524730044448": [ 
        "https://i.postimg.cc/PfMZkM6T/1.png",
        "https://i.postimg.cc/nzNQ3dTt/1.png",
        "https://i.postimg.cc/gk2PMYXm/1.png",
        "https://i.postimg.cc/pTJgZ7Pm/1.png",
        "https://i.postimg.cc/qBQP69mY/2.png",
        "https://i.postimg.cc/kX4kQfz5/1.png",
        "https://i.postimg.cc/CLQ9mbps/2.png",
        "https://i.postimg.cc/P5v9cNts/1.png",
        "https://i.postimg.cc/DzVHKFZW/1.png",
        "https://i.postimg.cc/J0dYYCvz/3.png",
        "https://i.postimg.cc/J4G2DtHD/1.png",
        "https://i.postimg.cc/QMr4yb41/3.png",
        "https://i.postimg.cc/PxX6tqkq/4.png",
        "https://i.postimg.cc/j5MMCrs4/1.png",
        "https://i.postimg.cc/7PQBkDtx/4.png",
        "https://i.postimg.cc/8zLwMvp5/1.png",
        "https://i.postimg.cc/zBGksPnb/1.png"
    ],
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("enviar-sinais")
        .setDescription("Envia imagens por DM para usuários específicos"),

    async execute(interaction) {
        const userId = interaction.user.id;

        if (!autorizado.includes(userId)) {
            return await interaction.reply({
                content: "Você não tem permissão para usar este comando.",
                ephemeral: true
            });
        }

        await interaction.reply({ content: "Enviando os presentes...", ephemeral: true });

        const client = interaction.client;

        for (const [targetId, imagens] of Object.entries(imagensPorUsuario)) {
            try {
                const user = await client.users.fetch(targetId);

                for (const url of imagens) {
                    await user.send({ files: [url] });
                }

            } catch (error) {
                console.error(`Erro ao enviar para ${targetId}:`, error);
            }
        }
    }
};
