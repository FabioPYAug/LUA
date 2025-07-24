const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const { adicionarRole, aplicarDinheiro, Ids } = require('../includes/functions.js');

const frasesPath = path.join(__dirname, '..', 'comunidade', 'citações.json');
const ritualPath = path.join(__dirname, '..', 'comunidade', 'ritual.json');
const aniversariosPath = path.join(__dirname, '..', 'comunidade', 'oprsario.json');
const ritualDoDiaPath = path.join(__dirname, '..', 'comunidade', 'ritual_do_dia.json');

const Citação = (client, targetHour, targetMinute, targetChannelId) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === targetHour && currentMinute === targetMinute) {
        const channel = client.channels.cache.get(targetChannelId);
        if (channel) {
            let frases = [];
            try {
                const data = readFileSync(frasesPath, 'utf-8').trim();
                if (data) {
                    frases = JSON.parse(data);
                }
            } catch (err) {
                console.error('Erro ao ler ou parsear o arquivo de frases:', err);
            }

            if (frases.length > 0) {
                const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
                channel.send(fraseAleatoria);
            } else {
                channel.send('Nenhuma frase disponível no momento.');
            }
        } else {
            console.log('Canal não encontrado!');
        }
    }
};

let ultimaDataExecucaoNiver = null;

const Niver = (client, targetChannelId) => {
    const gifsDeAniversario = [
        'https://i.pinimg.com/originals/7f/f5/8d/7ff58d0601a065be53690227a380c416.gif',
        'https://i.pinimg.com/originals/34/ca/76/34ca76d27c2f6923d9e17868644b18bb.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0RLsHdftyZrFELXpsAkPzj51BH1CJDtDfPw&s',
        'https://appygreeting.com/wp-content/uploads/2023/12/happy-birthday-in-portuguses-greeting-card-gif.gif',
        'https://imagens.net.br/wp-content/uploads/2024/05/encontre-o-gif-de-aniversario-perfeito-aqui-3.gif',
        'https://i.pinimg.com/originals/d9/36/86/d93686138dbcfca8e68bcd34229e728d.gif',
        'https://pt.vidnoz.com/bimg/feliz-aniversario-gif-1.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS921M9VL0bAQWyksFt2kEXdRueCNyX3HXrzA&s',
        'https://img1.picmix.com/output/pic/normal/7/8/8/9/4429887_b9876.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMethO8QkMfSNzd8yKwNTQGo9gHcA580Caeg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnGT1T3BfXsRiAhdvplZv3evPWJkyX9rFdaA&s',
        'https://img1.picmix.com/output/pic/normal/6/4/0/5/8785046_08d5b.gif',
        'https://i.imgur.com/wcVaDmu.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbywfRS63alv8I3wlOxOOvbPYKrooDsj65w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXnkRYEPg6wVz39TaXmvXCeAJkU-ZVWkO97A&s',
        'https://pt.vidnoz.com/bimg/feliz-aniversario-gif-engracado.gif',
        'https://pt.vidnoz.com/bimg/feliz-aniversario-gif-1.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF782bidj1STKE23x-4PaZ85iIVEqPU-fWay8NKps1nc-do08qoAoRHeIGM0kf4tc5u8Q&usqp=CAU'
    ];
    const now = new Date();
    const currentDate = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });


    if (ultimaDataExecucaoNiver === currentDate) {
        return;
    }

    let aniversarios = {};
    try {
        const data = readFileSync(aniversariosPath, 'utf-8').trim();
        if (data) {
            aniversarios = JSON.parse(data);
        }
    } catch (err) {
        return;
    }

    const nomes = aniversarios[currentDate];
    if (nomes && nomes.length > 0) {
        const channel = client.channels.cache.get(targetChannelId);
        if (channel) {
            const mensagem = nomes.length === 1
                ? `🎉 Hoje é aniversário de **${nomes[0]}**! Desejem parabéns! 🎂`
                : `🎉 Hoje é aniversário de **${nomes.join('** e **')}**! Desejem parabéns! 🎂`;

            const gif = gifsDeAniversario[Math.floor(Math.random() * gifsDeAniversario.length)];
            const embed = new EmbedBuilder()
                .setTitle("FELIZ ANIVERSÁRIO!!!")
                .setDescription(mensagem)
                .setImage(gif)
                .setColor(0xFFC0CB);

            ultimaDataExecucaoNiver = currentDate;

            channel.send({ content: '@everyone', embeds: [embed] }).then(async sentMessage => {
                const emoji = '🎉';
                try {
                    await sentMessage.react(emoji);
                } catch (err) {
                    console.error('Erro ao adicionar reação:', err);
                }
                const reactedUsers = new Set();
                const filter = (reaction, user) => {
                    return reaction.emoji.name === emoji && !user.bot;
                };
                const collector = sentMessage.createReactionCollector({
                    filter,
                    time: 6 * 60 * 60 * 1000
                });
                collector.on('collect', async (reaction, user) => {
                    if (reactedUsers.has(user.id)) return;
                    reactedUsers.add(user.id);
                    try {
                        const member = await sentMessage.guild.members.fetch(user.id);

                        await adicionarRole(member, Ids.unicos.Contingente, "BFFS");
                        await aplicarDinheiro(member, 10000, sentMessage.guild);
                    } catch (error) {
                        console.error("Erro no coletor de reações:", error);
                    }
                });

                collector.on('end', () => {
                    console.log('Coletor encerrado após 6 horas.');
                });
            });
        } else {
            console.log('Canal não encontrado!');
        }
    }
};

const Ritual = (client, targetHour, targetMinute, targetChannelId) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === targetHour && currentMinute === targetMinute) {
        const channel = client.channels.cache.get(targetChannelId);

        let rituais = [];
        try {
            const data = readFileSync(ritualPath, 'utf-8').trim();
            rituais = JSON.parse(data);
        } catch (err) {
            console.error('Erro ao ler rituais:', err);
            return;
        }

        if (rituais.length === 0) {
            channel.send('Nenhum ritual disponível.');
            return;
        }

        const ritualAleatorio = rituais[Math.floor(Math.random() * rituais.length)];

        try {
            writeFileSync(ritualDoDiaPath, JSON.stringify(ritualAleatorio, null, 2));
        } catch (err) {
            console.error('Erro ao salvar o ritual do dia:', err);
        }
        const { EmbedBuilder } = require('discord.js');

        const embed = new EmbedBuilder()
            .setTitle(`Ritual de ${now.toLocaleDateString('pt-BR')}!`)
            .setDescription(
                `## AVISOS\n- Para participar, use o comando \`/ritual\` nesse chat e escolha o ritual correto!\n- Você ter apenas uma tentativa então escolha bem!\n- Por fim, aqui tem rituais dos dois livros e homebrew!\n\n- DICA: || ${ritualAleatorio.dica} ||`
            )
            .setImage(ritualAleatorio.imagem)
            .setColor(0x6e00ff);

        channel.send({ embeds: [embed] });

    }
};

module.exports = {
    Citação,
    Niver,
    Ritual
};
