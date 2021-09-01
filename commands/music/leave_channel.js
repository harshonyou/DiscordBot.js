const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'leave',
			group: 'music',
			memberName: 'leave',
			description: 'Leaves the Voice Channel of the commander.'
			
			});
		
		
		}
	
	
	async run(message, args) {
		if(message.guild.voiceConnection) {
			message.guild.voiceConnection.disconnect();
		}
		else
				message.reply("I must be in a Voice Channel to be banished!");
  }
}

module.exports = LeaveChannelCommand;