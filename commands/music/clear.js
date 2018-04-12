const Discord = require('discord.js-commando');

class ClearMusicCommand extends Discord.Command {

    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'music',
            memberName: 'clear',
            aliases: ['clean'],
            description: 'Clear the playlist queue'
        });
    }

    async run(message, args) {
        var id = message.guild.id;
        if (global.servers[id].queue) {
            global.servers[id].queue =[];
        }
    }
}

module.exports = ClearMusicCommand;