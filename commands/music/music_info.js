const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "music"
module.exports = class MusicInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'music',
            aliases: [],
            group: 'music',
            memberName: 'music',
            description: "Get a bunch of helpful commands for the music bot.",
            details: "Get info. on who coded Onyx :eyes:",
            examples: ["creator"]
        });
    }

    async run(msg, { text }) {
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

     msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    title: `__**Music Bot**__`,
                    description: "Use the prefix `<` before using any of the commands mentioned below. \n More features would be added to bot in future, very soon.",
                    fields: [{
                        name: "	__Music:__",
                        value: "`nowplaying` - shows the song that is currently playing \n `play <title|URL|subcommand>` - plays the provided song \n `playlists` - shows the available playlists \n `queue [pagenum]` - shows the current queue \n `remove <position|ALL>` - removes a song from the queue \n `search <query>` - searches Youtube for a provided query \n `scsearch <query>` - searches Soundcloud for a provided query \n `shuffle` - shuffles songs you have added \n `skip` - votes to skip the current song" 
                        
                    },
                    {
                         name: "	__DJ:__",
                         value: "`forceskip` - skips the current song \n `pause` - pauses the current song \n `playnext <title|URL>` - plays a single song next \n `repeat [on|off]` - re-adds music to the queue when finished \n `skipto <position>` - skips to the specified song \n `stop` - stops the current song and clears the queue \n `volume [0-150]` - sets or shows volume"      
                    
                    },
                             {
                               name: "__Utility:__",
                               value: "`ping` - checks the bot's latency"
                             }
                             
                    ],

                  





                    
                    footer: {
                      
                        text: "Coded by dragoonfirestormar#2189 ^.^"
                    }
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};