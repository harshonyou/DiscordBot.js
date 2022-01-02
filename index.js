const Commando = require('discord.js-commando');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// https://discord.js.org/#/docs/main/v12/class/Client
const client = new Commando.Client({
	commandPrefix: '?',
	owner: process.env.OWNER
});

const XPSYS = require(path.join(__dirname, 'commands', 'xp', 'xpsystem.js'))

client.registry
	.registerGroups([
        ['first', 'Your First Command Group'],
        ['xp', 'Your XP Command Group']
    ])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	
	// https://discord.js.org/#/docs/main/v12/class/ClientUser
	client.user.setPresence({status: 'idle', activity: {name: 'https://harsh.sh/', type: 'STREAMING', url: 'https://harsh.sh/'}});

	// https://discord.js.org/#/docs/main/v12/class/User?scrollTo=fetch
	client.users.fetch("182749079024041985").then((user)=>{
		user.send("HEY");
	})
});

client.on('message', async message => {
	// https://discord.js.org/#/docs/main/v12/class/Message?scrollTo=fetch
	if(message.author.bot | message.guild === null) return;
	await XPSYS(message, client)
})

client
	.on('warn', console.warn)
	.on('error', console.error)
	.on('debug', console.log)
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

client.login(process.env.TOKEN);