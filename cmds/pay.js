const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('a.'))return;  

  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 | Sebutkan seseorang untuk membayar`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 | Tentukan jumlah yang harus dibayar`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 | Anda tidak dapat membayar uang negatif seseorang`);

  let embed6 = new Discord.RichEmbed()
 .setColor("#FFFFFF")
 .setDescription(`🚫 | Specify a Number`);
 
 if (isNaN(args[1])) {
 return message.channel.send(embed6);  
 }
  
  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 | Anda tidak punya uang sebanyak itu`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`✅ | Kamu membayar ${user.user} ${args[1]} koin`);

  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

}

module.exports.help = {
    name: "pay",
    description: "pay someone",
    category: "Economy",
    usage: "`pay <@user> <amount>`"
}