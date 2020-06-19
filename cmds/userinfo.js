const Discord = require("discord.js");
const moment = require("moment")


module.exports.run = async (bot, message, args) => {
  let inline = true;
  let resence = true;
  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

  const member =
    message.mentions.members.first() ||
    message.guild.members.get(args[0]) ||
    message.member;
  let target = message.mentions.users.first() || message.author;

  if (member.user.bot === true) {
    bot = "Yes";
  } else {
    bot = "None";
  }

  let embed = new Discord.RichEmbed()
    //.setAuthor(member.user.username)
    .setThumbnail(target.displayAvatarURL)
    .setColor("#67b358")
    .addField("Joined Server At", moment.utc(message.guild.members.get(member.id).user.joinedAt).format("dddd, MMMM Do, YYYY"))
    .addField("Joined Discord At", moment.utc(message.guild.members.get(member.id).user.createdAt).format("dddd, MMMM Do, YYYY"))
    .addField("Full Username", `${member.user.tag}`, inline)
    .addField("ID", member.user.id, inline)
    .addField(
      "Nickname",
      `${member.nickname !== null ? `${member.nickname}` : "None"}`,
      true
    )
    .addField("Bot", `${bot}`, inline, true)
    .addField("Status", `${status[member.user.presence.status]}`, inline, true)
    .addField(
      "Playing",
      `${
        member.user.presence.game
          ? `${member.user.presence.game.name}`
          : "None"
      }`,
      inline,
      true
    )
    .addField(
      "Roles",
      `${member.roles
        .filter(r => r.id !== message.guild.id)
        .map(roles => `\`${roles.name}\``)
        .join(" **|** ") || "None"}`,
      true
    )
    .setFooter(`Information about ${member.user.username}`)
    .setTimestamp();

  message.channel.send(embed);
};


module.exports.help = {
    name: "userinfo",
    description: "show user information",
    category: "Information",
    usage: "`userinfo <@user>`"
}