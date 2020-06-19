const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.topic [text]`")
    .setTimestamp();
  if(!args[0]) return message.channel.send(xdemb).then(m => m.delete(5000))
  
   var missingPermissionsEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription("You need the `Manage Channel` permission to use this command!")
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_CHANNEL")) return message.channel.send(missingPermissionsEmbed);  
  
  message.channel.setTopic(args.join(" "))

  
  let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Topic Update")
    .setDescription(`Channel Topic Has Been Update`)
    .setColor("#ff2050")
    .setFooter(`Modearator ${message.author.username}`);
  message.channel.send(embed1).then(m => m.delete(15000))
  message.delete();
}

module.exports.help = {
    name: "Topic",
    description: "Set topic in channel",
    category: "Moderator",
    usage: "`topic <text>`"
}