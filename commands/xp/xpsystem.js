const fs = require('fs').promises;
const path = require('path');


// module.exports = async function XPSYS(guildID, authorID, authorTag) {
module.exports = async function XPSYS(message) {
    let guildID = message.guild.id;
    let authorID = message.author.id;
    let authorTag = message.author.tag;
    let xpFile = await fs.readFile(path.join(__dirname, 'userxp.json'), 'utf8');
    let xpData = JSON.parse(xpFile);

    if (!xpData.hasOwnProperty(guildID)) {
        xpData[guildID] = {};
        xpData[guildID]['guildName'] = message.guild.name;
        xpData[guildID]['memberCount'] = message.guild.memberCount;
    }

    let targetGuild = xpData[guildID];
    let targetUser = targetGuild[authorID];
    let gainedXp = Math.round(Math.random()*48);
    let currentLvl, updatedLvl, updatedXp;

    if(!targetGuild.hasOwnProperty(authorID)){
        updatedXp = gainedXp;
        currentLvl = updatedLvl = 0;
        targetGuild[authorID] = {};
        targetUser = targetGuild[authorID];
    } else {
        let currentXp = targetUser['userXP'];
        updatedXp = currentXp+gainedXp;
        currentLvl = targetUser['userLevel'];
        updatedLvl = Math.floor(updatedXp/786);
    }
    
    if(currentLvl != updatedLvl){
        message.reply(`you just advanced to level ${updatedLvl}!`);
    }

    targetUser['authorTag'] = authorTag;
    targetUser['userXP'] = updatedXp;
    targetUser['userLevel'] = updatedLvl;

    await fs.writeFile(path.join(__dirname, 'userxp.json'), JSON.stringify(xpData,null,4), 'utf8').catch(err=>console.log(err));
}
