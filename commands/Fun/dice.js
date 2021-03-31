const Discord = require("discord.js");

module.exports = {
  name: "dice",
  description: "Roll the dice and get a number",
  category: "Fun",
  usage: "`dice`",
  aliases: ["randomnumber"],
  run: async (client, message, args) => {   

  let replies = ["1", "2", "3", "4", "5", "6", "None"];

  let result = Math.floor(Math.random() * replies.length);

  let ballembed = new Discord.MessageEmbed().setColor('#2f3136')
    .setDescription(`**${message.author.username}** throws a dice and gets  🎲` + replies[result])
  message.channel.send(ballembed);
}};