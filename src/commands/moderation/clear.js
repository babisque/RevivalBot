const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Limpa o chat',
            options: [
                {
                    name: 'quantidade',
                    type: 'NUMBER',
                    description: 'Quantidade de mensagem para apagar',
                    required: true
                }
            ]
        });
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            interaction.reply({ content: 'Você não tem permissão para deletar mensagens.', ephemeral: true })
                .then(m => m.delete(5000));
        }

        let qtd = interaction.options.getNumber('quantidade');
        if (isNaN(qtd) || qtd <= 0) {
            interaction.reply({ content: 'Quantidade inválida', ephemeral: true })
                .then(m => m.delete(5000));
        }

        let qtdDel = qtd;
        if (qtdDel > 100) {
            qtdDel = 100;
        }

        interaction.channel.bulkDelete(qtdDel, true)
            .then(interaction.reply({ content: 'Mensagens deletadas com sucesso!', ephemeral: true }))
            .catch(err => interaction.reply(`ERRO | ${err}`));
    }
}