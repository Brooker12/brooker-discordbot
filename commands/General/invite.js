const {MessageEmbed} = require("discord.js");
const ms = require('ms')

module.exports = {
  name: "invite",
  description: "bot invite url",
  category: "General",
  usage: "`invite`",
  aliases: [""],
  run: async (client, message, args) => { 
    
  let time = args[0]
  if(!time)return message.reply("how minutes / hours will you set your alarm")
  if(ms(time) > ms("1d"))return message.reply("you can't set your alarm bigger than 1 day")
  let reason = args.slice(1).join(' ')
  if(!reason)return message.reply("please give some reason")
  
  const embed = new MessageEmbed().setColor(client.config.color)
  .setAuthor(`${message.author.tag} Alarm`,message.author.displayAvatarURL())
  .setDescription(`**${message.author.username}** sets the alarm **${time}** from now for **${reason}**`)
  message.channel.send(embed)
  
  setTimeout(() => {
   const embed = new MessageEmbed()
   .setAuthor(`${message.author.tag} Your alarm has been ended`,message.author.displayAvatarURL())
   .setColor(client.config.color)
   .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nAlarm seted in server: \`${message.guild.name}\``)
  message.author.send(embed)
  }, ms(time))
    
  }}