const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");

  var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Kick Members` permission to use this command!"
    )
    .setTimestamp();
  if (
    !message.member.hasPermission("KICK_MEMBERS") &&
    message.author.id !== "629937326545567744"
  )
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));

  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.kick [@User] [reason]`")
    .setTimestamp();
  let member = message.mentions.members.first();
  if (!member) return message.channel.send(xdemb).then(m => m.delete(5000));

  if (!member.kickable)
    return message.channel
      .send("I cannot kick this user!")
      .then(m => m.delete(5000));
  if (member.user.id === "629937326545567744")
    return message.channel
      .send("I can't kick my owner!")
      .then(m => m.delete(5000));

  let reason = args.slice(1).join(" ");
  if (!reason) {
    reason = "No reason given";
  } else {
    reason = `${reason}`;
  }
   member.kick(reason);
   let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Kick")
    .setDescription(`**Kicked** ${message.mentions.users.first().tag} **Reason:**${reason}`)
    .setColor("#ff2050")
    .setFooter(`Kicked by ${message.author.username}`);
   message.channel.send(embed1)
    .catch(error =>
      message.reply(`Sorry, I couldn't kick because of : ${error}`)
    );
  //   let kick = new Discord.RichEmbed()
  //   .setAuthor('[Kick] ' + message.mentions.users.first().tag, message.mentions.users.first().avatarURL)
  //   .setFooter(message.author.username, message.author.avatarURL)
  //   .setColor("0xFF0000")
  //   .addField("User", member, true)
  //   .addField("Moderator", message.author, true)
  //   .addField("Reason", reason)
  //   .setTimestamp()
  //   ch.send(kick);
  message.delete();
};
module.exports.help = {
    name: "kick",
    description: "kick someone from server",
    category: "Moderator",
    usage: "`kick <@user> <reason>`"
}