require('dotenv').config();

const Client = require('./src/structures/Client');

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES',
        'GUILD_INVITES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_VOICE_STATES'
    ]
});

client.login(process.env.TOKEN);