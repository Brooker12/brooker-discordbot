const discord = require('discord.js')
const moment = require('moment');

module.exports = {
  name: "snipe",
  description: "view the last deleted message in current channel",
  category: "General",
  usage: "`snipe`",
  aliases: [""],
  cooldown: 3000,
  run: async (client, message, args) => { 
  
  const msg = client.snipes.get(message.channel.id)
  let hadeh = new discord.MessageEmbed().setColor(client.config.color)
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`[ No messages are deleted on the channel ${message.channel.name} ]`)
  if(!msg) return message.channel.send(hadeh)
  
  const embed = new discord.MessageEmbed().setColor(client.config.color)
  .setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
  .setImage(msg.image)
  .setDescription(msg.content)
  .setFooter(moment.utc(msg.time).fromNow())
  message.channel.send(embed).catch(err => console.error(err));
}}