const Event = require('../../structures/Event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends  Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        });
    }

    run = async (member) => {
        const guildDB = await this.client.db.guilds.findById(member.guild.id);

        if (guildDB?.welcome) {
            const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel);

            const embed = new MessageEmbed()
                .setTitle(`Ahoy, marujo!`)
                .setDescription(`Seja bem vindo a bordo!\nPegue sua garrafa de Rum e venha saquear navios com a tripulação, ${member.toString()}!`)
                .setColor('#eca104')
                .setTimestamp()
                .setThumbnail(member.displayAvatarURL({ dynamic: true }));

            welcomeChannel?.send({ embeds: [embed] });
        }

        member.roles.add('932670120952729671');
    }
}