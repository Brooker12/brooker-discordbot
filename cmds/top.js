const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  
  if(args[0] === 'cars') {
    let money = db.all().filter(data => data.ID.startsWith(`car_${message.guild.id}`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1}. <@${money[i].ID.split('_')[2]}>** - ${money[i].data} \n`;
    }
    const embed = new Discord.RichEmbed() /*MessageEmbed*/
    .setAuthor(`Top Car in ${message.guild.name}!`, message.guild.iconURL)
    .setColor(message.member.displayHexColor)
    .setDescription(finalLb)
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp()
    message.channel.send(embed);
  } else if(args[0] === 'mansion') {
    let money = db.all().filter(data => data.ID.startsWith(`house_${message.guild.id}`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1}. <@${money[i].ID.split('_')[2]}>** - ${money[i].data} \n`;
    }
    const embed = new Discord.RichEmbed() /*MessageEmbed*/
    .setAuthor(`Top Mansion in ${message.guild.name}!`, message.guild.iconURL)
    .setColor(message.member.displayHexColor)
    .setDescription(finalLb || 'no have mansion in this guild')
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp()
    message.channel.send(embed);
  } else if (args[0] === 'coins'){
    let money = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1}. <@${money[i].ID.split('_')[2]}>** - ${money[i].data} coins\n`;
    }
    const embed = new Discord.RichEmbed() /*MessageEmbed*/
    .setAuthor(`Top Money in ${message.guild.name}!`, message.guild.iconURL)
    .setColor(message.member.displayHexColor)
    .setDescription(finalLb)
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp()
    message.channel.send(embed);
  } else if (args[0] === 'global'){
    let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1}. <@${money[i].ID.split('_')[2]}>** - ${money[i].data} coins\n`;
    }
    const embed = new Discord.RichEmbed() /*MessageEmbed*/
    .setAuthor(`Top Global`)
    .setColor(message.member.displayHexColor)
    .setDescription(finalLb)
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp()
    message.channel.send(embed);
  } else {
    const embed = new Discord.RichEmbed() /*MessageEmbed*/
    .setAuthor(client.user.displayAvatarURL,`List Top Economy Brooker`)
    .setColor(message.member.displayHexColor)
    .setDescription(`**Top Global**
**Top Coins**
**Top Cars**
**Top Mansion**`)
    .setFooter(`a.top <list> | example a.top cars`)
    .setTimestamp()
    message.channel.send(embed)
  } 
  
}
 


module.exports.help = {
    name: "",
    description: "",
    category: "",
    usage: "`a.`"
}