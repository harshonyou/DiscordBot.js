const commando = require('discord.js-commando');
const fs = require('fs').promises;
const date = require('date-and-time');

class FlipCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'flip',
      //aliases: ['l'],
			group: 'game',
			memberName: 'flip',
			description: 'ok'
			
		});
		
		
	}
	
	async run(message, args) {
    
		function flip(amt) {
			let urnum = Math.floor(Math.random()*2)
			let botnum = Math.floor(Math.random()*2)
			if(urnum===botnum) return amt*2;
			else return 0;
		}
    let arg = parseInt(message.content.split(" ")[1]);
		if(Number.isInteger(arg)){
			let coinFile = await fs.readFile('./commands/game/coin.json', 'utf8');
			let niceWorker = JSON.parse(coinFile);
			if(niceWorker.hasOwnProperty(message.author.id)){
				if(niceWorker[message.author.id]['coins']<args) 
					message.channel.send(`Sad ${message.member}, not enough wealth.`);
				else {
					let luck = flip(args);
					if(luck!=0){
						message.channel.send(`GG ${message.member}, you won ${luck}.`);
						niceWorker[message.author.id]['coins']+=luck;
						await fs.writeFile('./commands/game/coin.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
					}
					else {
						message.channel.send(`Sad ${message.member}, you lost ${args}.`);
						niceWorker[message.author.id]['coins']-=args;
						await fs.writeFile('./commands/game/coin.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
					}
				}
			} else {
				message.channel.send(`Sad ${message.member}, you got no coins; Use claim command to get few.`);
			}
		
	}
  }


}

module.exports = FlipCommand;