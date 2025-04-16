const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const path = require('path');
const fs = require('fs');
const mestreid = "1099030674574422107"

//CÓDIGO PRO SORTEIO/FRASES DA PARISA
var timeout = [];
const milesegundos = 1000;
const segundos = milesegundos / 1000

//CÓDIGO DE OPÇÕES/AUTOCOMPLETE
module.exports = {
    data: new SlashCommandBuilder()
        .setName("musicas")
        .setDescription("Comando para musicas de sessões!")
        .addStringOption(option =>
			option.setName('circuz')
				.setDescription('Campanha Tropical de Ordem Paranormal')
				.setAutocomplete(true))
        .addStringOption(option =>
			option.setName('noiteescura')
				.setDescription('Campanha Noite Escura de Tormenta20')
				.setAutocomplete(true)),

    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;
        if (focusedOption.name === "circuz"){
            choices = [ "Ambiente Tranquilo", "Base da Ordem", "Combate", "Emocionante", "Investigação", "Sons Ambiente", "Suspense", "Sessão"]
        }
        if (focusedOption.name === "noiteescura"){
            choices = ["Ambiente Tranquilo", "Bares", "Combate Geral", "Daimonas", "Emocionante", "Investigação", "Lojas", "Lua" ,"OSTs", "Revolucionários", "Resumo da Sessão", "Suspense", "Sessão"]
        }
		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

        if (!interaction) return;

		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},

