const commando = require('discord.js-commando');
const discord = require('discord.js');
const Lyricist = require('lyricist');
var api = require('genius-api');
var genius = new api("UnC8km9pj6BN2D4kKpeJRZDY-cp1dqZFxLzhpE-Em8dY4MuESo6-WIDNvwS0SBlb");
const lyricist = new Lyricist("UnC8km9pj6BN2D4kKpeJRZDY-cp1dqZFxLzhpE-Em8dY4MuESo6-WIDNvwS0SBlb");

class LyricsCommand extends commando.Command {
	constructor (client) {
		super(client,{
			name: 'lyrics',
      aliases: ['l'],
			group: 'music',
			memberName: 'lyrics',
			description: 'Showcase the lyrics of provided song.'
			
		});
		
		
	}
	
	
	async run(message, args) {
    if (true) {
      let username = this.client.user.username;
      let userurl = this.client.user.avatarURL;
        genius.search(args).then(function(response) {
            const embedOPTIONS = new discord.RichEmbed()
              .setColor('#0099ff')
              .setTitle('Lyrics Database')
              //.setAuthor(username, userurl,  'http://dragoon.play.ai/')
              .setFooter(username, userurl,  'http://dragoon.play.ai/')
              .setDescription('Please select an option, else respond with "cancel".')
              .setTimestamp();
            let db = response.hits;
            let tempString="";
            if(db[0].type=="song") embedOPTIONS.addField(`1. ${db[0].result.full_title}`,`Respond with "1" for ${db[0].result.title}.`);
            if(db[1].type=="song") embedOPTIONS.addField(`2. ${db[1].result.full_title}`,`Respond with "2" for ${db[1].result.title}.`);
            if(db[2].type=="song") embedOPTIONS.addField(`3. ${db[2].result.full_title}`,`Respond with "3" for ${db[2].result.title}.`);
            //tempString = tempString + "\nEnter any valid input from 1-3; else type cancel."
            const filter = m => m.author.id === message.author.id;
            message.channel.send(embedOPTIONS).then(r=> r.delete(10000));
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected=>{
                if(collected.first().content === "cancel"){
                   return message.reply("Canceled!"); 
                }
                else {
                    async function sendLYRICS(num) {
                        let id=response.hits[num].result.id;
                        const song = await lyricist.song(id,{ fetchLyrics: true });
                        //return message.channel.send(song.lyrics, {split: true});
                        console.log(song);
                      for(let i = 0; i < song.lyrics.length; i += 2000) {
                        const toSend = song.lyrics.substring(i, Math.min(song.lyrics.length, i + 2000));
                        let embed = new discord.RichEmbed()
                            .setColor("00FFFF")
                            .setDescription(toSend);
                        await message.channel.send({ embed });
                        }
                      
                        
                    }
                    if(collected.first().content === "1"){                       
                        return sendLYRICS(0);
                    }
                    else if(collected.first().content === "2"){                       
                        return sendLYRICS(1);
                    }
                    else if(collected.first().content === "3"){                       
                        return sendLYRICS(2);
                    }
                    else{
                        return message.channel.send(`${message.member} not valid input`);
                    }
                }
            }).catch(err => { console.log(err)});
        });        
	}
        
	}


}

module.exports = LyricsCommand;