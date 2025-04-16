const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bau')
        .setDescription('Envia mensagens embutidas com botões para o usuário.'),
        async execute(interaction) {
            // Array de cargos com IDs (substitua pelos IDs dos cargos do seu servidor)
            const roles = [
                { name: 'Cargo 1', id: '111111111111111111' },
                { name: 'Cargo 2', id: '222222222222222222' },
                { name: 'Cargo 3', id: '333333333333333333' }
            ];
    
            // Verifica se o comando foi usado em um servidor
            if (!interaction.guild) {
                return interaction.reply({
                    content: 'Este comando só pode ser usado em servidores.',
                    ephemeral: true
                });
            }
    
            // Envia um embed e botões para cada cargo
            for (const role of roles) {
                // Criação do embed
                const embed = new EmbedBuilder()
                    .setTitle('Escolha um cargo')
                    .setDescription(`Você gostaria de receber o cargo **${role.name}**?`)
                    .setColor(0x00AE86);
    
                // Criação dos botões
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`accept_${role.id}`)
                        .setLabel('Aceitar')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`decline_${role.id}`)
                        .setLabel('Recusar')
                        .setStyle(ButtonStyle.Danger)
                );
    
                // Envia a mensagem para o usuário no privado
                await interaction.user.send({ embeds: [embed], components: [row] }).catch((error) => {
                    console.error(`Não foi possível enviar a mensagem para o usuário:`, error);
                });
            }
    
            // Responde ao comando
            await interaction.reply({
                content: 'As opções de cargos foram enviadas para você no privado!',
                ephemeral: true
            });
        },
    };
    
    module.exports.interactionHandler = async (interaction) => {
        if (!interaction.isButton()) return;
    
        const customId = interaction.customId;

        if (customId.startsWith('accept_') || customId.startsWith('decline_')) {
            const roleId = customId.split('_')[1];
            const guild = interaction.guild;
            const member = interaction.member;
    
            if (!guild || !member) {
                return interaction.reply({
                    content: 'Houve um problema ao processar sua interação.',
                    ephemeral: true
                });
            }
    
            if (customId.startsWith('accept_')) {
                try {
                    const role = guild.roles.cache.get(roleId);
                    if (!role) {
                        return interaction.reply({
                            content: 'Este cargo não existe no servidor.',
                            ephemeral: true
                        });
                    }
    
                    await member.roles.add(role);
                    return interaction.reply({
                        content: `Você recebeu o cargo **${role.name}**!`,
                        ephemeral: true
                    });
                } catch (error) {
                    console.error(error);
                    return interaction.reply({
                        content: 'Não foi possível adicionar o cargo.',
                        ephemeral: true
                    });
                }
            } else if (customId.startsWith('decline_')) {
                return interaction.reply({
                    content: 'Você recusou o cargo.',
                    ephemeral: true
                });
            }
        }
    };