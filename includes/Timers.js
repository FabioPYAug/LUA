const { readFileSync } = require('fs');
const path = require('path');
const frasesPath = path.join(__dirname, '..', 'comunidade', 'citações.json');

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

module.exports = Citação;
