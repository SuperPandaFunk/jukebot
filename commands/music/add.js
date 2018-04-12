const Discord = require('discord.js-commando');
const fetchVideoInfo = require('youtube-info');
const search = require('youtube-search');
var opts = { maxResults: 1, key: 'AIzaSyCfLjiSz-0MdkmIW8adhhwhs21XHt0zHQU' };

class AddMusicCommand extends Discord.Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'music',
            memberName: 'add',
            aliases: ['push','put'],
            description: 'Play music from youtube',
            args: [
                {
                    key: 'YURL',
                    prompt: 'What is the Youtube URL?',
                    type: 'string'
                }
            ]
        });
        this.setServer = function (id) {
            global.servers[id] = {
                queue: [],
                live: {},
                repeat: 0
            }
        }
        this.isServerExist = function (id) { return !(!global.servers[id]); }
        this.addMusic = function (id, videoInfo) 
        {
            if (!this.isServerExist(id)) this.setServer(id);
            global.servers[id].queue.push(videoInfo);
        }
    }

    async run(message, { YURL }) {
        let YTIDLong, YTID;
        if(YURL.search("watch?v=") > 0)
        {
            YTIDLong = YURL.split("watch?v=").pop();
            YTID = YTIDLong.substring(0, Math.max(YTIDLong.search("&"), YTIDLong.length));
            message.delete();
            fetchVideoInfo(YTID).then(function (videoInfo) {
                if (videoInfo.title != null) {
                    if (global.servers[message.guild.id] == null) {
                        global.servers[message.guild.id] = {
                            queue: [],
                            live: {},
                            repeat: 0,
                            hourdiff: 0
                        }
                    }
                    global.servers[message.guild.id].queue.push({ title: videoInfo.title, duration: videoInfo.duration, url: videoInfo.url, id: videoInfo.videoId });

                    message.reply(`${videoInfo.title} has been added`);
                } else {
                    message.reply(`${YURL} is not a valid youtube URL`);
                }


            });
        }else
        {
            search(YURL, opts, function (err, results) {
                if (err) return console.log(err);
                let link = results[0].id
                message.delete();
                fetchVideoInfo(link).then(function (videoInfo) {
                    if (videoInfo.title != null) {
                        if (global.servers[message.guild.id] == null) {
                            global.servers[message.guild.id] = {
                                queue: [],
                                live: {},
                                repeat: 0,
                                hourdiff: 0
                            }
                        }
                        global.servers[message.guild.id].queue.push({ title: videoInfo.title, duration: videoInfo.duration, url: videoInfo.url, id: videoInfo.videoId });

                        message.reply(`${videoInfo.title} has been added`);
                    } else {
                        message.reply(`${YURL} is not a valid youtube URL`);
                    }


                });
            });
        }


    }
}

module.exports = AddMusicCommand;