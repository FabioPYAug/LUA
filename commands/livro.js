const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const path = require('path');
const fs = require('fs');

var diaOrdem = "17/08/2008"
var diaNE = "61/Inferno/5-998"
//CÓDIGO PRO SORTEIO/FRASES DA PARISA
var timeout = [];
const milesegundos = 1000;
const segundos = milesegundos / 1000

//CÓDIGO DE OPÇÕES/AUTOCOMPLETE
module.exports = {
    data: new SlashCommandBuilder()
        .setName("livro")
        .setDescription("Comando para pegar os livros dos sistemas!")
        .addStringOption(option =>
			option.setName('ordem')
				.setDescription('Livros de Ordem Paranormal!')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('tormenta20')
				.setDescription('Livros de Tormenta20!')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('callofcthulhu')
				.setDescription('Livros de Call of Cthulhu!')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('dnd')
				.setDescription('Livros de D&D!')
				.setAutocomplete(true)),

    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;
        if (focusedOption.name === "ordem"){
            choices = [ "Ordem Paranormal RPG", "Sobrevivendo ao Horror"]
        }
        if (focusedOption.name === "tormenta20"){
            choices = ["Tormenta 20", "Voz dos Mares", "Distinções para T20"]
        }
        if (focusedOption.name === "dnd"){
            choices = ["Eberron Rising D&D", "Livro do Jogador 5.0", "Livro dos Monstros 5.0", "Livro do Mestre 5.0", "Guia de Xanathar para Tudo", "Caldeirão de Tasha para Tudo", "Guia do Volo para Monstros", "Monstros do Multiverso"]
        }
        if (focusedOption.name === "callofcthulhu"){
            choices = ["Call of Cthulhu - Horror RP"]
        }
		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

        if (!interaction) return;

		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},

//CÓDIGO DE FUNCIONAMENTO
    async execute(interaction) {
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Este comando está em cooldown, espere ${segundos} segundos`, ephemeral: true});

        if(interaction.options.getString('ordem')){
            const noiteescura = interaction.options.getString('ordem')
            let texto = "."

            //ORDEM PARANORMAL RPG
            if(noiteescura == "Ordem Paranormal RPG"){
            texto = (`*** https://drive.google.com/file/d/1QuauPEYlVZpa3lOXynMKo-0FJPpL6sDA/view?usp=drive_link ***`)}

            //SOBREVIVENDO AO HORROR
            if(noiteescura == "Sobrevivendo ao Horror"){
                texto = (`*** https://drive.google.com/file/d/1YcMunae2ONaFwYfJoV29OfStwbPIB4I-/view?usp=drive_link ***`)}


            await interaction.reply({content: texto, ephemeral: true})
        }

        if(interaction.options.getString('callofcthulhu')){
            const noiteescura = interaction.options.getString('callofcthulhu')
            let texto = "."

            //Call of Cthulhu - Horror RP
            if(noiteescura == "Call of Cthulhu - Horror RP"){
            texto = (`*** https://drive.google.com/file/d/1baoRDf0ZTK8Smm57d96KExpb-jPOY5Tu/view?usp=sharing ***`)}


            await interaction.reply({content: texto, ephemeral: true})
        }

        if(interaction.options.getString('tormenta20')){
            const noiteescura = interaction.options.getString('tormenta20')
            let texto = "."

            //TORMENTA 20
            if(noiteescura == "Tormenta 20"){
                texto = (`*** https://drive.google.com/file/d/1e8l200EMnGQKkFT6JIIaZJErSw48Qenl/view?usp=sharing ***`)}
            
            //Voz dos Mares
            if(noiteescura == "Voz dos Mares"){
                texto = (`*** https://drive.google.com/file/d/1iVwygbbSvdwhClql83qy8mE-vQtSGMoN/view?usp=sharing ***`)}

            //Distinções para T20
            if(noiteescura == "Distinções para T20"){
                texto = (`*** https://drive.google.com/file/d/1gHiAxZCEKpr5EGhVCP6Cd3EPzP4huOMN/view?usp=sharing ***`)}


            await interaction.reply({content: texto, ephemeral: true})
        }

        if(interaction.options.getString('dnd')){
            const noiteescura = interaction.options.getString('dnd')
            let texto = "."

            //Eberron Rising D&D
            if(noiteescura == "Eberron Rising D&D"){
            texto = (`*** https://drive.google.com/file/d/1NKblorNxkBndQGcq8s_GFH3Z3aZ4u8I2/view?usp=sharing ***`)}

            //Livro do Jogador 5.0
            if(noiteescura == "Livro do Jogador 5.0"){
                texto = (`*** https://drive.google.com/file/d/1tAznuakS2J1iMM-eJVnasJrlgbJSGXzy/view?usp=sharing ***`)}

            //Livro dos Monstros 5.0
            if(noiteescura == "Livro dos Monstros 5.0"){
                texto = (`*** https://drive.google.com/file/d/1T4ldXXgFnpfAOhOEf4C9ZDuN7ILIxJOF/view?usp=sharing ***`)}

            //Livro do Mestre 5.0
            if(noiteescura == "Livro do Mestre 5.0"){
                texto = (`*** https://drive.google.com/file/d/137Zi6N0lzWOOD8pF_xErQkBziTWHMrM-/view?usp=sharing ***`)}

            //Guia do Volo para Monstros
            if(noiteescura == "Guia do Volo para Monstros"){
                texto = (`*** https://drive.google.com/file/d/11QCbFbI24lWQ-zKTZSPePAN-GBBmulAb/view?usp=sharing ***`)}

            //Monstros do Multiverso
            if(noiteescura == "Monstros do Multiverso"){
                texto = (`*** https://drive.google.com/file/d/1elLTV3ni8bGXYcrTWWHDavK7nean5NRs/view?usp=sharing ***`)}

            //Caldeirão de Tasha para Tudo
            if(noiteescura == "Caldeirão de Tasha para Tudo"){
                texto = (`*** https://drive.google.com/file/d/1p8C_WG0IzJDxf8D5t7yJNbkPQ_5DWp47/view?usp=sharing ***`)}

            //Guia de Xanathar para Tudo
            if(noiteescura == "Guia de Xanathar para Tudo"){
                texto = (`*** https://drive.google.com/file/d/1wKBYfnM_WybNcRVROuWITYB4wOM89TC2/view?usp=sharing ***`)}


            await interaction.reply({content: texto, ephemeral: true})
        }
        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
}}