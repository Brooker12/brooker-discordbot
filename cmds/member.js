const Discord = require("discord.js");
const bot = new Discord.Client();
let moment = require("moment");

exports.run = (client, message, args) => {
  const role = message.guild.roles.size;
  const online = message.guild.members.filter(m => m.presence.status != "offline").size
  const idle =  message.guild.members.filter(m => m.presence.status === "idle").size 
  const dnd = message.guild.members.filter(m => m.presence.status === "dnd").size 
  const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor(0x00a2e8)
    .addField("Members",`${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}`,true)
    .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
    .addField("Game",  message.guild.members.filter(m => m.presence.game).size, true)
    .addField("Online", `${online}`, true)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL);
  message.channel.send({ embed });
};

module.exports.help = {
    name: "member",
    description: "member info server",
    category: "Information",
    usage: "`a.member`"
}