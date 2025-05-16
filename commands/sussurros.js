const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'comunidade', 'sussurros.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const extrairTitulo = (texto) => {
    const match = texto.match(/\*\*(.*?)\*\*/);
    return match ? match[1] : texto;
};

const campanhaImagem = {
    'SOLARENS': 'https://images2.imgbox.com/b6/52/q7Nf0vdh_o.png',
    'NOITEESCURA': 'https://images2.imgbox.com/a1/46/xkfejCBm_o.png',
    'EMPIREO': 'https://images2.imgbox.com/c9/61/D0xuAP00_o.png',
    'EDFU': 'https://images2.imgbox.com/7f/82/0s1UlP5q_o.png',
    'AFANO': 'https://images2.imgbox.com/4a/1e/jZ4jAfgH_o.png',
    'TROPICAL': 'https://images2.imgbox.com/80/f4/ZuEe2Pve_o.png',
    'THANATOS': 'https://images2.imgbox.com/40/b1/zwuJIKfb_o.png',
    'CIRCUZ': 'https://images2.imgbox.com/13/98/otWMfDuz_o.png',
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sussurros')
        .setDescription('Escolha uma opção de sussurros.')
        .addStringOption(option =>
            option.setName('opcao')
                .setDescription('Escolha uma categoria ou opção.')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const suggestions = [];

        data.sussurros.forEach((category, categoryIndex) => {
            for (const [key, options] of Object.entries(category)) {
                options.forEach((option, optionIndex) => {
                    const displayName = extrairTitulo(`${key} - ${option}`).slice(0, 100);
                    if (focusedValue === '' || displayName.toLowerCase().includes(focusedValue)) {
                        suggestions.push({
                            name: displayName,
                            value: `${categoryIndex},${optionIndex}`
                        });
                    }
                });
            }
        });
        await interaction.respond(suggestions.slice(0, 25));
    },
    async execute(interaction) {
        await interaction.reply({ content: 'Enviando Sussurros...', ephemeral: true });
        const selectedValue = interaction.options.getString('opcao');
        const [categoryIndex, optionIndex] = selectedValue.split(',').map(Number);
        const category = data.sussurros[categoryIndex];
        const key = Object.keys(category)[0];
        const selectedOption = category[key][optionIndex];

        const campanhaTitulo = extrairTitulo(key);
        console.log(campanhaTitulo)
        const imageUrl = campanhaImagem[campanhaTitulo] || null;

        try {
            const frases = `*sussurros...*\n\n\n# ${selectedOption}`;
            if (imageUrl) {
                await interaction.user.send({
                    content: frases,
                    files: [{ attachment: imageUrl }]
                });
            } else {
                await interaction.user.send({
                    content: frases
                });
            }
        } catch (error) {
            await interaction.channel.send('Não foi possível enviar a mensagem no privado.');
        }
    },
};
