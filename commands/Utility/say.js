const { MessageEmbed, Util} = require('discord.js')

module.exports = {
  name: "say",
  description: "Make the bot say whatever you want!",
  category: "Utility",
  usage: "`say <text>`",
  aliases: [""],
  cooldown: 2000,
  run: async (client, message, args) => { 
    
  let a = args.slice(0).join(" ")
  
  let xdemb = new MessageEmbed().setColor(client.config.color) 
  .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
  .setDescription(`Usage: ${module.exports.usage}`)
  if (!a) return message.channel.send(xdemb)
  
  message.channel.send(Util.cleanContent(a, message))
   
    message.delete();
}}