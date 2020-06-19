const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  var p = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Messages` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.sendMessage(p).then(m => m.delete(5000));
  var q = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.unmute [@User]`")
    .setTimestamp();
  let toMute =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!toMute) return message.channel.sendMessage(q).then(m => m.delete(5000));

  let role = message.guild.roles.find(r => r.name === "muted");

  if (!role || !toMute.roles.has(role.id))
    return message.channel
      .sendMessage("This user is not muted! you can see: `a.mutelist`")
      .then(m => m.delete(5000));

  await toMute.removeRole(role);
  let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Unmuted")
    .setDescription(`**Succesfully unmuted ${message.mentions.users.first().tag}**`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
  // const embed = new Discord.RichEmbed()
  // .setAuthor('[UnMuted] ' + message.mentions.users.first().tag, message.mentions.users.first().avatarURL)
  // .setFooter(message.author.username, message.author.avatarURL)
  // .addField('User', message.mentions.users.first(), true)
  // .addField('Moderator:', message.author, true)
  // .addField(`Channel:`, `${message.channel}`)
  // .setColor("0xFF0000")
  // .setTimestamp()
  // ch.sendMessage(embed)
  // message.delete();
};


module.exports.help = {
    name: "Unmute",
    description: "Unmute someone muted",
    category: "Moderator",
    usage: "`unmute <@user>`"
}