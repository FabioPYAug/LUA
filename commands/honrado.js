const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("honrado")
        .setDescription("Eu sou o mais honrado!"),

    async execute(interaction) {
        const canvas = createCanvas(1200, 628);
        const ctx = canvas.getContext('2d');

        const fundoPath = path.join(__dirname, '..', 'imagens', 'honrado.jpg'); 
        const fundo = await loadImage(fundoPath);
        ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);

        const avatarURL = interaction.user.displayAvatarURL({ extension: 'png', size: 256 });
        const avatar = await loadImage(avatarURL);

        const avatarX = 500;
        const avatarY = 200;
        const avatarSize = 228;

        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize/2, avatarY + avatarSize/2, avatarSize/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'honrado.png' });
        await interaction.reply({ files: [attachment], content: `**${interaction.user.username}**, você é o mais honrado!` });
    }
}
