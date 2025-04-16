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

function writeDataToFile(data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(frasespath, jsonString, 'utf8');
}

const data = readDataFromFile();

const timeout = [];
const cooldown = 5000; 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pix')
        .setDescription('Transferir Zens para um membro')
        .addIntegerOption(option =>
            option.setName('valor')
                .setDescription('Valor de Zens a transferir')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('membro')
                .setDescription('O membro que receberá o valor')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('Mensagem extra para o membro')
                .setRequired(false)),
    async execute(interaction) {
        const idToNameMap = Object.fromEntries(
            Object.entries(Ids.usuarios).map(([name, id]) => [id, name])
        );

        const user = interaction.member;
        const userId = user.id;
        const member = interaction.options.getMember('membro');
        const memberId = member.id;
        const valorint = interaction.options.getInteger('valor');
        const mensagem = interaction.options.getString('mensagem') || 'Sem mensagem adicional';

        if (timeout.includes(userId)) {
            return interaction.reply({ content: `Este comando está em cooldown. Espere alguns segundos.`, ephemeral: true });
        }

        const nomePagador = idToNameMap[userId];
        const nomeRecebedor = idToNameMap[memberId];

        if (!nomePagador || !nomeRecebedor) {
            return interaction.reply({ content: 'Usuário não encontrado na lista de registros.', ephemeral: true });
        }

        const saldoPagador = data.DINHEIRO[nomePagador] || 0;
        if (saldoPagador < valorint) {
            return interaction.reply({ content: 'Você não tem saldo suficiente para esta transferência.', ephemeral: true });
        }

        data.DINHEIRO[nomePagador] = saldoPagador - valorint;
        data.DINHEIRO[nomeRecebedor] = (data.DINHEIRO[nomeRecebedor] || 0) + valorint;
        writeDataToFile(data);

        const nicknamePagador = user.nickname || user.user.username;
        const nicknameRecebedor = member.nickname || member.user.username;
        const comprovante = new EmbedBuilder()
            .setTitle("Comprovante")
            .setAuthor({ name: "Banco de Zoystea" })
            .setDescription(
                `PIX REALIZADO NO VALOR DE ${valorint} ZENS\n\n----------------------------------\n\nPagador: ${nicknamePagador}\nPara: ${nicknameRecebedor}\n\n${mensagem}`
            )
            .setTimestamp();

        const comprovante2 = new EmbedBuilder()
            .setTitle("Comprovante")
            .setAuthor({ name: "Banco de Zoystea" })
            .setDescription(
                `PIX RECEBIDO NO VALOR DE ${valorint} ZENS\n\n----------------------------------\n\nPagador: ${nicknamePagador}\nPara: ${nicknameRecebedor}\n\n${mensagem}`
            )
            .setTimestamp();

        await interaction.reply({ content: 'Pix enviado com sucesso!', ephemeral: true });
        await user.send({ embeds: [comprovante] });
        await member.send({ embeds: [comprovante2] });

        // Configura cooldown
        timeout.push(userId);
        setTimeout(() => {
            const index = timeout.indexOf(userId);
            if (index > -1) timeout.splice(index, 1);
        }, cooldown);
    },
};