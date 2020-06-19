const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  var missingPermissionsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `MANAGE_MESSAGES` permission to use this command!"
    )
    .setTimestamp();
  message.delete();
  if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    message.author.id !== "629937326545567744"
  )
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));
  var missingArgsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.embed [text]`")
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp();
  if (!args.join(" "))
    return message.channel.send(missingArgsEmbed).then(m => m.delete(5000));
  const text = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(args.join(" "))
    .setColor(message.member.displayHexColor)
    .setFooter("Embed")
    .setTimestamp();
  message.delete();
  message.channel.send(text);
};

module.exports.help = {
    name: "embed",
    description: "send embed message",
    category: "Moderator",
    usage: "`embed <text>`"
}