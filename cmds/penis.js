const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || message.author;
  const penis = [
    "8D",
    "8=D",
    "8====D",
    "8=====D",
    "8======D",
    "8========D",
    "8==========D",
    "8============D"
  ];

  let random = Math.floor(Math.random() * penis.length);
  if (user.id === '667743057227153408') {
  const emb = new Discord.RichEmbed()
    .setTitle(user.username + ` \'s Penis`)
    .setDescription(`***8======================D***`);
  message.channel.send(emb);
  } else if(user.bot) {
  const emb = new Discord.RichEmbed()
    .setTitle(user.username + ` \'s Penis`)
    .setDescription(`***Bot not have penis XD***`);
  message.channel.send(emb);
  } else  if (user.id === '629937326545567744') {
  const emb = new Discord.RichEmbed()
    .setTitle(user.username + ` \'s Penis`)
    .setDescription(`8∞D`);
  message.channel.send(emb)
  } else {
  const emb = new Discord.RichEmbed()
    .setTitle(user.username + ` \'s Penis`)
    .setDescription(penis[random]);
  message.channel.send(emb);
  }
};

module.exports.help = {
    name: "penis",
    description: "show penis random",
    category: "Fun",
    usage: "`penis <@user>`"
}