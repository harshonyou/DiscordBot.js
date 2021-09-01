const commando = require('discord.js-commando');
class PlayCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Shows the song that is currently playing'
			
			});
		
		
		}
  async run(message, args) {
		
		}
}
module.exports = PlayCommand;