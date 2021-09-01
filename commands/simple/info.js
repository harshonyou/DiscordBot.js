const commando = require('discord.js-commando');
const discord = require('discord.js');



class InfoAboutMeCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'info',
			group: 'simple',
			memberName: 'info',
			description: 'Learn a little more about me!'
			
			});
		
		
		}
	
	
	async run(message, args) {
		var myInfo = new discord.RichEmbed()
      .addField("Hello, my name is Aei!","England is my city And if it weren't for Team 10, then the US would be shitty I'll pass it to Chance 'cause you know he stay litty", true)

      .addField("PS","Why You Even Checking Out? LMFAO?", true)
      
      .setColor('#8A2BE2')
      .setThumbnail( message.author.avatarURL)
      .setTitle('Info You Asked For')
      .setURL("http://dragoon.play.ai/")
      .setFooter("Thanks for reading. I hope you learned a little, or a lot about me :D")
		message.channel.sendEmbed(myInfo);
  }
}
module.exports = InfoAboutMeCommand;