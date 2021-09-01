const { Client } = require("discord.js-commando");
//process.env.PREFIX

const client = new Client({
    commandPrefix: '.',
    owner: "182749079024041985"
});

console.log(process.env.ACCNAME)