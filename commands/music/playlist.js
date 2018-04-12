const Discord = require('discord.js-commando');
const fetchVideoInfo = require('youtube-info');
var request = require('request');

class AddPlaylistMusicCommand extends Discord.Command {
    constructor(client) {
        super(client, {
            name: 'playlist',
            group: 'music',
            memberName: 'playlist',
            description: 'Upload a playlist',
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
        this.addMusic = function (id, videoInfo) 
        {
            if (!this.isServerExist(id)) this.setServer(id);
            global.servers[id].queue.push(videoInfo);
        }
    }

    async run(message, { YURL }) {
        var Attachment = (message.attachments).array();
        if(Attachment[0].url.slice(-4) === '.txt')
        {
            request.get(Attachment[0].url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    message.reply(`Uploading file`);
                    var lines = body.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        //code here using lines[i] which will give you each line
                        let YTIDLong, YTID, YURL, id;
                        YURL = lines[i];
                        YTIDLong = YURL.split("watch?v=").pop();
                        YTID = YTIDLong.substring(0, Math.max(YTIDLong.search("&"), YTIDLong.length));
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

                                        return message.reply(`${videoInfo.title} has been added`);
                                    } else {
                                        return message.reply(`${YURL} is not a valid youtube URL`);
                                    }

                                });
                    }
                }
            })
        }
        
    }
}

module.exports = AddPlaylistMusicCommand;