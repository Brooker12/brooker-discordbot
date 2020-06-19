const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Messages` permission to use this command!"
    )
    .setTimestamp();
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(missingPermissionsEmbed)
    const user = message.mentions.users.first() || message.author
    db.set(`warns_${user.id}`, null)
     let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Clearing warn")
    .setDescription(`**${user} Succesfuly clear warned **`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1)
    }

module.exports.help = {
    name: "clearwanr",
    description: "clear warn someone",
    category: "Moderator",
    usage: "`clearwarn <@user>`"
}