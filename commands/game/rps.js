const commando = require('discord.js-commando');
const fs = require('fs').promises;

class RPSCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'rps',
      //aliases: ['l'],
			group: 'game',
			memberName: 'rps',
			description: 'Bet sum'
			
		});
		
		
	}
	
	async run(message, args) {
		function rps(inp) {
			let gamePool = ['r','p','s'];
			let random = gamePool[Math.round(Math.random()*2)]
			if(inp=='r'){
				if(random=='r'){
					return -1;
				} else if(random=='p'){
					return false;
				} else return true;
			} else if(inp=='p'){
				if(random=='p'){
					return -1;
				} else if(random=='s'){
					return false;
				} else return true;
			} else if(inp=='s'){
				if(random=='s'){
					return -1;
				} else if(random=='r'){
					return false;
				} else return true;
			} else {
				return "err";
			}
		}
    let arg = parseInt(message.content.split(" ")[1]);
		if(Number.isInteger(arg)){
			let coinFile = await fs.readFile('./commands/game/coin.json', 'utf8');
			let niceWorker = JSON.parse(coinFile);
			if(niceWorker.hasOwnProperty(message.author.id)){
				if(niceWorker[message.author.id]['coins']<args) 
					message.channel.send(`Sad ${message.member}, not enough wealth.`);
				else {
					const filter = m => m.author.id === message.author.id;
					message.channel.send("Enter your choice; Rock, Paper, or Scissor? Type cancel to close.")
					message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected=>{
						if(collected.first().content.toLowerCase() === "cancel"){
							return message.reply("Canceled!");
						}
						else {
							let result= rps(collected.first().content.toLowerCase().charAt(0));
							let change =0;
							if(result=="err"){
								message.channel.send(`${message.member}, Enter valid input and try again.`);
							} if(result==-1){
								message.channel.send(`${message.member}, Draw.`);
							} if(result==true){
								message.channel.send(`GG ${message.member}, You Won ${2*args}!`);
								change = 2*args;
							} if(result==false){
								message.channel.send(`Sad ${message.member}, You Lost! ${args}`);
								change = -args;
							}
							(async function save() {
								niceWorker[message.author.id]['coins']+=change;
							await fs.writeFile('./commands/game/coin.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
							})();
							
						}
					}).catch(err => { console.log(err)});
				}
			} else {
				message.channel.send(`Sad ${message.member}, you got no coins; Use claim command to get few.`);
			}
		} else {
			message.channel.send(`${message.member}, Enter valid amount to bet.`);
		}
	
  }


}

module.exports = RPSCommand;