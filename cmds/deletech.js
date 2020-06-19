const Discord = require("discord.js");

exports.run = async (client, message, args, guild, bot) => {
  let ch = message.guild.channels.get("693128532598980688");
  var missingPermissionsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `MANAGE_MESSAGES` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));
  var q = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.deletech [channel/voice name]`")
    .setTimestamp();

  if (!args[0]) return message.channel.send(q).then(m => m.delete(5000));
  const fetchedChannel = message.guild.channels.find(r => r.name === args.join(" "))
  if(!fetchedChannel) return message.channel.send(`Cannot Find the channel name`)
 fetchedChannel.delete('delete!')
   let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Delete Channel")
    .setDescription(`**Succesfully Delete channel ${args[0]}**`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
  // var warningEmbed = new Discord.RichEmbed()
  //       .setFooter(message.author.username, message.author.avatarURL)
  //       .setColor("#25c059")
  //       .setTitle(`Remove Channel`)
  //       .addField('Moderator', message.author, true)
  //       .addField('Channel', fetchedChannel.name)
  //       .setTimestamp();
  // ch.send(warningEmbed)

  }
                                                                                           
module.exports.help = {
    name: "deletech",
    description: "delete channel in server",
    category: "Moderator",
    usage: "`deletech <channel name>`"
}