const Discord = require("discord.js");

module.exports = {
  name: 'guildicon',
  description: "Show guild icon in your server",
  category: "General",
  usage: "`guildicon`",
  aliases: ["gi", "gui"],
  cooldown: 2000,
  run: async (client, message, args) => { 
  let msg = await message.channel.send("Generating avatar...");

  let embed = new Discord.MessageEmbed()

    .setImage(message.guild.iconURL() ? message.guild.iconURL({dynamic: true, format: 'jpg', size: 2048}) 
              : 'https://media.discordapp.net/attachments/804199427002073128/827033053003251752/unknown.png?width=543&height=480')
    .setColor(client.config.color)
    .setFooter("Searched by " + message.author.tag)
    .setDescription(`[${message.guild.name}](${message.guild.iconURL({dynamic: true, format: 'jpg', size: 2048})})`);

  message.channel.send(embed);

  msg.delete();
}};