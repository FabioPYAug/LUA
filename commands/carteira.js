const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const path = require('path');
const fs = require('fs');
const frasespath = path.join(__dirname, '..', 'comunidade', 'dinheiro.json');
const { Ids } = require('../includes/functions.js');
function readDataFromFile() {
    if (fs.existsSync(frasespath)) {
        const JSONDADOS = fs.readFileSync(frasespath, 'utf8');
        return JSON.parse(JSONDADOS);
    }
    return { DINHEIRO: {} };
}

const data = readDataFromFile();

const timeout = [];
const cooldown = 5000; 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('carteira')
        .setDescription('Transferir Zens para um membro'),
    async execute(interaction) {
        const idToNameMap = Object.fromEntries(
            Object.entries(Ids.usuarios).map(([name, id]) => [id, name])
        );

        const user = interaction.member;
        const userId = user.id;

        if (timeout.includes(userId)) {
            return interaction.reply({ content: `Este comando está em cooldown. Espere alguns segundos.`, ephemeral: true });
        }

        const nomePagador = idToNameMap[userId];

        if (!nomePagador) {
            return interaction.reply({ content: 'Usuário não encontrado na lista de registros.', ephemeral: true });
        }

        const carteiraDinheiro = data.DINHEIRO[nomePagador];

        const saldoFormatado = carteiraDinheiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '') + ' Zens';
    
        interaction.reply({ content: `◆━━━━━━━━━━━━━━━━━▣✦▣━━━━━━━━━━━━━━━━━━◆\n\nVocê tem ${saldoFormatado} na carteira ${nomePagador}!\n\n◆━━━━━━━━━━━━━━━━━▣✦▣━━━━━━━━━━━━━━━━━━◆`, ephemeral: true })

        setTimeout(() => {
            const index = timeout.indexOf(userId);
            if (index > -1) timeout.splice(index, 1);
        }, cooldown);
    },
};