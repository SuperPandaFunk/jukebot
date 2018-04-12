const Discord = require('discord.js-commando');

class StopMusicCommand extends Discord.Command {

    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            aliases: ['unpause','toggle'],
            description: 'Pause the current song'
        });
    }

    async run(message, args) {
        if (!message.member.voiceChannel) {
            return message.say("You must be in a voice channel!");
        }
        var id = message.guild.id;
        if (global.servers[id].dispatcher){
            if (global.servers[id].dispatcher.paused){
                global.servers[id].dispatcher.resume();
            }else{
                global.servers[id].dispatcher.pause();
            }
            
        } 
    }
}

module.exports = StopMusicCommand;