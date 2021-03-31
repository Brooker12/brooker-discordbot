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

    .setImage(message.guild.iconURL({dynamic: true, format: 'jpg', size: 2048}))
    .setColor(client.config.color)
    .setFooter("Searched by " + message.author.tag)
    .setDescription(`[${message.guild.name}](${message.guild.iconURL({dynamic: true, format: 'jpg', size: 2048})})`);

  message.channel.send(embed);

  msg.delete();
}};