//CÓDIGO DE FUNCIONAMENTO
    async execute(interaction) {
        const user = interaction.member;
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: `Este comando está em cooldown, espere ${segundos} segundos`, ephemeral: true});
        if (!user.roles.cache.has(mestreid)){
            return interaction.reply({ content: "Você não tem acesso a esse comando", ephemeral: true })
        }
        if(interaction.options.getString('circuz')){
            const noiteescura = interaction.options.getString('circuz')
            let texto = "."

            //BASE OP
            if(noiteescura == "Base da Ordem"){
                await interaction.reply("# Base da Ordem")
                const musicas = new Map([
                    ["**Arnaldo:**", "https://youtu.be/qYaKzpMdBaM?si=8xgaP2px9wxztNVr"],
                    ["**Bianca:**", "https://youtu.be/fFyHffoPeHk?si=k36vWiN06r8uguma"],
                    ["**Izac:**", "https://youtu.be/SZ57rptOdOI?si=Kq5q2N_xoZ9j5m1j"],
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   ./p ${value}\n\n${texto}`)}}

            //SESSÃO
            if(noiteescura == "Sessão"){
                await interaction.reply("# Sessão")
                const musicas = new Map([
                    ["**Resumo:**", "https://youtu.be/-tNElSdS5y4?si=6sq54eQqll7mbhaV"],
                    ["**HIDEN N SEEK:**", "https://youtu.be/MRRs5vZu-UM?si=oDfRjRPWluqtaDUH"],
                    ["**MORTE DE ALGM:**", "https://youtu.be/tEXK-4cS3Rs?si=y5hUPlZuYmiyqQg4"],
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   ./p ${value}\n\n${texto}`)}}

            //Sons Ambiente
            if(noiteescura == "Sons Ambiente"){
                await interaction.reply("# Sons Ambiente")
                const musicas = new Map([
                    ["**Floresta:**", "https://youtu.be/DNwvIQEXHP4?si=L0LuPux1UlmmPOOr"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   ./p ${value}\n\n${texto}`)}}
                    
            //Investigação
            if(noiteescura == "Investigação"){
                await interaction.reply("# Investigação")
                const musicas = new Map([
                    ["**Investigação Séria:**", "https://www.youtube.com/watch?v=-h2iK_fxiXw"],
                    ["**Pavor:**", "https://youtu.be/VhqEPpEDbo0?si=lxsfVn3kCq32b4qK"],
                    ["**Investigar uma Sala:**", "https://youtu.be/1NRsjSVJQAo?si=shTXER8IAQMSLFXZ"],
                    ["**Investigar padrão:**", "https://youtu.be/WJweIkWhpps?si=hYcMwIuoIXhTtxum"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //Suspense
            if(noiteescura == "Suspense"){
                await interaction.reply("# Suspense")
                const musicas = new Map([
                    ["**Ansiedade (Tenso):**", "https://youtu.be/Ynum4kSlJJ4?si=k05-I2Y9pOiyLyuG"],
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //COMBATE
            if(noiteescura == "Combate"){
                await interaction.reply("# Combate")
                const musicas = new Map([
                    ["**Batalha:**", "https://www.youtube.com/watch?v=YRfaT7Z6dFo"],
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //AMBIENTE TRANQUILO
            if(noiteescura == "Ambiente Tranquilo"){
                await interaction.reply("# Ambiente Tranquilo")
                const musicas = new Map([
                    ["**Ambiente Geral:**", "https://www.youtube.com/watch?v=ZmCzUs5f9U0&list=PLwryoAfU-TebfYnv6RPNL3_jpRa2XWjVo"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}
            
            //EMOCIONANTE
            if(noiteescura == "Emocionante"){
                await interaction.reply("# Emocionante")
                const musicas = new Map([
                    ["**Esperança:**", "https://youtu.be/UALGR_urdUk?si=qrmzCPgkV3-dghnl"],
                    ["**Morte:**", "https://youtu.be/B-fBTFNxa1Y?si=zuuGgk8WBq4brHUc"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            
            interaction.channel.send(texto)
        }
        if(interaction.options.getString('noiteescura')){
            return
            const noiteescura = interaction.options.getString('noiteescura')
            let texto = "."

            //AMBIENTE TRANQUILO
            if(noiteescura == "Ambiente Tranquilo"){
                await interaction.reply("# Ambiente Tranquilo")
                const musicas = new Map([
                    ["**Ambiente Geral:**", "https://www.youtube.com/watch?v=ipFaubyDUT4"],
                    ["**Ambiente Deserto:**", "https://www.youtube.com/watch?v=maYRisfQQvc"],
                    ["**Ambiente Gelo:**", "https://www.youtube.com/watch?v=qD2ahwiPRBk&t=1056s"],
                    ["**Ambiente Floresta:**", "https://www.youtube.com/watch?v=XxEhuSJF780"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //RESUMO DA SESSÃO
            if(noiteescura == "Resumo da Sessão"){
                await interaction.reply("# Resumo da Sessão")
                const musicas = new Map([
                    ["**Resumo da Sessão:**", "https://youtu.be/u3EBlmzb9ds?si=TFgR93Q2b7c1eps2"],
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //LUA
            if(noiteescura == "Lua"){
                await interaction.reply("# Lua")
                const musicas = new Map([
                    ["**Frases da Lua:**", "https://youtu.be/4uKdU19drsw?si=ful8vI0-Y066Qnid"],
                    ["**Escuridão:**", "https://www.youtube.com/watch?v=Jg_QwWE_5cY"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //COMBATE GERAL
            if(noiteescura == "Combate Geral"){
                await interaction.reply("# Combate Geral")
                const musicas = new Map([
                    ["**Iniciativa:**", "https://youtu.be/BynCpEWBRxs?si=SDvteYg2BPhxXzzv"],
                    ["**Combate Pesado:**", "https://www.youtube.com/watch?v=TVkWheiLVFA&list=PLwryoAfU-TeZ6LscW0fORjdWOVflwT6RX&index=1"],
                    ["**Combate Elaborado:**", "https://www.youtube.com/watch?v=THiK__o054E&list=PLwryoAfU-TeYd1jVCig-d7uFgWMJ-7oNi&index=1"],
                    ["**Combate Medieval:**", "https://www.youtube.com/watch?v=t3B802PIuB0"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}
            
            //BARES
            if(noiteescura == "Bares"){
                await interaction.reply("# Bares")
                const musicas = new Map([
                    ["**Taverna Padrão:**", "https://youtu.be/vyg5jJrZ42s?si=sNxqYVP6pxhCHzD_"],
                    ["**Taverna Calma:**", "https://www.youtube.com/watch?v=bQBbRWo0j5g"],
                    ["**Taverna Festa/Festival:**", "https://www.youtube.com/watch?v=7k3TtxqGqsk"],
                    ["**Taverna Famosa:**", "https://www.youtube.com/watch?v=kfbYb5yfaE8"],
                    ["**Taverna Afastada:**", "https://youtu.be/-ae4GgctPaM?si=m6fi2B9oq5Ktn8c_"],
                    ["**Taverna no Deserto:**", "https://youtu.be/dhA8BtU8MaI?si=Pot1Wlq4S7sMg-8K"],
                    ["**Taverna Jogos e Apostas:**", "https://www.youtube.com/watch?v=u2jLHdpo2AQ"],
                    ["**Taverna no Gelo:**", "https://youtu.be/orgikrTCKTc?si=DhVJAhuWRGLe_VhU"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}
            
            //INVESTIGAÇÃO
            if(noiteescura == "Investigação"){
                await interaction.reply("# Investigação")
                const musicas = new Map([
                    ["**Investigação Padrão:**", "https://www.youtube.com/watch?v=sGQFWM19DEw"],
                    ["**Algo Importante:**", "https://www.youtube.com/watch?v=aseJg4Truyc"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}
            
            //SUSPENSE
            if(noiteescura == "Suspense"){
                await interaction.reply("# Suspense")
                const musicas = new Map([
                    ["**Suspense Padrão:**", "https://www.youtube.com/watch?v=EApZmmYg_oQ"],
                    ["**Suspense Tenso:**", "https://www.youtube.com/watch?v=fv_7EurNAss&t=1s"],
                    ["**Algo está errado:**", "https://www.youtube.com/watch?v=CNf6BL8gwbw"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //REVOLUCIONÁRIOS
            if(noiteescura == "Revolucionários"){
                await interaction.reply("# Revolucionários")
                const musicas = new Map([
                    ["**Revolucionários Padrão:**", "https://youtu.be/7T3SU4Ht1Yw?si=d0uqB3kTqSl8heF5"],
                    ["**Sala do Poyo:**", "https://youtu.be/4JWANCA-Pbw?si=5taqn-wogfurhR5d"],
                    ["**Sala da Sanara:**", "https://www.youtube.com/watch?v=g1tnWLa8sDA"],
                    ["**Sala do Keanu:**", "https://www.youtube.com/watch?v=GPS__dZQVc4"],
                    ["**Sala da Tina:**", "https://youtu.be/Q3CJ0tUevxQ?si=ZdWDd6j8Gw82ZLEt"],
                    ["**Sala da Fahlir:**", "https://www.youtube.com/watch?v=BvMKa8c_Elg"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //DAIMONAS
            if(noiteescura == "Daimonas"){
                await interaction.reply("# Daimonas")
                const musicas = new Map([
                    ["**Daimonas Padrão:**", "https://youtu.be/ddMSMwKQkKI?si=8AvREQlbD17uYhVW"],
                    ["**Pácê:**", "https://www.youtube.com/watch?v=L174Wh1Ahxc"],
                    ["**Blácê:**", "https://www.youtube.com/watch?v=0fIn9BrWHE4&list=PLwryoAfU-TeZc2sJXDjHgmsSOjJbWwZsw"],
                    ["**Apostas:**", "https://youtu.be/cGUAp_xoi4o?si=Zus8C1XddQAaYYKk"],
                    ["**Bola de Fogo:**", "https://www.youtube.com/watch?v=fzRDvc7jekY"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            //LOJAS
            if(noiteescura == "Lojas"){
                await interaction.reply("# Lojas")
                const musicas = new Map([
                    ["**Itens Mágicos:**", "https://www.youtube.com/watch?v=tpi5qsXm_cM&t=39s"],
                    ["**Loja de Comidas:**", "https://www.youtube.com/watch?v=ljTfHitG0eA"],
                    ["**Loja Geral:**", "https://www.youtube.com/watch?v=rjyROIFCzbo"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}
            
            //OSTs
            if(noiteescura == "OSTs"){
                await interaction.reply("# OSTs")
                const musicas = new Map([
                    ["**Ashura:**", "https://youtu.be/fI_nqyKdA54?si=HI2IJEstIku2qBM5"],
                    ["**Bobby:**", "https://youtu.be/0dlHtgodzoE?si=BC4x6aDl4g5yN5s3"],
                    ["**Deus da Inteligência:**", "https://www.youtube.com/watch?v=RG1ydqEEa0c"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}
            
            //EMOCIONANTE
            if(noiteescura == "Emocionante"){
                await interaction.reply("# Emocionante")
                const musicas = new Map([
                    ["**Morte Honrosa:**", "https://www.youtube.com/watch?v=CO4-SwN-D-s"],
                    ["**Morte de Jogador:**", "https://www.youtube.com/watch?v=TWN_AkPDqQc"],
                    ["**Emocionante Geral:**", "https://www.youtube.com/watch?v=qywKyXfswsg"],
                    ["**Nostalgia:**", "https://www.youtube.com/watch?v=DLWqxqMYlXE"]
                ])
                for (let [key, value] of musicas) {
                    texto = (`${key}   m!p ${value}\n\n${texto}`)}}

            
            
            interaction.channel.send(texto)
        }

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, milesegundos)
}}