const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'navio',
            description: 'Informações sobre o server (navio)'
        });
    }

    run = async (interaction) => {
        const members = interaction.guild.members.cache;
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        let nsfw;

        if (interaction.guild.nsfwLevel === 'EXPLICIT' || interaction.guild.nsfwLevel === 'AGE_RESTRICTED') {
            nsfw = 'Mar agitado! (NSFW)'
        } else if (interaction.guild.nsfwLevel === 'SAFE' || interaction.guild.nsfwLevel === 'DEFAULT') {
            nsfw = 'Local seguro!'
        }

        const embed = new MessageEmbed()
            .setColor('#eca104')
            .setTitle(interaction.guild.name)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addField(`Dono`, `<@${interaction.guild.ownerId}>`, true)
            .addField(`Verificado`, `${interaction.guild.verified ? 'Navio registrado na guarda costeira' : 'Navio Pirata!'}`,true)
            .addField(`Criado há`, `${moment(interaction.guild.createdTimestamp).format("LT")}
                ${moment(interaction.guild.createdTimestamp).format("LL")}
                ${moment(interaction.guild.createdTimestamp).fromNow()}`,true)

            .addField(`Segurança`, `${nsfw}`,true)
            .addField(`Contagem canal`, `${interaction.guild.channels.cache.size}`, true)
            .addField(`Canais de texto:`, `${interaction.guild.channels.cache.filter(ch => ch.type === 'text').size}`,true)

            .addField(`Canais de voz:`, `${interaction.guild.channels.cache.filter(ch => ch.type === 'text').size}`, true)
            .addField(`Contagem de membros`, `${interaction.guild.memberCount}`, true)
            .addField(`Humanos`, `${members.filter(me => !me.user.bot).size}`, true)

            .addField(`Bots`, `${members.filter(me => me.user.bot).size}`, true)
            .addField(`Emojis Regular`, `${interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size}`, true)
            .addField(`Emojis animados`, `${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}`, true)

            .addField(`${roles.length} CARGOS`, `\`${roles.length < 6 ? roles.join(", ") : roles.length > 6 ? trimArray(roles) : "NONE"}`,true)
            .setTimestamp();

        interaction.reply({ content: 'Informações do navio (servidor) foi capturads.', ephemeral: true });
        interaction.channel.send({ embeds: [embed] });
    }
}

function trimArray(arr, maxLength=10){
    if(arr.length > maxLength){
        const length = arr.length - maxLength;
        arr.push(`${length}, more...`)
    }
    return arr;
}