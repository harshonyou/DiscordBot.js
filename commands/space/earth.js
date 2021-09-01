const commando = require('discord.js-commando');

const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')

const color = ["#FF6F61","#6B5B95","#F7CAC9","#92A8D1","#955251","#B565A7","#DD4124","#D65076","#45B8AC","#EFC050","#5B5EA6","#DFCFBE","#55B4B0","#E15D44","#7FCDCD","#BC243C","#C3447A","#98B4D4"]


//let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.
var name = "earth"
module.exports = class EarthCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'earth',
			aliases: ['earth-photo'],
			group: 'space',
			memberName: 'earth',
			description: "See live footage of Earth, as seen from the NOAA DSCVRY probe.",
		 
		});
	}

	async run(msg, args) {
        //msg.reply("Pinging the Nasa Database for live earth footage . . .")
        var earth_link = "https://api.nasa.gov/EPIC/api/natural/images?api_key=lUSv6ohk52Zf7J6tpL1qAzg5jcawlA7Ztff3SCiJ"
        let randomclr =  parseInt(color[Math.floor(Math.random()*color.length)].slice(1),16);
        fetch(earth_link)
            .then(res => res.json())
            .then((out) => {
                var earth_output = out;

                var randomNumber = getRandomNumber(0, earth_output.length - 1)
                var image_name = earth_output[randomNumber].image

                var date = earth_output[randomNumber].date;
                var date_split = date.split("-")

                var year = date_split[0];

                var month = date_split[1];

                var day_and_time = date_split[2];
                var sliced_date = day_and_time.slice(0, 2);
          let avatarurl = this.client.user.avatarURL;
          let usertext = this.client.user.username;
          
          (async function yikes(){
          
                var image_link = await `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png" 
                 let yikes = await image_link
                //console.log(image_link)
                //msg.channel.send(image_link)
                //msg.channel.send(`${earth_output[randomNumber].caption} on ${date}`)
                
            
               setTimeout(function(){ 
                 let embed =  {
                    "embed": {
                      "title": "Nasa Database",
                      "description": `${earth_output[randomNumber].caption}`,
                      "color": randomclr,
                      "timestamp": date,
                      "image": {
                      "url": `${yikes}`
                      },
                      "footer": {
                      "icon_url": `${avatarurl}`,
                      "text": `${usertext}`,
                      "url": "http://dragoon.play.ai/"
                      }
                    }
                    }
            
	          	 msg.channel.send(embed);
                 msg.channel.send(yikes);
                 
                 }, 100);
               })();
               
                
            })
			.catch(err => { throw err });
			
			function getRandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
	}

	
};