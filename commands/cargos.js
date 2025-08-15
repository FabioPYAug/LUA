const { SlashCommandBuilder } = require('discord.js');
const cargoss = "1405232614121672714"
const cargos = [
    { name: 'Updates da Lua', id: '1247218108247310447' },
    { name: 'Aniversários', id: '1405232614121672714' },
    { name: 'Risorius', id: '1405233032599834684' },
    { name: 'Eventos', id: '1405234238663688223' },
    { name: 'Novas Campanhas/Oneshots', id: '1405234344502497441' },
    { name: 'Jogos Diários', id: '1405234434541748224' },
    { name: 'Citação do Dia', id: '1405238506732781739' },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cargo')
        .setDescription('Escolha um cargo para ser marcado!')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Qual cargo deseja escolher?')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const filtered = cargos.filter(cargo =>
            cargo.name.toLowerCase().includes(focusedValue.toLowerCase())
        );
        await interaction.respond(
            filtered.map(cargo => ({ name: cargo.name, value: cargo.id }))
        );
    },

    async execute(interaction) {
        const cargoId = interaction.options.getString('nome');
        const cargo = interaction.guild.roles.cache.get(cargoId);
        const membro = interaction.member;

        if (!cargo) {
            return interaction.reply({ content: 'Cargo não encontrado.', ephemeral: true });
        }

        if (membro.roles.cache.has(cargoId)) {
            await membro.roles.remove(cargoId);
            await interaction.reply({ content: `Cargo **${cargo.name}** removido!`, ephemeral: false });
        } else {
            await membro.roles.add(cargoId);
            await interaction.reply({ content: `Cargo **${cargo.name}** adicionado!`, ephemeral: true });
        }
    }
};
