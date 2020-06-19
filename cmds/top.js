const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

  const top = new Discord.RichEmbed()
    .setTitle('List TOP Economy Brooker')
    .setAuthor(message.guild.iconURL, message.guild.owner)
    .setColor('#0ed3a0')
    .setDescription(`**Top global**
**Top coins**
**Top cars**
**Top mansion**`)
    .setFooter(`Type: a.top <list> to get information | example: a.top coins`)
    .setTimestamp();
   if(!args[0]) return message.channel.send(top)
  
  
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
  } 
  
}
 


module.exports.help = {
    name: "",
    description: "",
    category: "",
    usage: "`a.`"
}