const { SlashCommandBuilder} = require("discord.js");
const path = require('path');
const fs = require('fs');
const { info } = require("console");
const frasespath = path.join(__dirname, '..', 'comunidade', 'bot.json');
const adm = "1099030674574422107"

//PATH DAS FRASES
function readDataFraseFromFile() {
    if (fs.existsSync(frasespath)) {
        const JSONDADOS = fs.readFileSync(frasespath, 'utf8');
        return JSON.parse(JSONDADOS);
    }
}
function writeDataFraseToFile(botfrase) {
    const jsonString = JSON.stringify(botfrase, null, 2);
    fs.writeFileSync(frasespath, jsonString, 'utf8');
}
const botfrase = readDataFraseFromFile();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sessao")
        .setDescription("Qual modo o bot ficará")
        .addStringOption(option => 
            option.setName("opção")
                .setDescription("Escolha entre Sim ou Não")
                .setRequired(true)
                .addChoices(
                    { name: "Modo Sessão", value: "sessao" },
                    { name: "Modo Padrão", value: "padrao" }
                )
        ),

    async execute(interaction) {
        user = interaction.member
        const escolha = interaction.options.getString("opção");

        if (!user.roles.cache.has(adm)) {
            return interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
        }

        if (escolha === "sessao") {
            botfrase.modo = "Sessão"
            await interaction.reply({content: "Ativando o modo Sessão...", ephemeral: true});
        } else if (escolha === "padrao") {
            botfrase.modo = "Padrão"
            await interaction.reply({content: "Ativando o Modo Padrão...", ephemeral: true});
        } else {
            botfrase.modo = "Padrão"
            await interaction.reply("Opção inválida."); 
        }
        writeDataFraseToFile(botfrase)
    },
};
