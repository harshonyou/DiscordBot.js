const commando = require('discord.js-commando');
const discord = require('discord.js');

class CoinFlipCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'coin',
			group: 'random',
			memberName: 'coin',
			description: 'Flips a coin, landing on either Heads or Tails.'
			
			});
		
		
		}
	
	
	async run(message, args) {
    
		var chance = Math.floor(Math.random() *2);
		if(chance ==0) {
      const embed = new discord.RichEmbed() //"Hello, my name is Aei!","England is my citylitty", true
            .addField(`${message.author.username}`,'Your coin landed on Heads!')
            .setColor('#5218FA');
        return message.embed(embed);
			}
		else
      {
        const embed = new discord.RichEmbed()
            .addField(`${message.author.username}`,'Your coin landed on Tails!')
            .setColor('#F28500');
        return message.embed(embed);
      }
			
		
           /* const { text } = args;
        const embed = new RichEmbed()
            .setDescription(text)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0x00AE86)
            .setTimestamp();
        return message.embed(embed);*/
		
		}


}

module.exports = CoinFlipCommand;