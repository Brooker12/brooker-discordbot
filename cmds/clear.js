const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let ch = message.guild.channels.get("693128532598980688");
  message.delete();
  var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Messages` permission to use this command!"
    )
    .setTimestamp();
  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.clear [amount]`")
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));
  if (!args[0])
    return message.channel.send(xdemb).then(msg => msg.delete(5000));
  message.channel.bulkDelete(args[0]).then(() => {
    let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Clear")
    .setDescription(`**Sucesfully Cleared ${args[0]} message **`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(5000))
    // let bean = new Discord.RichEmbed()
    //     .setFooter(message.author.username, message.author.avatarURL)
    //     .setColor("#25c059")
    //     .setTitle(`Clear Message`)
    //     .addField("Moderator", `${message.author.username}`, true)
    //     .addField("Cleared", `${args[0]} messages`, true)
    //     .addField("Channel", `${message.channel}`)
    //     .setTimestamp()
    //     ch.send(bean)
  });
};

module.exports.help = {
    name: "clear",
    description: "clear message",
    category: "Moderator",
    usage: "`clear <amount>`"
}