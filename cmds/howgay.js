const Discord = require("discord.js")
 
module.exports.run = async (bot, message, args) => {
 let user= message.mentions.users.first() || message.author;
  const randomnumber = Math.floor(Math.random() * 101);
  const embed = new Discord.RichEmbed()
  .setTitle('Memindai Gay....')
  .setDescription(user +` is ${randomnumber}% gay! :gay_pride_flag:`)
  .setColor("#0x2471a3")
  .setFooter(message.author.username, message.author.avatarURL)
  .setTimestamp(); 
   message.channel.send(embed)
  
}
module.exports.help = {
    name: "howgay",
    description: "show gay percentage",
    category: "Fun",
    usage: "`howgay <@user>`"
}