const Discord = require('discord.js-commando');

class QueueMusicCommand extends Discord.Command {

    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            aliases: ['nextsongs'],
            description: 'Show the following songs',
            throttling: {
                usages: 1,
                duration: 60
            },
        });
    }

    async run(message, { NbSong }) {
        var id = message.guild.id;
        if (global.servers[id].queue != null) {

            var i, infoMessage = "";
            var d = new Date();
            for (i = 0; i < min(global.servers[id].queue.length,50);) 
            {
                infoMessage += `${++i}: [${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}h${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}]\t ${global.servers[id].queue[i - 1].title}\n`                
                d.setSeconds(d.getSeconds() + global.servers[id].queue[i - 1].duration);
                if (i % 5 == 0){
                    message.say(infoMessage);
                    infoMessage = "";
                }
            }
            if (infoMessage != "")
            {
                message.say(infoMessage);
            }
            
        }
    }
}

module.exports = QueueMusicCommand;