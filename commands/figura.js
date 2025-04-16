const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const path = require('path');
const fs = require('fs');

const ADM = "1099030674574422107";

//DADOS DO COMANDO
const frasespath = path.join(__dirname, '..', 'comunidade', 'figura.json');
function readDataFromFile() {
    if (fs.existsSync(frasespath)) {
        const JSONDADOS = fs.readFileSync(frasespath, 'utf8');
        return JSON.parse(JSONDADOS);
    }
}
function writeDataToFile(data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(frasespath, jsonString, 'utf8');
}
const data = readDataFromFile();
const status = data.parisastatus

//CÓDIGO PRO SORTEIO/FRASES DA PARISA
var timeout = [];
const milesegundos = 10000;
const segundos = milesegundos / 1000
const ladraoid = "1247895817638117509"

//CÓDIGO DE OPÇÕES/AUTOCOMPLETE
module.exports = {
    data: new SlashCommandBuilder()
        .setName("figura")
        .setDescription("Comandos de personagens do servidor!")
        .addStringOption(option =>
            option.setName('asterio')
                .setDescription('Comandos relacionados ao Astério!')
                .setAutocomplete(true))
        .addStringOption(option =>
            option.setName('joaozinho')
                .setDescription('Comandos relacionados ao Joaozinho!')
                .setAutocomplete(true))
        .addStringOption(option =>
            option.setName('parisa')
                .setDescription('Comandos relacionados a Parisa!')
                .setAutocomplete(true))
        .addStringOption(option =>
            option.setName('poyo')
                .setDescription('Comandos relacionados ao Poyo')
                .setAutocomplete(true)),

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;
        const user = interaction.member;
        //EM MANUTENÇÃO
        if (!user.roles.cache.has(ADM)) {
            interaction.reply({ content: "Risorius está em manutenção atualmente!", ephemeral: true })
            return
        }
        if (focusedOption.name === "joaozinho") {
            choices = ["Aparência", "Artes", "Competir", "Conselhos", "Dados", "Expressões", "Frase Aleatória", "Horóscopo", "Piadas", "Playlist", "Quantidade de Frases"]
        }
        if (focusedOption.name === "parisa") {
            choices = ["Aparência", "Artes", "Competir", "Conselhos", "Dados", "Expressões", "Frase Aleatória", "Horóscopo", "Piadas", "Playlist", "Quantidade de Frases"]
        }
        if (focusedOption.name === "poyo") {
            choices = ["Aparência", "Artes", "Competir", "Conselhos", "Dados", "Expressões", "Frase Aleatória", "Horóscopo", "Piadas", "Playlist", "Quantidade de Frases"]
        }
        if (focusedOption.name === "asterio") {
            choices = ["Artes", "Competir", "Conselhos", "Dados", "Frase Aleatória", "Horóscopo", "Piadas", "Playlist", "Quantidade de Frases"]
        }
        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

        if (!interaction) return;

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },

    //CÓDIGO DE FUNCIONAMENTO
    async execute(interaction) {
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Este comando está em cooldown, espere ${segundos} segundos`, ephemeral: true });
        const comandos = interaction.client.channels.cache.get("1125570687298449439");

        //CÓDIGO ASTÉRIO
        if (interaction.options.getString('asterio')) {
            const asterio = interaction.options.getString('asterio')
            const frase = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).asteriofrases;
            // const aparencia = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).joaozinhoaparencia;

            if (asterio == "Artes") {
                await interaction.reply("**Astério mostra o caminho de terra que ele fez e você repara que o caminho forma um **:)** distorcido**")
            }

            if (asterio == "Frase Aleatória") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (asterio == "Quantidade de Frases") {
                const tamanho = frase.length + 3
                await interaction.reply({ content: `O Astério tem **${tamanho}** frases!`, ephemeral: true })
            }

            if (asterio == "Competir") {
                await interaction.reply(`"` + "*Vocês tentam jogar, mas o enorme braço direito de Ossos do Astério acabam batendo nos dados, quebrando todos os dados e mesa. Ele parece muito triste e frustrado.*" + `"`)
            }

            if (asterio == "Conselhos") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (asterio == "Piadas") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (asterio == "Playlist") {
                await interaction.reply("https://open.spotify.com/playlist/3aORcdqPUYndxebmxytKN1?si=664783f8962a4197")
            }

            if (asterio == "Dados") {
                const dados = new EmbedBuilder()
                    .setColor("White")
                    .setTitle('Dados do Astério')
                    .addFields(
                        { name: 'Idade', value: 'Morto', inline: false },
                        { name: 'Tamanho', value: '2.15 m', inline: false },
                        { name: 'Aniversário', value: '?', inline: false },
                        { name: 'Comida Favorita', value: 'Alma', inline: false },
                        { name: 'Entidade', value: 'Sol', inline: false },
                        { name: 'Relações', value: 'Zeref, Luci', inline: false },
                        { name: 'Local de Origem', value: 'Baúrda Cúbica', inline: false },
                        { name: 'Hobbies', value: 'Carregar o Zeref nas Costas', inline: false },
                    )
                await interaction.reply({ embeds: [dados] })
            }

            if (asterio == "Horóscopo") {
                await interaction.reply("*O rangido suave dos ossos alcança seu coração... É estranho e tocante, mesmo sem entender o significado*")
            }
        }

        //CÓDIGO JOAZINHO
        if (interaction.options.getString('joaozinho')) {
            const joaozinho = interaction.options.getString('joaozinho')
            const frase = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).joaozinhofrases;
            const expressoes = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).joaozinhoexpressoes;
            const aparencia = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).joaozinhoaparencia;

            if (joaozinho == "Artes") {
                await interaction.reply("**Um sofá arranhado...**")
            }

            if (joaozinho == "Frase Aleatória") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (joaozinho == "Quantidade de Frases") {
                const tamanho = frase.length + 3 + expressoes.length
                await interaction.reply({ content: `O Joãozinho tem **${tamanho}** frases!`, ephemeral: true })
            }

            if (joaozinho == "Competir") {
                await interaction.reply(`"` + "*Você até tenta jogar os dados, mas Joazinho começa a brincar e acaba jogando eles para fora da mesa...*" + `"`)
            }

            if (joaozinho == "Conselhos") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (joaozinho == "Piadas") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (joaozinho == "Expressões") {
                const experssoesrandom = expressoes[Math.floor(Math.random() * expressoes.length)];
                await interaction.reply('*"' + experssoesrandom + '"*')
            }

            if (joaozinho == "Aparência") {
                const aparenciajoaozinho = aparencia[Math.floor(Math.random() * aparencia.length)];
                await interaction.reply(aparenciajoaozinho)
            }

            if (joaozinho == "Playlist") {
                await interaction.reply("https://open.spotify.com/playlist/3aORcdqPUYndxebmxytKN1?si=664783f8962a4197")
            }

            if (joaozinho == "Dados") {
                const dados = new EmbedBuilder()
                    .setColor("White")
                    .setTitle('Dados do Joãozinho')
                    .addFields(
                        { name: 'Idade', value: 'Morto', inline: false },
                        { name: 'Tamanho', value: '25 cm', inline: false },
                        { name: 'Aniversário', value: '1 de Fevereiro de 2005', inline: false },
                        { name: 'Comida Favorita', value: 'Petisco de Frango', inline: false },
                        { name: 'Elemento', value: 'Medo', inline: false },
                        { name: 'Relações', value: 'Sune, Grupo Tropical', inline: false },
                        { name: 'Local de Origem', value: 'Paraná', inline: false },
                        { name: 'Hobbies', value: 'Dormir', inline: false },
                    )
                await interaction.reply({ embeds: [dados] })
            }

            if (joaozinho == "Horóscopo") {
                await interaction.reply("Miau miau miau, miau miau miau miau. Miau miau miau miau miau!")
            }
        }

        //CÓDIGO PARISA
        if (interaction.options.getString('parisa')) {
            const user = interaction.member;
            const parisa = interaction.options.getString('parisa')
            const frasederrota = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisaperdeu;
            const fraseganhou = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisaganhou;
            const fraseempate = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisaempate;
            const fraseconselho = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisaconselho;
            const frasefalha = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisafalha;
            const frasecritico = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisacritico;
            const piada = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisapiadas;
            const frase = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisa;
            const expressoes = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisaexpressoes;
            const aparencia = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisaaparencia;
            const horoscopo = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisahoroscopo;
            const Artes = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).parisadesenhos;

            const random = frase[Math.floor(Math.random() * frase.length)];
            const randomconselho = fraseconselho[Math.floor(Math.random() * fraseconselho.length)];
            const piadasrandom = piada[Math.floor(Math.random() * piada.length)];
            const expressoesrandom = expressoes[Math.floor(Math.random() * expressoes.length)];

            if (parisa == "Frase Aleatória") {
                await interaction.reply('*"' + random + '"*')
            }

            if (parisa == "Artes") {
                const randomarte = Artes[Math.floor(Math.random() * Artes.length)];
                await interaction.reply(randomarte)
            }

            if (parisa == "Quantidade de Frases") {
                const tamanho = frase.length + frasederrota.length + horoscopo.length + fraseganhou.length + fraseempate.length + fraseconselho.length + frasefalha.length + frasecritico.length + piada.length + Artes.length + expressoes.length
                await interaction.reply({ content: `A Parisa tem **${tamanho}** frases!`, ephemeral: true })
            }

            if (parisa == "Competir") {
                const parisawins = status.vitorias
                const parisadefeat = status.derrotas
                if (user.roles.cache.has(ladraoid)) {
                    interaction.reply({ content: `"` + `Não quero jogar com você! Você só rouba para tirar valores altos!!` + `"`, ephemeral: true })
                    setTimeout(() => {
                        comandos.send({ content: `"` + `${interaction.user} ok, eu vou te perdoar por ter roubado nos dados, quando quiser jogar me chama...` + `"`, ephemeral: true });
                        user.roles.remove(ladraoid)
                    }, 180000);
                    return;
                }
                await interaction.reply({ content: `*"` + `VAMOS COMPETIR NO LUGAR DOS DADOS!!` + `"*`, ephemeral: true })
                var dadosparisa = (Math.floor(Math.random() * 20) + 1)
                const parisa1 = new EmbedBuilder()
                    .setColor("Aqua")
                    .setTitle("PARISA💚")
                    .setDescription(`${dadosparisa}  ⟵ [${dadosparisa}] 1d20`)
                    .setFooter({ text: `Vitórias: ${parisawins} | Derrotas: ${parisadefeat}` })
                const mensagem = await comandos.send({ embeds: [parisa1] })
                for (var i = 0; i < 3; i++) {
                    dadosparisa = (Math.floor(Math.random() * 20) + 1)
                    const parisa2 = new EmbedBuilder()
                        .setColor("Aqua")
                        .setTitle("PARISA💚")
                        .setDescription(`${dadosparisa}  ⟵ [${dadosparisa}] 1d20`)
                        .setFooter({ text: `Vitórias: ${parisawins} | Derrotas: ${parisadefeat}` })
                    mensagem.edit({ embeds: [parisa2] })
                }
                var dadosvoce = (Math.floor(Math.random() * 20) + 1)
                const voce1 = new EmbedBuilder()
                    .setColor("DarkGrey")
                    .setTitle("VOCÊ")
                    .setDescription(`${dadosvoce}  ⟵ [${dadosvoce}] 1d20`)
                const mensagem2 = await comandos.send({ embeds: [voce1] })
                for (var i = 0; i < 3; i++) {
                    dadosvoce = (Math.floor(Math.random() * 20) + 1)
                    const voce2 = new EmbedBuilder()
                        .setColor("DarkGrey")
                        .setTitle("VOCÊ")
                        .setDescription(`${dadosvoce}  ⟵ [${dadosvoce}] 1d20`)
                    mensagem2.edit({ embeds: [voce2] })
                }

                setTimeout(() => {
                    if (dadosvoce > dadosparisa) {
                        data.parisastatus.derrotas++
                        const random = frasederrota[Math.floor(Math.random() * frasederrota.length)];
                        if (dadosvoce == 20) {
                            interaction.member.roles.add(ladraoid)
                            const criticofrase = frasecritico[Math.floor(Math.random() * frasecritico.length)];
                            comandos.send(`-\n*${criticofrase}*`)
                            return;
                        }
                        comandos.send(`-\n*${random}*`)
                    }
                    if (dadosvoce < dadosparisa) {
                        data.parisastatus.vitorias++
                        const random = fraseganhou[Math.floor(Math.random() * fraseganhou.length)];
                        if (dadosvoce == 1) {
                            interaction.member.roles.add(ladraoid)
                            const fracassofrase = frasefalha[Math.floor(Math.random() * frasefalha.length)];
                            comandos.send(`-\n*${fracassofrase}*`)
                            return;
                        }
                        comandos.send(`-\n*${random}*`)
                    }
                    if (dadosvoce == dadosparisa) {
                        const random = fraseempate[Math.floor(Math.random() * fraseempate.length)];
                        comandos.send(`-\n"` + `*${random}*` + `"`)
                    }
                }, 6500);
            }
            if (parisa == "Conselhos") {
                await interaction.reply('*"' + randomconselho + '"*')
            }
            if (parisa == "Piadas") {
                await interaction.reply('*"' + piadasrandom + '"*')
            }
            if (parisa == "Expressões") {
                await interaction.reply('*"' + expressoesrandom + '"*')
            }
            if (parisa == "Aparência") {
                const aparenciaparisa = aparencia[Math.floor(Math.random() * aparencia.length)];
                await interaction.reply(aparenciaparisa)
            }
            if (parisa == "Playlist") {
                await interaction.reply("https://open.spotify.com/playlist/6lhMqLLKEicZB7nXLSOfNf?si=daf98f79248247cb")
            }
            if (parisa == "Dados") {
                const dados = new EmbedBuilder()
                    .setColor("Aqua")
                    .setTitle('Dados da Parisa')
                    .addFields(
                        { name: 'Idade', value: '264 anos', inline: false },
                        { name: 'Tamanho', value: '110 cm', inline: false },
                        { name: 'Aniversário', value: '01/Solstício/5-592', inline: false },
                        { name: 'Comida Favorita', value: 'Doce de Nairas', inline: false },
                        { name: 'Entidade', value: 'Sol', inline: false },
                        { name: 'Relações', value: 'Pietro, Grupo Eclipse, Família na Ilha das Fadas.', inline: false },
                        { name: 'Local de Origem', value: 'Ilha de Ormonia', inline: false },
                        { name: 'Hobbies', value: 'Desenhar e Tocar Triângulo', inline: false },
                    )
                await interaction.reply({ embeds: [dados] })
            }
            if (parisa == "Horóscopo") {
                const parciahoroscopo = horoscopo[Math.floor(Math.random() * horoscopo.length)];
                await interaction.reply('*"' + parciahoroscopo + '"*')
            }
        }
        //CÓDIGO POYO
        if (interaction.options.getString('poyo')) {
            const poyo = interaction.options.getString('poyo')
            const frase = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).poyo;
            const conselhos = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).poyoconselhos;
            const piadas = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).poyopiadas;
            const expressoes = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).poyoexpressoes;
            const aparencia = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).poyoaparencia;
            const Artes = JSON.parse(fs.readFileSync(frasespath, 'utf-8')).poyodesenhos;

            if (poyo == "Artes") {
                const randomartespoyo = Artes[Math.floor(Math.random() * Artes.length)];
                await interaction.reply(randomartespoyo)
            }

            if (poyo == "Frase Aleatória") {
                const random = frase[Math.floor(Math.random() * frase.length)];
                await interaction.reply('*"' + random + '"*')
            }

            if (poyo == "Quantidade de Frases") {
                const tamanho = frase.length + 2 + conselhos.length + piadas.length + expressoes.length + Artes.length
                await interaction.reply({ content: `O Poyo tem **${tamanho}** frases!`, ephemeral: true })
            }

            if (poyo == "Competir") {
                await interaction.reply(`"` + "*Não irei jogar essa brincadeira. Esse tipo de coisa não é importante para a Base.*" + `"`)
            }

            if (poyo == "Conselhos") {
                const conselhosrandom = conselhos[Math.floor(Math.random() * conselhos.length)];
                await interaction.reply('*"' + conselhosrandom + '"*')
            }

            if (poyo == "Piadas") {
                const piadasrandom = piadas[Math.floor(Math.random() * piadas.length)];
                await interaction.reply('*"' + piadasrandom + ' Caso você me dê informações úteis para a base, eu conto o resto' + '"*')
            }

            if (poyo == "Expressões") {
                const experssoesrandom = expressoes[Math.floor(Math.random() * expressoes.length)];
                await interaction.reply('*"' + experssoesrandom + '"*')
            }

            if (poyo == "Aparência") {
                const aparenciapoyo = aparencia[Math.floor(Math.random() * aparencia.length)];
                await interaction.reply(aparenciapoyo)
            }
            if (poyo == "Playlist") {
                await interaction.reply("https://open.spotify.com/playlist/2gj7gCu5rrnz1rCCQuNoaF?si=f0477947415d4954")
            }
            if (poyo == "Dados") {
                const dados = new EmbedBuilder()
                    .setColor("DarkGrey")
                    .setTitle('Dados do Poyo')
                    .addFields(
                        { name: 'Idade', value: '1.294 anos', inline: false },
                        { name: 'Tamanho', value: '32 cm', inline: false },
                        { name: 'Aniversário', value: '37/Nova/4-4684', inline: false },
                        { name: 'Comida Favorita', value: 'Conhecimento', inline: false },
                        { name: 'Entidade', value: 'Sol', inline: false },
                        { name: 'Relações', value: 'Ely, Revolucionários', inline: false },
                        { name: 'Local de Origem', value: 'Zoystea', inline: false },
                        { name: 'Hobbies', value: 'Ler e Pensar', inline: false },
                    )
                await interaction.reply({ embeds: [dados] })
            }
            if (poyo == "Horóscopo") {
                await interaction.reply(`"` + "*Não irei definir nada. Eu acredito que esses jogos para definir o destino nunca irão definir seu futuro.*" + `"`)
            }

        }
        writeDataToFile(data);
        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
    }
}