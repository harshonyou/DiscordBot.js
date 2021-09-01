const commando = require('discord.js-commando');
const color = ["#FF6F61","#6B5B95","#F7CAC9","#92A8D1","#955251","#B565A7","#DD4124","#D65076","#45B8AC","#EFC050","#5B5EA6","#DFCFBE","#55B4B0","#E15D44","#7FCDCD","#BC243C","#C3447A","#98B4D4"]


class FunMirrorCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'mirror', 
			group: 'simple', 
			memberName: 'mirror',
			description: 'Look at your reflection in a Mirror!'
			
			});
		
		
		}
	
	
	async run(message, args) {
		//if (message.channel.type !== 'text') return;	
    //console.log(color[Math.floor(Math.random()*color.length)].slice(1));
		let randomclr =  parseInt(color[Math.floor(Math.random()*color.length)].slice(1),16);
		let embed = {
			"embed": {
			  "title": "Here's your reflection....",
			  "color": randomclr,
			  "timestamp": new Date(),
			  "footer": {
				"icon_url": `${this.client.user.avatarURL}`,
				"text": `${this.client.user.username}`,
				"url": "http://dragoon.play.ai/"
			  },
		  
			  "image": {
				"url": `${message.author.avatarURL}`
			  },
			  "author": {
				"name": `${message.author.username}`,
				"icon_url": `${message.author.avatarURL}`
			  }
			}
		  }
		message.channel.send(embed);
  }
}
module.exports = FunMirrorCommand;