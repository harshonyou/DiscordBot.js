const commando = require('discord.js-commando');
const fs = require('fs').promises;
const date = require('date-and-time');

class ClaimCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'claim',
      //aliases: ['l'],
			group: 'game',
			memberName: 'claim',
			description: 'ok'
			
		});
		
		
	}
	
	async run(message, args) {
		
		let coinFile = await fs.readFile('./commands/game/coin.json', 'utf8');
		let niceWorker = JSON.parse(coinFile);
		if(niceWorker.hasOwnProperty(message.author.id)){
			let current = new Date();
			let previous = new Date(niceWorker[message.author.id]['tZone_work']);
			if(date.subtract(current,previous).toMinutes()>10){
				let bonus = Math.floor(Math.random()*50+50);
				niceWorker[message.author.id]['coins']+=bonus;
				niceWorker[message.author.id]['tZone_work']=current;
				message.channel.send(`GG ${message.member}, you worked hard and earned ${bonus}.`);
				await fs.writeFile('./commands/game/coin.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
			} else {
				message.channel.send(`Sad ${message.member}, you have to wait ${(10-date.subtract(current,previous).toMinutes()).toString().slice(0,3)} minutes.`);
			}
		} else {
			niceWorker[message.author.id]={};
			niceWorker[message.author.id]['userTag']=message.member.user.tag;
			niceWorker[message.author.id]['coins']=0;
			niceWorker[message.author.id]['tZone_work']=new Date();
			niceWorker[message.author.id]['tZone_daily']=new Date(2019);
			niceWorker[message.author.id]['tZone_weekly']=new Date(2019);
			let bonus = Math.floor(Math.random()*50+50);
			niceWorker[message.author.id]['coins']+=bonus;
			message.channel.send(`GG ${message.member}, you worked hard and earned ${bonus}.`);
			await fs.writeFile('./commands/game/coin.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
		}
	
	
  }


}

module.exports = ClaimCommand;