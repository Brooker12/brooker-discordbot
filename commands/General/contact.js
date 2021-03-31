const Discord = require("discord.js");
const config = require('../../config.json')
const db = require('quick.db')

module.exports = {
  name: 'contact',
  description: "contact the team support",
  category: "General",
  usage: "`contact <text>`",
  cooldown: 100000,
  aliases: ["bug", "sugest", "report"],
  run: async (client, message, args) => { 
  
    let xdemb = new Discord.MessageEmbed().setColor(client.config.color) 
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("Missing Arguments!")
    .setDescription(`Usage: \`${module.exports.usage}\``)
    .setTimestamp();  
    if(!args[0]) return message.channel.send(xdemb)
    
    const hayu = new Discord.MessageEmbed().setColor(client.config.color)
    .setAuthor(`${message.author.tag} Contact`, message.author.displayAvatarURL())
    .setDescription(`Succesfully contact team support`)
    message.channel.send(hayu)
    
     const embed = new Discord.MessageEmbed().setColor(client.config.color)
      .setAuthor(`${message.author.tag} Contact`, message.author.displayAvatarURL())
      .addField(`Sugestion:`, `${args.slice(0).join(' ')}`)
      .setFooter(`From: ${message.guild.name}`)
const webhookClient = new Discord.WebhookClient(config.WebhookID, config.WebhookToken);
 webhookClient.send({
    username: 'Brooker Logs',
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
    
    
  }
}