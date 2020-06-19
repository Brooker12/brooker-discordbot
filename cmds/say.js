const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const p = args.join(" ");
  message.channel.send(p);
  var o = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.say [text]`")
    .setTimestamp();
  message.delete();
  if (!p) return message.channel.send(o).then(m => m.delete(5000));
};
module.exports.help = {
    name: "say",
    description: "reply say to bot",
    category: "Fun",
    usage: "`say <text>`"
}