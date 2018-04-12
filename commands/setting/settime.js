const Discord = require('discord.js-commando');

class SetTimeCommand extends Discord.Command {
    constructor(client) {
        super(client, {
            name: 'time',
            group: 'setting',
            memberName: 'time',
            aliases: ['hour', 'settime'],
            description: 'Set the current Hour time',
            args: [
                {
                    key: 'hour',
                    prompt: 'What is the current hour? [0h-23h]',
                    type: 'integer'
                }
            ]
        });
        this.setServer = function (id) {
            global.servers[id] = {
                queue: [],
                live: {},
                repeat: 0,
                hourdiff: 0
            }
        }
        this.isServerExist = function (id) { return !(!global.servers[id]); }
    }

    async run(message, { hour }) {

        if (global.servers[message.guild.id] == null) {
            global.servers[message.guild.id] = {
                queue: [],
                live: {},
                repeat: 0,
                hourdiff: 0
            }
        }
        var d = new Date();
        global.servers[message.guild.id].hourdiff = hour - d.getHours();
        d.setHours(d.getHours() + global.servers[message.guild.id].hourdiff);
        message.reply(`It's now [${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}h${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}]`);

    }
}

module.exports = SetTimeCommand;