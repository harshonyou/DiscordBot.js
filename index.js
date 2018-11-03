//const Discord = require('discord.js'); //importing discord
//const bot = new Discord.Client(); //making a bot from a discord 

const commando = require('discord.js-commando');
const bot = new commando.Client({
    owner: '182749079024041985',
    commandPrefix: '*'
});

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");



/* bot.on('message', (message) => {

    if(message.content == 'ping') {
        // message.reply('pong'); , will tag that person and send message
        message.channel.sendMessage('pong'); //send message to that perticular channel only
    }

}); */



bot.login('NDQ1OTA3OTUyMjE4NDA2OTEy.Dr-Jxw.aWqKzbK4j0m9Q8Vt1oiKA1CLunM'); //login our bot, goes online
