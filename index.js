const Commando  = require('discord.js-commando');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// https://discord.js.org/#/docs/main/v12/class/Client
const client = new Commando.Client({
	commandPrefix: '?',
	owner: process.env.OWNER
});

client.registry
	.registerGroups([
        ['first', 'Your First Command Group']
    ])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	
	// https://discord.js.org/#/docs/main/v12/class/ClientUser
	client.user.setPresence({status: 'idle', activity: {name: 'hey', type: 'WATCHING', url: 'https://harsh.sh/'}});

	// https://discord.js.org/#/docs/main/v12/class/User?scrollTo=fetch
	client.users.fetch("182749079024041985").then((user)=>{
		user.send("HEY");
	})
});

client.on('warn', console.warn);

client.on('error', console.error);

client.on('disconnect', () => {
	console.log('I just disconnected, making sure you know, I will reconnect now..');
});

client.on('reconnecting', () => {
	console.log('I am reconnecting now!');
});

client.login(process.env.TOKEN);