const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Exibe o ping do bot.'
        });
    }

    run = (interaction) => {
        interaction.reply({
            content: `O ping do bot é de \`${this.client.ws.ping} ms\`.`,
            ephemeral: true
        });
    }
}