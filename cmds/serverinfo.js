const Discord = require("discord.js");
const moment = require('moment')

module.exports.run = async (bot, message, args) => {
  const verlvl = {
    0: "None",
    1: "Low",
    2: "Medium",
    3: "(╯°□°）╯︵ ┻━┻",
    4: "(ノಠ益ಠ)ノ彡┻━┻"
  }
    let emoji = message.guild.emojis;
    let emot = emoji.map((e) => e).join(' ')
    let inline = true
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setColor("#67b358")
    .setThumbnail(sicon)
    .setAuthor(message.guild.name)
    .addField("Emoji", `${message.guild.emojis.map(e => e).join("") || "None"}`)
    .addField("Created at", moment.utc(message.guild.createdAt).format('dddd, MMMM do, YYYY'))
    .addField("Name", message.guild.name, inline)
    .addField("ID", message.guild.id, inline)
    .addField("Owner", message.guild.owner, inline)
    .addField("Region", message.guild.region, inline)
    .addField("Verification Level", verlvl[message.guild.verificationLevel],inline)
    .addField("Members", `${message.guild.memberCount}`, inline)
    .addField("Bots", `${message.guild.members.filter(m=>m.user.bot).size}`, inline)
    .addField("Roles", message.guild.roles.size, inline)
    .addField("Channels", message.guild.channels.size, inline)
    .setTimestamp();
    message.channel.send(serverembed);
}

module.exports.help = {
    name: "Serverinfo",
    description: "Information Your Server",
    category: "Information",
    usage: "`a.serverinfo`"
}