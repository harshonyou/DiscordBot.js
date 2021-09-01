
const http = require('http');
const express = require('express');
const app = express();
const token = "";
const Music = require('discord.js-musicbot-addon');
const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({
    commandPrefix: ">",
    owner: '182749079024041985',
});
const fs = require('fs').promises;

let prefix = ">";


client.registry.registerGroup('simple','Simple');
client.registry.registerGroup('music','Music');
client.registry.registerGroup('random','Random');
client.registry.registerGroup('meta','Meta');
client.registry.registerGroup('space','Space');
client.registry.registerGroup('social','Social'); 
client.registry.registerGroup('search','Search');
client.registry.registerGroup('media','Media');
client.registry.registerGroup('fun','Fun');
client.registry.registerGroup('xp','XP');
client.registry.registerGroup('game','Game');

client.registry.registerGroup('message_formatting','Message Formatting'); 
//message_formatting


client.registry.registerDefaults();
client.registry.registerCommandsIn("./commands");



client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => {
  console.log('Yo this ready!')
  client.user.setStatus('idle');
  client.user.setPresence({ game: { name: 'Dragoon', type: 2 } });
  client.users.get("182749079024041985").send("Im Back");
});

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));



client.on('message', message => {
    switch(message.content.toUpperCase()) {
        case '!!!!!RESTART':
            resetBot(message.channel);
            break;

        // ... other commands
    }
});

// Turn bot off (destroy), then turn it back on
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(token));
}

client.on('message', message => {
    switch(message.content.toUpperCase()) {
        case '!!!!!DESTROY':
            resetbot(message.channel);
            break;

        // ... other commands
    }
});

// Turn bot off (destroy), then turn it back on
function resetbot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Destroying...')
    .then(msg => client.destroy())
    
}


/*
var api = require('genius-api');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
var ticket = '';
var genius = new api(ticket);var url = ''; var title = ''; var find="";
const discord = require('discord.js');

client.on('message', message => {
    if(message.author.bot) return;
    //console.log(client.user);
    var arr = message.content.toLowerCase().split(" ");
    //console.log(arr);
    var len = arr.length;
    if (arr[0] === '<lyrics' || arr[0] === '<l') {
        var find="";
        if(len == 1) {
            find = client.user.presence.game.name.toString();
        }
        else {
            for ( var i = 1 ; i < len ; i++ )
            find = find + " " + arr[i];
        }
        console.log(find);

        genius.search(find).then(function(response) {

            
            try {
              //console.log('hits', response.hits[0].result.url);
              url= response.hits[0].result.url+"";
              title = response.hits[0].result.full_title;
              
              //console.log(url);
              
              
              fetch(url)
                .then(res => res.text())
                .then(body => {
                    //console.log(body)
                    const $ = cheerio.load(body);
                    const lyrics = $('.lyrics').text();
                    const releaseDate = $('metadata_unit-info','metadata_unit-info--text_only').text();
                    //console.log(lyrics);
                    
                     
                    
                    message.channel.send(lyrics, { split: true });
                    
                    var indexA = body.indexOf("application/ld+json") + 21;
                    var indexB = body.indexOf("</script>" , indexA)
                    var obj = JSON.parse(body.substring( (indexA) , (indexB) ));
                    //console.log(obj.datePublished);
                    //console.log(title);
                    //console.log(releaseDate);
                    
                    //console.log(obj);
                  });
            }
            
            catch(err) {
              message.channel.send("Lyrics Not Found. Feels Sad Mate");
            }
          });
      //message.channel.send('pong');
    }
});

*/


