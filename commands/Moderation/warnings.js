const {MessageEmbed} = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warnings",
  description: "Check users warnings have or all member have warnings",
  category: "Moderation",
  usage: "`warnings / warnings <@user>`",
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: [""],
  run: async (client, message, args) => { 
    
     const user = message.mentions.users.first() 
     
     if(!args[0]) {
    
    let list = db.all().filter(data => data.ID.startsWith(`warns_${message.guild.id}_`)).sort((a, b) => b.data - a.data)
    list.length = 10;
    var finalLb = "";
    for (var i in list) {
    finalLb += `${list.indexOf(list[i])+1}. **${client.users.cache.get((list[i].ID.split('_')[2])).username}** - \`[${list[i].data.amount.slice(-1)[0]}]\` Warns
- Lastest: **${list[i].data.reason.slice(-1)[0]}**\n`;
    }
    
    let warnings = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Warnings List in ${message.guild.name}`, client.user.displayAvatarURL())
     .setDescription(finalLb || "No one have warns in this Guild.")
    
    message.channel.send(warnings)
    
    } else if (!user) {
      let xdemb = new MessageEmbed().setColor(client.config.color) 
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription("You need mentions users first")
      .setTimestamp();  
      return message.channel.send(xdemb)
    } else {
    
      const warn = await db.fetch(`warns_${message.guild.id}_${user.id}.amount`);
      
      if(warn && warn.length) {
        let warns = db.fetch(`warns_${message.guild.id}_${user.id}.reason`).sort((a, b) => b.data - a.data)
        warns.length = 10;
        var finalLb = "";        
        for (var i in warns) {
         finalLb += `${warns.indexOf(warns[i])+1}. ${warns[i]}\n`;
        }
       var warnEmbed = new MessageEmbed().setColor(client.config.color)
       .setAuthor(`Check Warns`, user.displayAvatarURL())
       .setDescription(`**${user.username}** have \`${warn.slice(-1).pop()}\` n warns:\n${finalLb}`)
    
       message.channel.send(warnEmbed);
      } else {
       var warnEmbed = new MessageEmbed().setColor(client.config.color)
       .setAuthor(`Check Warns`, user.displayAvatarURL())
       .setDescription(`**${user.username}** have 0 warns`)
    
       message.channel.send(warnEmbed); 
      }
    }
  }
}
