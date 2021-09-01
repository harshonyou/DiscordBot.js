const commando = require('discord.js-commando');
const fs = require('fs').promises;


class FlipCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'balance',
      //aliases: ['l'],
			group: 'game',
			memberName: 'balance',
			description: 'ok'
			
		});
		
		
	}
	
	async run(message, args) {
    
		let coinFile = await fs.readFile('./commands/game/coin.json', 'utf8');
		let niceWorker = JSON.parse(coinFile);
		if(niceWorker.hasOwnProperty(message.author.id)){
			message.channel.send(`${message.member}, your balance is ${niceWorker[message.author.id]['coins']}.`);
		} else {
			message.channel.send(`${message.member}, your balance is 0.`);
		}
	
  }


}

module.exports = FlipCommand;