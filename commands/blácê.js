const { SlashCommandBuilder } = require("discord.js")
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

const amandaid = "407937359389261858"
const alexandreid = "396979087307964426"
const alvaroid = "546734558431674369"
const diogoid = "546377246420762651"
const fabioid = "424982351593078785"
const heloid = "1054515144950030356"
const isisid = "725490324960575570"
const kelsonid = "309439524730044448"
const otavioid = "1002730228998742067"
const vitorid = "340298478494154752"
const pauloid = "862809964401393665"
const gabrielid = "507585124624236545"

const frasespath = path.join(__dirname, '..', 'comunidade', 'dinheiro.json');
function readDataFromFile(){
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
var timeout = [];
const milesegundos = 15000;
const segundos = milesegundos / 1000

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jogosbobby")
        .setDescription("Jogos famosos criados por Bobby!")
        .addIntegerOption(option =>
            option.setName('valor')
                .setDescription('Valor de Zens que deseja apostar!')
                .setRequired(true))
        .addStringOption(option =>
			option.setName('aljava')
				.setDescription('Aljava de Narlon, o primeiro jogo de Bobby')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('bobbyspot')
				.setDescription('BobbySpot, o Quinquagésimo Primeiro jogo de Bobby')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('cinquentinha')
				.setDescription('Cinquentinha, o Vigéssimo Quinto jogo de Bobby')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('escolhidos')
				.setDescription('Roleta dos Escolhidos, o segundo jogo de Bobby')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('risadas')
				.setDescription('Risadas do Destino, o Quarto jogo de Bobby')
				.setAutocomplete(true))
        .addStringOption(option =>
            option.setName('21bs')
				.setDescription('21s Bobbys, o  Vigéssimo primeiro jogo de Bobby')
				.setAutocomplete(true)),

    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices = [`Jogar`, 'Regras'];

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

        if (!interaction) return;

		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},

    async execute (interaction) {
        interaction.reply({ content: `ESTE COMANDO ESTÁ FORA DO AR POR HORA`, ephemeral: true})
        return
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Calma! A máquina do cassino está reiniciando, espere ${segundos} segundos`, ephemeral: true});
        const comandosid = "1223767643312623697"
        const user = interaction.member;
        const userId = user.id;
        const comandos = interaction.client.channels.cache.get(comandosid);
        function reset(){
                if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor + valorint}
        }
        if(interaction.options.getInteger('valor')){
            //Amanda
            if(userId == amandaid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.amanda
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.amanda = data.DINHEIRO.amanda - valorint
            }
            //alvaro
            if(userId == alvaroid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.alvaro
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.alvaro = data.DINHEIRO.alvaro - valorint
            }
            //alexandre
            if(userId == alexandreid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.alexandre
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.alexandre = data.DINHEIRO.alexandre - valorint
            }
            //diogo
            if(userId == diogoid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.diogo
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.diogo = data.DINHEIRO.diogo - valorint
            }
            //Babio
            if(userId == fabioid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.fabio
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.fabio = data.DINHEIRO.fabio - valorint
            }
            //dGABRIEL
            if(userId == gabrielid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.gabriel
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.gabriel = data.DINHEIRO.gabriel - valorint
            }
            //HELOISE
            if(userId == heloid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.heloise
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.heloise = data.DINHEIRO.heloise - valorint
            }
            //ISIS
            if(userId == isisid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.isis
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.isis = data.DINHEIRO.isis - valorint
            }
            //KELSON
            if(userId == kelsonid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.kelson
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.kelson = data.DINHEIRO.kelson - valorint
            }
            //OTAVIO
            if(userId == otavioid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.otavio
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.otavio = data.DINHEIRO.otavio - valorint
            }
            //PAULO
            if(userId == pauloid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.paulo
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.paulo = data.DINHEIRO.paulo - valorint
            }
            //VITOR
            if(userId == vitorid){
                var valorint = interaction.options.getInteger('valor');
                let ZENS = data.DINHEIRO.vitor
                if(ZENS < 1 || (ZENS - valorint) < 0){
                    interaction.reply({ content: `***Seu saldo é insuficiente para apostar nos jogos do Bobby.***`, ephemeral: true})
                    return;
                }
                data.DINHEIRO.vitor = data.DINHEIRO.vitor - valorint
            }
            function dinheiroinsuficiente() {
                interaction.reply({ content: `***Saldo insuficiente para jogar o jogo selecionado.***`, ephemeral: true})
                if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor + valorint}
            }
        }
        if(interaction.options.getString('bobbyspot')){
            const gigi = interaction.options.getString('bobbyspot')
            if(gigi == "Jogar"){
            const valor1 = (Math.floor(Math.random() * 4) + 1);
            const valor2 = (Math.floor(Math.random() * 4) + 1);
            let mensagem = (`                      **${valor1} | ${valor2}**`)
            if(valor1 == 1 && valor1 == valor2){
                mensagem = ("╔─━━━━━━░★░━━━━━━─╗" + "\n\n" + mensagem + "\n\n" + "╚─━━━━━━░★░━━━━━━─╝ " + "\n\n" + "Você multiplicou o valor por 1")
                if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor + valorint}

            }
            if(valor1 == 2 && valor1 == valor2){
                mensagem = ("╔─━━━━━━░★░━━━━━━─╗" + "\n\n" + mensagem + "\n\n" + "╚─━━━━━━░★░━━━━━━─╝ " + "\n\n" + "Você multiplicou o valor por 2")
                if(userId == fabioid){data.DINHEIRO.fabio = (2 * valorint) + data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = (2 * valorint) + data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = (2 * valorint) + data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = (2 * valorint) + data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = (2 * valorint) + data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = (2 * valorint) + data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = (2 * valorint) + data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = (2 * valorint) + data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = (2 * valorint) + data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = (2 * valorint) + data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = (2 * valorint) + data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = (2 * valorint) + data.DINHEIRO.vitor + valorint}
            }
            if(valor1 == 3 && valor1 == valor2){
                mensagem = ("╔─━━━━━━░★░━━━━━━─╗" + "\n\n" + mensagem + "\n\n" + "╚─━━━━━━░★░━━━━━━─╝ " + "\n\n" + "Você multiplicou o valor por 3")
                if(userId == fabioid){data.DINHEIRO.fabio = (3 * valorint) + data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = (3 * valorint) + data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = (3 * valorint) + data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = (3 * valorint) + data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = (3 * valorint) + data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = (3 * valorint) + data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = (3 * valorint) + data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = (3 * valorint) + data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = (3 * valorint) + data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = (3 * valorint) + data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = (3 * valorint) + data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = (3 * valorint) + data.DINHEIRO.vitor + valorint}
            }
            if(valor1 == 4 && valor1 == valor2){
                mensagem = ("╔─━━━━━━░★░━━━━━━─╗" + "\n\n" + mensagem + "\n\n" + "╚─━━━━━━░★░━━━━━━─╝ " + "\n\n" + "Você multiplicou o valor por 4")
                if(userId == fabioid){data.DINHEIRO.fabio = (4 * valorint) + data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = (4 * valorint) + data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = (4 * valorint) + data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = (4 * valorint) + data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = (4 * valorint) + data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = (4 * valorint) + data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = (4 * valorint) + data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = (4 * valorint) + data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = (4 * valorint) + data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = (4 * valorint) + data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = (4 * valorint) + data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = (4 * valorint) + data.DINHEIRO.vitor + valorint}
            }
            if(valor1 != valor2){
                mensagem = ("╔─━━━━━━░★░━━━━━━─╗" + "\n\n" + mensagem + "\n\n" + "╚─━━━━━━░★░━━━━━━─╝ " + "\n\n" + "Você perdeu seus Zens e não ganhou nada.")
            }
            await interaction.reply(mensagem)
        
        }
            if(gigi == "Regras"){
                interaction.reply({content: "┏◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚┓\n\n**BOBBYSPOT**\n\nEsse é o Quinquagésimo Primeiro jogo criado pelo Deus da comédia, Bobby!\nO jogo é simples e sempre será encontrado em cassinos no Oeste de FYLAKIR, sendo extremamente famoso pela grande oportunidade que ele da de multiplicar o dinheiro. Ele foi criado por Bobby após ele invadir a **Biblioteca Intelectos** e roubar um livro de conceito básico de números e contagem escrito pelos primeiros seres inteligentes. Ele achou tão engraçado a burrice deles, que decidiu fazer um jogo inspirado neles.\nPorém, atualmente, um bardo jornalista muito famoso descobriu uma falha na máquina após analisar um gnomo amarelado no cassino de Daimonas. Ele acabou espalhando essa informação pelo mundo, fazendo com que todos agora usem dessa sabotagem nas máquinas de BobbySpot.\n\n**Explicação**: A máquina irá jogar dois dados de 4 lados (2d4) e caso caia valores iguais, ele irá multiplicar o seu valor depositado na máquina pelo valor que caiu igual (por exemplo, caso caia 2, o seu valor depositado irá voltar multiplicado por 2).\n\n┗◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛┛", ephemeral: true})
                reset()
            }}
        if(interaction.options.getString('cinquentinha')){
            const gigi = interaction.options.getString('cinquentinha')
            if(gigi == "Jogar"){
            if(valorint < 50){
                dinheiroinsuficiente()
                return;
            }
            if(valorint > 50){
                if(userId == fabioid){data.DINHEIRO.fabio = (valorint - 50) + data.DINHEIRO.fabio}
                if(userId == amandaid){data.DINHEIRO.amanda = (valorint - 50) + data.DINHEIRO.amanda}
                if(userId == alvaroid){data.DINHEIRO.alvaro = (valorint - 50) + data.DINHEIRO.alvaro}
                if(userId == alexandreid){data.DINHEIRO.alexandre = (valorint - 50) + data.DINHEIRO.alexandre}
                if(userId == diogoid){data.DINHEIRO.diogo = (valorint - 50) + data.DINHEIRO.diogo}
                if(userId == gabrielid){data.DINHEIRO.gabriel = (valorint - 50) + data.DINHEIRO.gabriel}
                if(userId == heloid){data.DINHEIRO.heloise = (valorint - 50) + data.DINHEIRO.heloise}
                if(userId == isisid){data.DINHEIRO.isis = (valorint - 50) + data.DINHEIRO.isis}
                if(userId == kelsonid){data.DINHEIRO.kelson = (valorint - 50) + data.DINHEIRO.kelson}
                if(userId == otavioid){data.DINHEIRO.otavio = (valorint - 50) + data.DINHEIRO.otavio}
                if(userId == pauloid){data.DINHEIRO.paulo = (valorint - 50) + data.DINHEIRO.paulo}
                if(userId == vitorid){data.DINHEIRO.vitor = (valorint - 50) + data.DINHEIRO.vitor}
            }
            let valor = Math.floor(Math.random() * 100) + 1;
            await interaction.reply(`╔─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╗`);
            await interaction.channel.send(`**${valor}**  ⟵ [${valor}] 1d100`);

            let contadorwins = 0;

            const confirm = new ButtonBuilder()
                .setCustomId('Continuar')
                .setLabel("Continuar apostas")
                .setStyle(ButtonStyle.Success);

            const cancel = new ButtonBuilder()
                .setCustomId('Parar')
                .setLabel("Parar apostas")
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(cancel, confirm);

            if (valor < 50) {
                await interaction.channel.send(`Você perdeu a aposta.`);
                writeDataToFile(data);
                await interaction.channel.send("╚─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╝")
                return;
            }
            let acabou = 1;
            contadorwins++;
            const mensagem = await interaction.channel.send({
                content: `Você ganhou a última... Você deseja continuar o jogo ou cancelar? Sua pontuação é ${contadorwins}`,
                components: [row]
            });
            const filter = i => i.user.id === interaction.user.id;
            const collector = mensagem.createMessageComponentCollector({ filter, time: 240000 });
            collector.on('collect', async i => {
                if (i.customId === 'Continuar') {
                    valor = Math.floor(Math.random() * 100) + 1;
                    await interaction.channel.send(`**${valor}**  ⟵ [${valor}] 1d100`);
                    if (valor < 50) {
                        await interaction.channel.send(`Perdeu a aposta com uma pontuação de: ${contadorwins}`);
                        if((contadorwins % 2) == 0){
                            if(userId == fabioid){data.DINHEIRO.fabio = (50 * contadorwins) + data.DINHEIRO.fabio + valorint}
                            if(userId == amandaid){data.DINHEIRO.amanda = (50 * contadorwins) + data.DINHEIRO.amanda + valorint}
                            if(userId == alvaroid){data.DINHEIRO.alvaro = (50 * contadorwins) + data.DINHEIRO.alvaro + valorint}
                            if(userId == alexandreid){data.DINHEIRO.alexandre = (50 * contadorwins) + data.DINHEIRO.alexandre + valorint}
                            if(userId == diogoid){data.DINHEIRO.diogo = (50 * contadorwins) + data.DINHEIRO.diogo + valorint}
                            if(userId == gabrielid){data.DINHEIRO.gabriel = (50 * contadorwins) + data.DINHEIRO.gabriel + valorint}
                            if(userId == heloid){data.DINHEIRO.heloise = (50 * contadorwins) + data.DINHEIRO.heloise + valorint}
                            if(userId == isisid){data.DINHEIRO.isis = (50 * contadorwins) + data.DINHEIRO.isis + valorint}
                            if(userId == kelsonid){data.DINHEIRO.kelson = (50 * contadorwins) + data.DINHEIRO.kelson + valorint}
                            if(userId == otavioid){data.DINHEIRO.otavio = (50 * contadorwins) + data.DINHEIRO.otavio + valorint}
                            if(userId == pauloid){data.DINHEIRO.paulo = (50 * contadorwins) + data.DINHEIRO.paulo + valorint}
                            if(userId == vitorid){data.DINHEIRO.vitor = (50 * contadorwins) + data.DINHEIRO.vitor + valorint}
                            writeDataToFile(data);
                        }
                        await interaction.channel.send("╚─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╝")
                        collector.stop();
                    } else {
                        contadorwins++;
                        await i.update({
                            content: `**Você ganhou a última... Você deseja continuar o jogo ou cancelar? Sua pontuação é ${contadorwins}**`,
                            components: [row]
                        });
                    }
                } else if (i.customId === 'Parar') {
                    await i.update({ content: `Você desistiu do jogo com uma pontuação de: ${contadorwins}`, components: [] });
                    if((contadorwins % 2) == 0){
                        if(userId == fabioid){data.DINHEIRO.fabio = (50 * contadorwins) + data.DINHEIRO.fabio + valorint}
                        if(userId == amandaid){data.DINHEIRO.amanda = (50 * contadorwins) + data.DINHEIRO.amanda + valorint}
                        if(userId == alvaroid){data.DINHEIRO.alvaro = (50 * contadorwins) + data.DINHEIRO.alvaro + valorint}
                        if(userId == alexandreid){data.DINHEIRO.alexandre = (50 * contadorwins) + data.DINHEIRO.alexandre + valorint}
                        if(userId == diogoid){data.DINHEIRO.diogo = (50 * contadorwins) + data.DINHEIRO.diogo + valorint}
                        if(userId == gabrielid){data.DINHEIRO.gabriel = (50 * contadorwins) + data.DINHEIRO.gabriel + valorint}
                        if(userId == heloid){data.DINHEIRO.heloise = (50 * contadorwins) + data.DINHEIRO.heloise + valorint}
                        if(userId == isisid){data.DINHEIRO.isis = (50 * contadorwins) + data.DINHEIRO.isis + valorint}
                        if(userId == kelsonid){data.DINHEIRO.kelson = (50 * contadorwins) + data.DINHEIRO.kelson + valorint}
                        if(userId == otavioid){data.DINHEIRO.otavio = (50 * contadorwins) + data.DINHEIRO.otavio + valorint}
                        if(userId == pauloid){data.DINHEIRO.paulo = (50 * contadorwins) + data.DINHEIRO.paulo + valorint}
                        if(userId == vitorid){data.DINHEIRO.vitor = (50 * contadorwins) + data.DINHEIRO.vitor + valorint}
                        writeDataToFile(data);
                    }
                    await interaction.channel.send("╚─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╝")
                    collector.stop();
                }
            });
            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.channel.send('Você não fez uma escolha a tempo.');
                }
            });
        }
        if(gigi == "Regras"){
            interaction.reply({content: "┏◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚┓\n\n**CINQUENTINHA**\n\nEsse é o Vigéssimo Quinto jogo criado pelo Deus da comédia, Bobby!\nEsse jogo é mais usado na região de Aystea, porém, sua fama não é tão grande quanto outros jogos de Bobby, mas mesmo assim ele existe em muitos cassinos em Aystea. Ele foi criado por Bobby após ele encontrar uma cobra sem cabeça que ainda se movia até a própria cabeça da cobrar morder o próprio corpo. Ele achou tão engraçado que fez o Cinquentinha pensando na ideia de ser cortado ao meio ou não, porém, o público não gostou muito, então ele fez essa versão nova mais tranquila.\n\n**Explicação**: A máquina irá jogar um dado de 100 lados (1d100). Caso caia 50 ou mais, você ganhará um ponto, podendo repetir as rolagens até cair ou um valor menor que 50 ou por opção própria (botão de desistir) você desista e tenha a pontuação atual.\nA recompensa é feita da seguinte maneira: Caso caia um valor ímpar, você não irá ganhar nada. E caso caia um valor par, você irá multiplicar o valor da sua pontuação por 50 e receber.\n\n┗◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛┛", ephemeral: true})
            reset()
        }}
        if(interaction.options.getString('risadas')){
            const gigi = interaction.options.getString('risadas')
            if(gigi == "Jogar"){
                await interaction.reply(`╔─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╗`);
                var critico = 0;
                var falha = 0;
                for (var i = 0; i < 5; i++){
                    var dados = (Math.floor(Math.random() * 20) + 1)
                    await interaction.channel.send(`**${dados}**  ⟵ [${dados}] 1d20`);
                    if (dados >= 20){
                        critico++}
                    if (dados <= 1){
                        falha++}}
                    setTimeout(async () => {
                        if (critico > falha){
                            const  mensagem2 = await comandos.send(`Você ganhou o dobro do seu dinheiro apostado`);
                            if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio + (valorint * 2)}
                            if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda + (valorint * 2)}
                            if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + (valorint * 2)}
                            if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + (valorint * 2)}
                            if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo + (valorint * 2)}
                            if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + (valorint * 2)}
                            if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise + (valorint * 2)}
                            if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis + (valorint * 2)}
                            if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson + (valorint * 2)}
                            if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio + (valorint * 2)}
                            if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo + (valorint * 2)}
                            if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor + (valorint * 2)}
                            writeDataToFile(data);
                                    }
                        if (critico < falha){
                            const  mensagem2 = await comandos.send(`Você perdeu o dobro do seu dinheiro apostado`);
                            if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio - (valorint)}
                            if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda - (valorint)}
                            if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro - (valorint)}
                            if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre - (valorint)}
                            if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo - (valorint)}
                            if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel - (valorint)}
                            if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise - (valorint)}
                            if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis - (valorint)}
                            if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson - (valorint)}
                            if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio - (valorint)}
                            if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo - (valorint)}
                            if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor - (valorint)}
                            writeDataToFile(data);
                                    }
                        if (critico == falha){
                            const  mensagem2 = await comandos.send(`Você perdeu o que apostou`);
                        }
                        await interaction.channel.send("╚─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╝")},1000)
            }

            if(gigi == "Regras"){
                interaction.reply({content: "┏◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚┓\n\n**RISADAS DO DESTINO**\n\nEsse é o Quarto jogo criado pelo Deus da comédia, Bobby!\nEsse jogo existe em todas as culturas espalhadas pelo mundo, porém, em algumas regiões como no Sul e no Leste é modificado, mas segue a mesma ideia. Ele foi criado por Bobby após ele encontrar uma pessoa lutando contra um enorme urso coruja. A pessoa implorou por ajuda, mas Bobby teve uma brilhante ideia, ele decidiu jogar um dado de 20 lados e caso caia 1, Bobby iria rir dele até a sua morte. Caso caia 20, Bobby iria ajuda-lo. Obviamente caiu 1, pois Bobby achou engraçado colocar uma magia no dado, forçando ele cair 1.\n\n**Explicação**: A máquina irá jogar cinco dados de 20 lados (5d20). Caso caia mais valores iguais a 1, você irá perder o dobro do que apostou. Caso caia mais valores iguais a 20, você irá ganahr o dobro do que apostou. Por fim, caso caia nenhum deles ou mesma quantidade, você irá perder apenas o que apostou.\n\n┗◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛┛", ephemeral: true})
                reset()
                }
        }
        if(interaction.options.getString('escolhidos')){
            const gigi = interaction.options.getString('escolhidos')
            if(gigi == "Jogar"){
            await interaction.reply(`╔─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╗`);
            const valor1 = (Math.floor(Math.random() * 10) + 1);
            await interaction.channel.send(`# ${valor1}`)
            if(valor1 == 1){
                await interaction.channel.send(`**🟥Você deve pagar o dobro pro casino🟥**`)
                if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio - valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda - valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro - valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre - valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo - valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel - valorint}
                if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise - valorint}
                if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis - valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson - valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio - valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo - valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor - valorint}
            }
            if(valor1 == 2 || valor1 == 3){
                await interaction.channel.send(`**🟧Você perde metade do seu dinheiro apostado🟧**`)
                if(userId == fabioid){Math.ceil(data.DINHEIRO.fabio = data.DINHEIRO.fabio + (valorint * 0.5))}
                if(userId == amandaid){Math.ceil(data.DINHEIRO.amanda = data.DINHEIRO.amanda + (valorint * 0.5))}
                if(userId == alvaroid){Math.ceil(data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + (valorint * 0.5))}
                if(userId == alexandreid){Math.ceil(data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + (valorint * 0.5))}
                if(userId == diogoid){Math.ceil(data.DINHEIRO.diogo = data.DINHEIRO.diogo + (valorint * 0.5))}
                if(userId == gabrielid){Math.ceil(data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + (valorint * 0.5))}
                if(userId == heloid){Math.ceil(data.DINHEIRO.heloise = data.DINHEIRO.heloise + (valorint * 0.5))}
                if(userId == isisid){Math.ceil(data.DINHEIRO.isis = data.DINHEIRO.isis + (valorint * 0.5))}
                if(userId == kelsonid){Math.ceil(data.DINHEIRO.kelson = data.DINHEIRO.kelson + (valorint * 0.5))}
                if(userId == otavioid){Math.ceil(data.DINHEIRO.otavio = data.DINHEIRO.otavio + (valorint * 0.5))}
                if(userId == pauloid){Math.ceil(data.DINHEIRO.paulo = data.DINHEIRO.paulo + (valorint * 0.5))}
                if(userId == vitorid){Math.ceil(data.DINHEIRO.vitor = data.DINHEIRO.vitor + (valorint * 0.5))}
            }
            if(valor1 == 4 || valor1 == 5){
                await interaction.channel.send(`**🟨Você perde todo o seu dinheiro apostado🟨**`)
            }
            if(valor1 == 7 || valor1 == 6){
                await interaction.channel.send(`**⬜Não aconteceu nada⬜**`)
                if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio + valorint}
                if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda + valorint}
                if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + valorint}
                if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + valorint}
                if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo + valorint}
                if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + valorint}
                if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise + valorint}
                if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis + valorint}
                if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson + valorint}
                if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio + valorint}
                if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo + valorint}
                if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor + valorint}
            }
            if(valor1 == 8 || valor1 == 9){
                await interaction.channel.send(`**🟩Você recebe 50% a mais do dinheiro depositado🟩**`)
                if(userId == fabioid){Math.ceil(data.DINHEIRO.fabio = data.DINHEIRO.fabio + (valorint * 0.5) + valorint)}
                if(userId == amandaid){Math.ceil(data.DINHEIRO.amanda = data.DINHEIRO.amanda + (valorint * 0.5) + valorint)}
                if(userId == alvaroid){Math.ceil(data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + (valorint * 0.5) + valorint)}
                if(userId == alexandreid){Math.ceil(data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + (valorint * 0.5) + valorint)}
                if(userId == diogoid){Math.ceil(data.DINHEIRO.diogo = data.DINHEIRO.diogo + (valorint * 0.5) + valorint)}
                if(userId == gabrielid){Math.ceil(data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + (valorint * 0.5) + valorint)}
                if(userId == heloid){Math.ceil(data.DINHEIRO.heloise = data.DINHEIRO.heloise + (valorint * 0.5) + valorint)}
                if(userId == isisid){Math.ceil(data.DINHEIRO.isis = data.DINHEIRO.isis + (valorint * 0.5) + valorint)}
                if(userId == kelsonid){Math.ceil(data.DINHEIRO.kelson = data.DINHEIRO.kelson + (valorint * 0.5) + valorint)}
                if(userId == otavioid){Math.ceil(data.DINHEIRO.otavio = data.DINHEIRO.otavio + (valorint * 0.5) + valorint)}
                if(userId == pauloid){Math.ceil(data.DINHEIRO.paulo = data.DINHEIRO.paulo + (valorint * 0.5) + valorint)}
                if(userId == vitorid){Math.ceil(data.DINHEIRO.vitor = data.DINHEIRO.vitor + (valorint * 0.5) + valorint)}
            }
            if(valor1 == 10){
                await interaction.channel.send(`**🟪Você dobra o seu dinheiro🟪**`)
                if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio + valorint * 2}
                if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda + valorint* 2}
                if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + valorint * 2}
                if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + valorint * 2}
                if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo + valorint * 2}
                if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + valorint * 2}
                if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise + valorint * 2}
                if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis + valorint * 2}
                if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson + valorint * 2}
                if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio + valorint * 2}
                if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo + valorint * 2}
                if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor + valorint * 2}
            }
            await interaction.channel.send("╚─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╝")}

            if(gigi == "Regras"){
                interaction.reply({content: "┏◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚┓\n\n**ROLETA DOS ESCOLHIDOS**\n\nEsse é o segundo jogo criado pelo Deus da comédia, Bobby!\nEsse jogo junto com o BobbySpot e Aljava de Narlon são a trindade dos jogos de cassino, em que todos eles tem pelo menos uma máquina nos cassinos e bares de *Fylakir*. Ele foi criado após Bobby se encontrar com seu irmão e decidirem como explorar o mundo e espalharem seus sentimentos! A decisão foi feita por uma roleta com cores diferentes, onde cada cor representava um reino no mundo.\n\n**Explicação**: A máquina irá girar uma roleta com diferentes cores e dependendo da cor que cair, algo acontece. As cores são:\n🟥: Você irá pagar o dobro do valor apostado para o cassino;\n🟧: Você irá perder apenas metade do valor que você apostou;\n🟨: Você perde todo o dinheiro apostado;\n⬜: Nada acontece;\n🟩: Você irá ganhar metade do dinheiro apostado\n🟪: Você irá ganhar o dobro de dinheiro apostado.\n\n┗◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛┛", ephemeral: true})
                reset()
            }

        }
        if(interaction.options.getString('21bs')){
            const gigi = interaction.options.getString('21bs')
            if(gigi == "Jogar"){
                interaction.reply({content: "AINDA ESTÁ SENDO TRABALHADO", ephemeral: true})
                reset()
            }

            if(gigi == "Regras"){
                interaction.reply({content: "AINDA ESTÁ SENDO TRABALHADO", ephemeral: true})
                reset()
            }

        }
        if(interaction.options.getString('aljava')){
            const gigi = interaction.options.getString('aljava')
            if(gigi == "Jogar"){
                if(valorint < 1000){
                    dinheiroinsuficiente()
                    return;
                }
                await interaction.reply(`╔─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╗`);
                const pente = (Math.floor(Math.random() * 6) + 1);
                const magica = (Math.floor(Math.random() * 6) + 1);
                await interaction.channel.send(`A flecha atirada foi a ${pente}`)
                await interaction.channel.send(`A flecha magicamente teleguiada era a ${magica}`)
                if(pente == magica){
                    await interaction.channel.send(`**A flecha mágica te acertou. Perdendo 5x o valor apostado**`)
                    if(userId == fabioid){data.DINHEIRO.fabio = data.DINHEIRO.fabio - valorint * 4}
                    if(userId == amandaid){data.DINHEIRO.amanda = data.DINHEIRO.amanda - valorint * 4}
                    if(userId == alvaroid){data.DINHEIRO.alvaro = data.DINHEIRO.alvaro - valorint * 4}
                    if(userId == alexandreid){data.DINHEIRO.alexandre = data.DINHEIRO.alexandre - valorint * 4}
                    if(userId == diogoid){data.DINHEIRO.diogo = data.DINHEIRO.diogo - valorint * 4}
                    if(userId == gabrielid){data.DINHEIRO.gabriel = data.DINHEIRO.gabriel - valorint * 4}
                    if(userId == heloid){data.DINHEIRO.heloise = data.DINHEIRO.heloise - valorint * 4}
                    if(userId == isisid){data.DINHEIRO.isis = data.DINHEIRO.isis - valorint * 4}
                    if(userId == kelsonid){data.DINHEIRO.kelson = data.DINHEIRO.kelson - valorint * 4}
                    if(userId == otavioid){data.DINHEIRO.otavio = data.DINHEIRO.otavio - valorint * 4}
                    if(userId == pauloid){data.DINHEIRO.paulo = data.DINHEIRO.paulo - valorint * 4}
                    if(userId == vitorid){data.DINHEIRO.vitor = data.DINHEIRO.vitor - valorint * 4}
                }
                if(pente != magica){
                    await interaction.channel.send(`**A flecha era falsa. Você recebe 25% do valor a mais**`)
                    if(userId == fabioid){ Math.ceil(data.DINHEIRO.fabio = data.DINHEIRO.fabio + valorint * 1.25)}
                    if(userId == amandaid){ Math.ceil(data.DINHEIRO.amanda = data.DINHEIRO.amanda + valorint * 1.25)}
                    if(userId == alvaroid){ Math.ceil(data.DINHEIRO.alvaro = data.DINHEIRO.alvaro + valorint * 1.25)}
                    if(userId == alexandreid){ Math.ceil(data.DINHEIRO.alexandre = data.DINHEIRO.alexandre + valorint * 1.25)}
                    if(userId == diogoid){ Math.ceil(data.DINHEIRO.diogo = data.DINHEIRO.diogo + valorint * 1.25)}
                    if(userId == gabrielid){ Math.ceil(data.DINHEIRO.gabriel = data.DINHEIRO.gabriel + valorint * 1.25)}
                    if(userId == heloid){ Math.ceil(data.DINHEIRO.heloise = data.DINHEIRO.heloise + valorint * 1.25)}
                    if(userId == isisid){ Math.ceil(data.DINHEIRO.isis = data.DINHEIRO.isis + valorint * 1.25)}
                    if(userId == kelsonid){ Math.ceil(data.DINHEIRO.kelson = data.DINHEIRO.kelson + valorint * 1.25)}
                    if(userId == otavioid){ Math.ceil(data.DINHEIRO.otavio = data.DINHEIRO.otavio + valorint * 1.25)}
                    if(userId == pauloid){ Math.ceil(data.DINHEIRO.paulo = data.DINHEIRO.paulo + valorint * 1.25)}
                    if(userId == vitorid){ Math.ceil(data.DINHEIRO.vitor = data.DINHEIRO.vitor + valorint * 1.25)}
                }
                await interaction.channel.send("╚─━━━━━━━━━━━━━━━━━━━━━━━━░★░━━━━━━━━━━━━━━━━━━━━━━━━─╝")
            }

            if(gigi == "Regras"){
                interaction.reply({content: "┏◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚◚┓\n\n**ALJAVA DE NARLON**\n\nEsse é o primeiro jogo criado pelo Deus da comédia, Bobby!\nEsse jogo faz parte da trindade dos jogos de cassino, em que tem pelo menos uma máquina nos cassinos e bares de *Fylakir*. Ele foi criado após Bobby após ele ver um homem de bobo da corte que, após fazer uma piada muito ruim, acabou sendo torturado em praça pública pelo Rei de Narlon. Porém, ele durou muito tempo, e apesar de toda população rir da cara dele, o Bobby não achou engraçado. Então, Bobby decidiu finalizar a carreiro do comediante, atirando uma flecha mágica na direção do homem, fazendo com que quando ela acerte, exploda em uma grande explosão de risadas, fazendo todos que estavam rindo dele, rir até a morte. Em homenagem ao comediante, Bobby decidiu criar um jogo em que ao receber a flecha mágica, você vai rir para não chorar!\n\n**Explicação**: A máquina irá pegar uma aljava de dentro do balcão e irá selecioanr uma flecha. Ao pegar a flecha, ela irá atirar na sua direção. Caso a flecha seja feita de algodão (Falsa) você irá receber 25% de lucro do valor apostado. Porém, caso a flecha voe em sua direção de forma teleguiada e te acerte com um corte supericial (flecha verdadeira) você irá perder 5x do valor apostado.\n\n┗◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛◛┛", ephemeral: true})
                reset()
            }

        }
        writeDataToFile(data);
        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
    }
}