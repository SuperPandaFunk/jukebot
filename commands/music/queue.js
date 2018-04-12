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

    async run(message, args) {
        if (!message.member.voiceChannel) {
            return message.reply("You must be in a voice channel!");
        }
        var id = message.guild.id;
        if (global.servers[id] != null) {
            var i;
            var info = "";
            var d = new Date();
            d.setHours(d.getHours() + global.servers[message.guild.id].hourdiff);
            for (i = 0; i < Math.min(global.servers[id].queue.length, 50);) {
                info += `${++i}: [${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}h${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}]\t ${global.servers[id].queue[i - 1].title}\n`
                d.setSeconds(d.getSeconds() + global.servers[id].queue[i - 1].duration);
            }
            if (info != "") {
                message.say(info);
            }
        } 
    }
}

module.exports = QueueMusicCommand;