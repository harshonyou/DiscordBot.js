const { Command } = require('discord.js-commando');
const fs = require('fs').promises;
const path = require('path');

module.exports = class ListCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'list',
			aliases: [],
			group: 'xp',
			memberName: 'list',
			description: 'Tell the list.',
		});
	}
    
    async run(message) {
		let xpFile = await fs.readFile(path.join(__dirname, 'userxpUpdated.json'), 'utf8');
        let xpData = JSON.parse(xpFile);
        let guildId = message.guild.id

        let tempHash=[];
        let arr = Object.keys(xpData[guildId]);
        for(let i=2;i<arr.length;i++){
            tempHash[i-2]=[xpData[guildId][arr[i].toString()]["userXP"],arr[i]];
        }
        tempHash.sort((a,b) => a[0] - b[0]).reverse();
        let tempString="";
        for(let i=0; i < tempHash.length; i++){
            let num = Math.floor(tempHash[i][0]/786);
            tempString=tempString+`\n${i+1}. ${xpData[guildId][tempHash[i][1]]['authorTag']} (level ${num})`;	
        }
        return message.say(tempString)
	}
};

