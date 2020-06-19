const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  let replies = ["1", "2", "3", "4", "5", "6", "Null"];

  let result = Math.floor(Math.random() * replies.length);

  let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("RANDOM")
    .setDescription(
      `**Nomor Dadu Anda adalah...**
🎲 ` + replies[result]
    )
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp();
  message.channel.send(ballembed);
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Users"
};

exports.help = {
  name: "dice",
  description: "Roll the dice and get a number",
  category: "Fun",
  usage: "`a.dice`"
};
