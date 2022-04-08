const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'marujo',
            description: 'Informações sobre o usuario.'
        });
    }

    run = async (interaction) => {
        moment.locale('pt-br');
        let join = Date.now() - interaction.guild.members.cache.get(interaction.member.id).joinedAt;
        const joined = Math.floor(join / 86400000);

        const joinDate = moment.utc(interaction.member.joinedAt).format('LLLL');

        const userEmbed = new MessageEmbed()
            .setTitle(interaction.member.user.tag)
            .setColor('#eca104')
            .addField('📡 Tag do Discord', `${interaction.member.user.tag}`, true)
            .addField('📅 Conta criada em:', `${moment.utc(interaction.member.user.createdAt).format('LLLL')}`, true)
            .addField('🏴‍☠️Entrou para a tripulação em:', `${joinDate} \n> ${joined} dias atrás`)
            .setThumbnail(interaction.member.displayAvatarURL())
            .setTimestamp();

        // interaction.reply({ content: 'Suas informações estão prontas!', ephemeral: true });
        // interaction.channel.send({ embeds: [userEmbed] });
        interaction.reply({ embeds: [userEmbed] });
    }
}