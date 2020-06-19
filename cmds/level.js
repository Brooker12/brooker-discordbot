const db = require('quick.db')
const discord = require('discord.js')
const { getInfo } = require("../xp.js")
module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    
    if(user.id === client.user.id) { //IF BOT
      return message.channel.send("😉 | I am on level 100")
    }
    
    if(user.bot) {
      return message.channel.send("Bot do not have levels")
    }
    
    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    
    const {level, remxp, levelxp} = getInfo(xp);
    if(xp === 0) return message.channel.send(`**${user.tag}** is out of the xp`)
    
    let embed = new discord.RichEmbed()
    .setAuthor(user.username, message.guild.iconURL)
    .setColor("#ff2050")
    .setThumbnail(user.avatarURL)
    .setDescription(`**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`)
    
 message.channel.send(embed)   
    
}
module.exports.help = {
    name: "level",
    description: "show level xp",
    category: "Level",
    usage: "`level <@user>`"
}