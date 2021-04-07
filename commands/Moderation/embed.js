const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "embed",
  description: "Create embed message",
  category: "Moderation",
  usage: "embed <title> | <description> | [colour]",
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: [""],
  run: async (client, message, args) => { 
    
    let title = args.join(' ').split('|')[0]
    let description = args.join(' ').split('|')[1]
    let colour = args.join(' ').split('|')[2]
    if(!colour) colour = client.config.color
    
    let embed = new MessageEmbed().setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(message.member.nickname ? message.member.displayName : message.author.username, message.author.displayAvatarURL())
    message.channel.send(embed)
    
  }
}