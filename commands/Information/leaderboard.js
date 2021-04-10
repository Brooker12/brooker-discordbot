const {MessageEmbed} = require("discord.js")
const db = require("quick.db")
const { getInfo } = require("../../handlers/xp.js")

module.exports = {
  name: "leaderboard",
  description: "Show top 10 level in your guild",
  category: "Information",
  usage: "`leaderboard`",
  aliases: ["top", "lb"],
  run: async (client, message, args) => {   
    
    let toggle = await db.fetch(`level_${message.guild.id}.toggle`)
    
      let embedt = new MessageEmbed()
     .setColor(client.config.color)
     .setAuthor('Leveling Settings', client.user.displayAvatarURL())
     .setDescription(`This Command has been disable by admins`)
     .setFooter(`To enable use: ${client.config.prefix}level-settings on`)
    if(toggle !== true) return message.channel.send(embedt)
    
    let list = db.all().filter(data => data.ID.startsWith(`xp_${message.guild.id}_`)).sort((a, b) => b.data - a.data)
    list.length = 10;
    
    var finalLb = "";
    for (var i in list) { 
     let xp = db.get(`xp_${message.guild.id}_${list[i].ID.split('_')[2]}`) || 0;
     let user = client.users.cache.get(list[i].ID.split('_')[2])
     let member = message.guild.members.cache.get(list[i].ID.split('_')[2])
     
     const { level, remxp, levelxp } = getInfo(xp);
     finalLb += `${list.indexOf(list[i])+1}. **${member ? member.displayName : user ? user.username : "DeletedUser"}** - Level \`${level}\`\n`
    }
      let position = list.map(x => x.ID).indexOf(`xp_${message.guild.id}_${message.author.id}`) + 1;
      
      let embed = new MessageEmbed()
      .setAuthor(`Leaderboard on ${message.guild.name}`, message.guild.iconURL())
      .setColor(client.config.color)
      .setDescription(`${finalLb || "Nothing"} `)
      .setFooter(`You're position in ${position}th`)
      
      message.channel.send(embed)
  }
}