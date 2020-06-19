const Discord = require("discord.js");

//ban command

module.exports.run = async (bot, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.ban [@User] [reason]`")
    .setTimestamp();

  var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription("You need the `Ban Member` permission to use this command!")
    .setTimestamp();
  if (
    !message.member.hasPermission("BAN_MEMBERS") &&
    message.author.id !== "629937326545567744"
  )
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));

  let member = message.mentions.members.first();
  if (!member) return message.channel.send(xdemb).then(m => m.delete(5000));
  if (!member.bannable)
    return message.channel
      .send("I can't block this user!")
      .then(m => m.delete(5000));
  if (member.user.id === "629937326545567744")
    return message.channel
      .send("I can't ban my owner!")
      .then(m => m.delete(5000));

  if (member.id === message.author.id)
    return message.channel
      .send("You cannot block yourself")
      .then(m => m.delete(5000));

  let reason = args.slice(1).join(" ");
  if (!reason) {
    reason = "No reason given";
  } else {
    reason = `${reason}`;
  }
  message.guild.ban(member);
   let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Banned")
    .setDescription(`**Banned** ${message.mentions.users.first().tag} **Reason:** ${reason}`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1)
  // const bean = new Discord.RichEmbed()
  // .setAuthor('[Banned] ' + message.mentions.users.first().tag, message.mentions.users.first().avatarURL)
  // .setFooter(message.author.username, message.author.avatarURL)
  // .setColor("0xFF0000")
  // .addField("User", member, true)
  // .addField("Moderator", message.author, true)
  // .addField("Reason", reason)
  // .setTimestamp()
  // ch.send(bean)
  // message.delete();
};

module.exports.help = {
    name: "ban",
    description: "Banned user from server",
    category: "Moderator",
    usage: "`ban <@user> <reason>`"
}