const commando = require('discord.js-commando');
const fs = require('fs').promises;

class LevelCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'level',
			group: 'xp',
			memberName: 'level',
			description: 'Showcase your current level and XP earned.'
			
			});
		
		
		}
		async run(message, args) {
  }


}

module.exports = LevelCommand;