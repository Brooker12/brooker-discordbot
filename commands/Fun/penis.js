const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "penis",
  description: "Random penis presentace",
  category: "Fun",
  usage: "`penis <@user>`",
  aliases: [""],
  run: async (client, message, args) => { 
    
    let user = message.mentions.users.first() || message.author;
    const penisIndex = Math.random() * 20;
    const penis = "Ξ".repeat(penisIndex);
  
  if(user.bot) {
  const emb = new MessageEmbed().setColor(client.config.color)
    .setAuthor(user.username + ` \'s Penis`, user.displayAvatarURL())
    .setDescription(`***Bot not have penis XD***`)
    .setFooter(`Command run by ${message.author.tag}`)
  message.channel.send(emb);
  } else {
  const emb = new MessageEmbed().setColor(client.config.color)
    .setAuthor(user.username + ` \'s Penis`, user.displayAvatarURL())
    .setDescription(`Ѽ${penis}D`)
    .setFooter(`Command run by ${message.author.tag}`)
  message.channel.send(emb);
  }
}};