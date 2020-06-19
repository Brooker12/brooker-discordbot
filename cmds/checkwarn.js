const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  const user = message.mentions.users.first() || message.author;
  let warns;
  const warn = await db.fetch(`warns_${user.id}`);
  if (warn == null) warns = 0;
  else warns = warn;
  var warnEmbed = new Discord.RichEmbed()
    .setTitle("Check Warns")
    .setDescription(`${user.username} has ${warns} warns`)
    .setColor("#67b358");
  message.channel.send(warnEmbed);
};

module.exports.help = {
    name: "checkwarn",
    description: "check warn someone",
    category: "Information",
    usage: "chechwarn <@user>"
}