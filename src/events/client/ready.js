const Event = require('../../structures/Event');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    }

    run = async () => {
        console.log(`O Bot ${this.client.user.username} está ligado.`);
        this.client.registryCommands();
        await this.client.connectToDatabase();
    }
}