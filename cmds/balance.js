const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args, utils) => {
  if (!message.content.startsWith("a.")) return;

 const user =
    message.mentions.members.first() ||
    message.guild.members.get(args[0]) ||
    message.member;
  let bal = db.fetch(`money_${message.guild.id}_${user.id}`);

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setTitle(`${user.user.username}'s Balance`)
    .addField(`Pocket`, bal)
    .addField(`Bank`, bank)
  message.channel.send(moneyEmbed);
};

module.exports.help = {
    name: "balance",
    description: "show your money",
    category: "Economy",
    usage: "`a.balance`"
}
