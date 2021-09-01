const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "creator"
module.exports = class CreatorCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'creator',
            aliases: [],
            group: 'meta',
            memberName: 'creator',
            description: "Get info. on who coded This Waifue.",
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
                    title: `About This Waifue`,
                    description: "This Bot was coded by Harsh Mohan, a young developer. \n If you want to see more of his work, check out his website, http://dragoon.play.ai/",
                    fields: [{
                        name: "How To Make Dragoon's Day",
                        value: "Why don't you give me a follow on Social Media \n You Can Get 'Em From http://link.dragoon.play.ai/"
                    }
                    ],
                    footer: {
                        text: `${this.client.users.get("182749079024041985").username}#${this.client.users.get("182749079024041985").discriminator}`
                    }
                }//client.users.get("182749079024041985")
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};