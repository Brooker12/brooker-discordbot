const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "embed",
  description: "Create embed message",
  category: "Moderation",
  usage: "`embed <title> | <description> | [#hex color]`",
  detail: `**Example**
\`\`\`
- Example 1
{prefix}embed Your Title here | Your Description Here | #Hex Color

- Example 2
{prefix}embed New Update Channel | 
- Added new channel for bot command
- Added new private channel for VIP | #ffff
\`\`\``,
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: ["emd"],
  run: async (client, message, args) => { 
    
    let title = args.join(' ').split('|')[0]
    let xtitle = new MessageEmbed().setColor(client.config.color) 
     .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
     .setDescription(`Title is required`).setFooter(`read more ${client.config.prefix}help embed`)
    if(!title) return message.channel.send(xtitle)
    let description = args.join(' ').split('|')[1]
    let xdecs = new MessageEmbed().setColor(client.config.color) 
     .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
     .setDescription(`Description is required`).setFooter(`read more ${client.config.prefix}help embed`)
    if(!description) return message.channel.send(xdecs)
    let colour = args.join(' ').split('|')[2]
    if(!colour) colour = client.config.color
    
    let embed = new MessageEmbed().setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(message.member.nickname ? message.member.displayName : message.author.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
    message.delete()
  }
}