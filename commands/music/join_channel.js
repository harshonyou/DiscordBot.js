const commando = require('discord.js-commando');

class JoinChannelCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'join',
      aliases: ['summon','j'],
			group: 'music',
			memberName: 'join',
			description: 'Joins the Voice Channel of the commander.'
			
			});
		
		
		}
	
	
	async run(message, args) {
		if(message.member.voiceChannel) {
			if(!message.guild.voiceConnection) {
				
				message.member.voiceChannel.join() 
					.then(connection =>{
							message.reply("Successfully Joined!");
						})
					}
				}
				else {
					message.reply("You must be in a Voice Channel to summon me!");
        }
  }
}
				 




module.exports = JoinChannelCommand;