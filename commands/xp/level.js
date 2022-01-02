const { Command } = require('discord.js-commando');
const fs = require('fs').promises;
const path = require('path');

module.exports = class LevelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'level',
			aliases: [],
			group: 'xp',
			memberName: 'level',
			description: 'Tell the level.',
		});
	}
    
    async run(message) {
		let xpFile = await fs.readFile(path.join(__dirname, 'userxp.json'), 'utf8');
    	let xpData = JSON.parse(xpFile);

		// Might be todo to add a check if user already exists in the database.
		
		return message.reply(`your are currently at level ${xpData[message.guild.id][message.author.id]['userLevel']}, with ${xpData[message.guild.id][message.author.id]['userXP']} XP!`);
	}
};

