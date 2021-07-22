const Discord = require("discord.js");

module.exports = {
  name: 'avatar',
  description: "Grabs the profile picture of the user you mention.",
  category: "General",
  usage: "`avatar <@user>`",
  aliases: ["av", "pp", "profile"],
  cooldown: 2000,
  run: async (client, message, args) => { 
  let msg = await message.channel.send("Generating avatar...");

  let mentionedUser = message.mentions.members.first() || message.member 
  let png = mentionedUser.user.displayAvatarURL({dynamic: true, format: 'png', size: 2048})
  let jpg = mentionedUser.user.displayAvatarURL({dynamic: true, format: 'jpg', size: 2048})
  let webp = mentionedUser.user.displayAvatarURL({dynamic: true, size: 2048})

  let embed = new Discord.MessageEmbed()
  .setImage(mentionedUser.user.displayAvatarURL({dynamic: true, format: 'png', size: 2048}))
  .setColor(client.config.color)
  .setFooter("Searched by " + message.author.tag)
  .setDescription(`**${mentionedUser.displayName}** Avatar\n [PNG](${png}) | [JPG](${jpg}) | [WEBP](${webp})`);
  message.channel.send(embed);
  msg.delete();
}};  