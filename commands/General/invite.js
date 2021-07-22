const {MessageEmbed} = require("discord.js");
const ms = require('ms')

module.exports = {
  name: "alarm",
  description: "Alarm",
  category: "General",
  usage: "`alarm <s (seconds) | m (minutes) | h (hours)> <reason>`",
  aliases: ["remind", "remindme"],
  run: async (client, message, args) => { 
    
  let time = args[0]
  if(!time)return message.reply("how minutes / hours will you set your alarm")
  if(ms(time) > ms("1d"))return message.reply("you can't set your alarm bigger than 1 day")
  let reason = args.slice(1).join(' ')
  if(!reason)return message.reply("please give some reason")
  
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