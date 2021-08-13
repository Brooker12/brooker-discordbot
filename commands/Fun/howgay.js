const {MessageEmbed} = require("discord.js")
 
module.exports = {
  name: "howgay",
  category: "Fun",
  description: "How many gay presentace",
  usage: "`howgay / howgay <@user>`",
  aliases: ["gay"],
  run: async (client, message, args) => {
 
  let user = message.mentions.users.first() || message.author;
  const randomnumber = Math.floor(Math.random() * 101);

  if(user.bot) {
  const emb = new MessageEmbed().setColor('#2f3136')
    .setAuthor(`${user.username}`+'\'s Gay rate', user.displayAvatarURL())
    .setDescription(`***Bot not have lust XD***`)
    .setFooter(`Command run by ${message.author.tag}`)
 message.channel.send(emb);
  } else {
   const embed = new MessageEmbed().setColor('#2f3136')
  .setAuthor(`${user.username}`+'\'s Gay rate', user.displayAvatarURL())
  .setDescription(`${user} is ${randomnumber}% gay! 🏳️‍🌈`)
  .setFooter(`Command run by ${message.author.tag}`)
  message.channel.send(embed)
  } 
}}