//leveling System
client.on('message', async message => {
	if(message.author.bot) return;
	if(message.content.startsWith(">")) return;
	if(message.guild === null) return;
  if(message.content.toLocaleLowerCase().startsWith("nice")) {
		let xpFile = await fs.readFile('nicecount.json', 'utf8');
		let niceWorker = JSON.parse(xpFile);
		if(niceWorker.hasOwnProperty(message.author.id)){
			niceWorker[message.author.id]['niceCOUNT']++;
			await fs.writeFile('nicecount.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
		} else {
			niceWorker[message.author.id]={};
			niceWorker[message.author.id]['userTag']=message.member.user.tag;
			niceWorker[message.author.id]['niceCOUNT']=1;
			await fs.writeFile('nicecount.json', JSON.stringify(niceWorker,null,4), 'utf8').catch(err=>console.log(err));
		}
	}
	else {
		let xpFile = await fs.readFile('userxp.json', 'utf8'); //./commands/xp/
		let xpWorker = JSON.parse(xpFile);
		if(xpWorker.hasOwnProperty(message.guild.id)){
			let guildWorker = xpWorker[message.guild.id];
			if(guildWorker.hasOwnProperty(message.author.id)){
				let userTracker = guildWorker[message.author.id];
				let currentXp = userTracker['userXP'];
				let gainedXp = Math.round(Math.random()*48);
				let updatedXp = currentXp+gainedXp;
				let currentLvl = userTracker['userLevel'];
				let updatedLvl = Math.floor(updatedXp/786);
				if(currentLvl != updatedLvl){
					message.channel.send(`GG ${message.member}, you just advanced to level ${updatedLvl}!`);
				}
				xpWorker[message.guild.id][message.author.id]['userXP']=updatedXp;
				xpWorker[message.guild.id][message.author.id]['userLevel']=updatedLvl;
				await fs.writeFile('userxp.json', JSON.stringify(xpWorker,null,4), 'utf8').catch(err=>console.log(err));
			} else {
				xpWorker[message.guild.id][message.author.id]={};
				xpWorker[message.guild.id][message.author.id]['userTag']=message.member.user.tag;
				xpWorker[message.guild.id][message.author.id]['userXP']=Math.round(Math.random()*250);
				xpWorker[message.guild.id][message.author.id]['userLevel']=0;
				await fs.writeFile('userxp.json', JSON.stringify(xpWorker,null,4), 'utf8').catch(err=>console.log(err));
			}
		} else {
			xpWorker[message.guild.id] ={}; 
			xpWorker[message.guild.id]['guildName'] = message.guild.name; 
			xpWorker[message.guild.id]['memberCount'] = message.guild.memberCount;
			await fs.writeFile('userxp.json', JSON.stringify(xpWorker,null,4), 'utf8').catch(err=>console.log(err));
		}
	}
});


client.on('message', async message => {
	//console.log(message.member.displayName);
	//console.log(client.users.cache.get("182749079024041985"));
	if(message.author.bot) return;
	if(message.guild === null) return;
	if(message.content.toLowerCase() === `${prefix}level`){
		let xpFile = await fs.readFile('userxp.json', 'utf8');
		let xpWorker = JSON.parse(xpFile);
		message.channel.send(`${message.member}, your are currently on level ${xpWorker[message.guild.id][message.author.id]['userLevel']}, with ${xpWorker[message.guild.id][message.author.id]['userXP']} XP!`);
	}
  if(message.content.toLowerCase() === `${prefix}nice`){
		let xpFile = await fs.readFile('nicecount.json', 'utf8');
		let niceWorker = JSON.parse(xpFile);
		message.channel.send(`${message.member} your nice count is ${niceWorker[message.author.id]['niceCOUNT']}.`);
	}
	if(message.content.toLowerCase() === `${prefix}list`){
		let xpFile = await fs.readFile('userxp.json', 'utf8');
		let xpWorker = JSON.parse(xpFile);
		let tempHash=[];
		let arr = Object.keys(xpWorker[`${message.guild.id}`]);
		for(let i=2;i<arr.length;i++){
			tempHash[i]=[xpWorker[`${message.guild.id}`][arr[i].toString()]["userXP"],arr[i]];
		}
		tempHash.shift();tempHash.shift();
    tempHash.sort((a,b) => a[0] - b[0]).reverse();
		let tempString="";
		if(tempHash.length<10){
			for(let i =1; i<=tempHash.length; i++){
        let num = Math.floor(tempHash[i-1][0]/786);
				tempString=tempString+`\n${i}. ${client.users.get(tempHash[i-1][1]).username} (level ${num})`;
			}
			message.channel.send(`${tempString}`);
		}
		else {
			for(let i =1; i<=10; i++){
        let num = Math.floor(tempHash[i-1][0]/786);
				tempString=tempString+`\n${i}. ${client.users.get(tempHash[i-1][1]).username} (level ${num})`;
			}
			message.channel.send(`${tempString}`);
		}
	}
  if(message.content.toLowerCase() === `${prefix}rank`){
		let xpFile = await fs.readFile('userxp.json', 'utf8');
		let xpWorker = JSON.parse(xpFile);
		let tempHash=[];
		let arr = Object.keys(xpWorker[`${message.guild.id}`]);
		for(let i=2;i<arr.length;i++){
			tempHash[i]=[xpWorker[`${message.guild.id}`][arr[i].toString()]["userXP"],arr[i]];
		}
		tempHash.shift();tempHash.shift();
		let key=message.author.id;
    tempHash.sort((a,b) => a[0] - b[0]).reverse();
		for (let i = 0; i < tempHash.length; i++) {
			if(tempHash[i][1]==key){
				message.channel.send(`${message.member}, your rank is #${i+1}!`);
			}
		}
	}
});




client.login(token);