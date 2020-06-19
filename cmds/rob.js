const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('a.'))return;  

let user = message.mentions.members.first()
let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)
let author = await db.fetch(`rob_${message.guild.id}_${message.author.id}`)
let author2 = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🚫 | You have been working recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
  } else {

let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(` You need atleast 200 coins in your wallet to rob someone`);

if (author2 < 200) {
    return message.channel.send(moneyEmbed)

}
let moneyEmbed2 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(` ${user.user.username} does not have anything you can rob`);
if (targetuser < 200) {
    return message.channel.send(moneyEmbed2)
}

const random = Math.floor(Math.random() * 200) + 1;

let embed = new Discord.RichEmbed()
.setDescription(` You robbed ${user} and got away with ${random} coins`)
.setColor("#FFFFFF")
message.channel.send(embed)

db.subtract(`money_${message.guild.id}_${user.id}`, random)
db.add(`money_${message.guild.id}_${message.author.id}`, random)
db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now())
  
};
}


module.exports.help = {
    name: "rob",
    description: "rob someone",
    category: "Economy",
    usage: "`rob <@user>`"
}
