const commando = require('discord.js-commando');

class RankCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'rank',
			group: 'xp',
			memberName: 'rank',
			description: 'Showcase your ranking in the guild.'
			
			});
		
		
		}
	
	async run(message, args) {
		
  }

}

module.exports = RankCommand;