const commando = require('discord.js-commando');

class ListCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'list',
			group: 'xp',
			memberName: 'list',
			description: 'Showcase top guild members with highest XPs.'
			
			});
		
		
		}
	
	async run(message, args) {
		
  }

}

module.exports = ListCommand;