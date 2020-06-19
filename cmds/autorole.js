const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = (client, message, args) => {
  var p = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Administator` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(p);
  
  let channel = message.mentions.roles.first()
  
  if (args[0] === 'off') {
  db.set(`roles_${message.guild.id}`, 'off')
  message.channel.send('autorole has been off')
  }return;
  
  if (!channel) return message.channel.send("Can't find the role")
  

  db.set(`roles_${message.guild.id}`, channel.id);
  let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: AutoRole")
    .setDescription(`**Autorole** hass been seted **${channel}**`)
    .setColor("#ff2050")
    .setFooter(`Modearator ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete(10000));
};

module.exports.help = {
  name: "autorole",
  description: "set role when member joined",
  category: "Moderator",
  usage: "`autorole <@roles>`"
};
 