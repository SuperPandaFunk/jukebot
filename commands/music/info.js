const Discord = require('discord.js-commando');

class InfoMusicCommand extends Discord.Command {

    constructor(client) {
        super(client, {
            name: 'info',
            group: 'music',
            memberName: 'info',
            aliases: ['now_playing'],
            description: 'Show the current song and list the x following songs',
            args: [
                {
                    key: 'NbSong',
                    prompt: 'How many songs to display next?',
                    type: 'integer',
                    default: 5
                }
            ]
        });
    }

    async run(message, { NbSong }) {
        if (!message.member.voiceChannel) {
            return message.reply("You must be in a voice channel!");
        }
        var id = message.guild.id;
        if (global.servers[id] != null)
        {
            message.say(`Now playing: ${global.servers[id].live.title}`)
            message.say(`${global.servers[id].live.url}`)
            var i;
            for (i = 0; i < Math.min(global.servers[id].queue.length, NbSong);) {
                message.say(`${++i}: ${global.servers[id].queue[i-1].title}`)
            }
        } 
    }
}

module.exports = InfoMusicCommand;