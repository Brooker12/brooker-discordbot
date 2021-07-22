const {MessageEmbed} = require("discord.js");
const ms = require('ms')

module.exports = {
  name: "alarm",
  description: "Alarm",
  category: "General",
  usage: "`alarm <s (seconds) | m (minutes) | h (hours)> <reason>`",
  aliases: ["remind", "remindme"],
  run: async (client, message, args) => { 
    
  let xdamb = new MessageEmbed().setColor(client.config.color) 
  .setAuthor("Invalid Arguments!", message.author.displayAvatarURL())
  .setDescription(`You can't set your alarm bigger than 12 hours`)
  let xdemb = new MessageEmbed().setColor(client.config.color) 
  .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
  .setDescription(`Usage: ${module.exports.usage}`)
  .setFooter(`Ex: ${client.config.prefix}alarm 5m dinner`)
    
  let time = args[0]
  if(!time) return message.channel.send(xdemb)
  if(ms(time) > ms("12h")) return message.channel.send(xdamb)
  let reason = args.slice(1).join(' ')
  if(!reason) return message.channel.send(xdemb)
  
  const embed = new MessageEmbed().setColor(client.config.color)
  .setAuthor(`${message.author.username} Alarm`,message.author.displayAvatarURL())
  .setDescription(`Your set the alarm **${time}** from now for **${reason}**`)
  message.channel.send(embed)
  
  setTimeout(() => {
   const embed = new MessageEmbed().setColor(client.config.color)
   .setAuthor(`${message.author.username} Alarm`,message.author.displayAvatarURL())
   .setDescription(`Your alarm is up now it's time to **${reason}**`)
   .setFooter(`Alarm seted in: ${message.guild.name}, ${time} ago`)
  message.author.send(embed)
  }, ms(time))
    
  }}