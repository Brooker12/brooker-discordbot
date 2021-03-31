const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  description: "Warns the member you tag with the reason given.",
  category: "Moderation",
  usage: "`warn <@user> [reason] | warn <@user> clear`",
  aliases: [""],
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  cooldown: 2000,
  run: async (client, message, args) => {
    
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    let xdemb = new MessageEmbed().setColor(client.config.color) 
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You need mentions users first")
    .setTimestamp();  
    if(!user) return message.channel.send(xdemb)
  
    const warns = await db.fetch(`warns_${message.guild.id}_${user.id}.amount`)
    
    if (args[1] === 'delete' || args[1] === 'clear') {
      db.delete(`warns_${message.guild.id}_${user.id}`)
      return message.channel.send(`Succesfully clear ${user} warnings`)
    }
    
    let warn;
    
    if(warns && warns.length) {
      warn =  warns.slice(-1)[0]
    } else {
      warn = 0
    }
    

    let reason = args.slice(1).join(" ");
  
    if (!reason) {
      reason = "No reason given";
    } else {
      reason = `${reason}`;
    }
  
    let embed1 = new MessageEmbed().setColor(client.config.color)
     .setTitle("Mod: Warned")
     .setDescription(`**Warn** ${message.mentions.users.first().tag} **Total warn:** ${warn+1} \n**Reason** ${reason}`)
     .setFooter(`Moderator: ${message.author.username}`);
   
    message.channel.send(embed1)
  
    db.push(`warns_${message.guild.id}_${user.id}.amount`, warn+1)
    db.push(`warns_${message.guild.id}_${user.id}.reason`, reason)  
    
  }
}