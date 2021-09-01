const commando = require('discord.js-commando');
const discord = require('discord.js');
const color = ["#FF6F61","#6B5B95","#F7CAC9","#92A8D1","#955251","#B565A7","#DD4124","#D65076","#45B8AC","#EFC050","#5B5EA6","#DFCFBE","#55B4B0","#E15D44","#7FCDCD","#BC243C","#C3447A","#98B4D4"]


class DiceRollCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'roll',
			group: 'random',
			memberName: 'roll',
			description: 'Rolls a six sided dice.'
			
			});
		
		
		}
	
	
	async run(message, args) {
		var diceRoll = Math.floor(Math.random() *6)+1;
		
			//message.reply("Your dice landed on "+diceRoll);
      const embed = new discord.RichEmbed() //"Hello, my name is Aei!","England is my citylitty", true
            .addField(`${message.author.username}`,`Your dice landed on ${diceRoll}!`)
            .setColor(color[diceRoll]);
        return message.embed(embed);
			


}
}
module.exports = DiceRollCommand;