const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "nice"
module.exports = class HiCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'nice',
            aliases: [],
            group: 'social',
            memberName: 'nice',
            description: "nice",
            details: oneLine`
            Onyx loves saying hi to people.
			`,
            examples: ["hi"]
        });
    }

    async run(msg, args) {
    }
};  