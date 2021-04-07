const Discord = require("discord.js");
const moment = require("moment")

module.exports = {
  name: "userinfo",
  description: "Show users information of the user you mentioned",
  aliases: ["ui", "user"],
  usage: "`user / user <@user>`",
  category: "Information",
  cooldown: 2000,
  run: async (client, message, args) => {
    
  let inline = true;
  let resence = true;
  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible",
  };
    
  let plname = {
    PLAYING: "Playing ",
    WATCHING: "Watching ",
    COMPETING: "Competing in ",
    LISTENING: "Listening to ",
    CUSTOM_STATUS: "Custom Status: "
  }

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  let target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let role =  member.roles.cache.map(r => r)
  let roles = role.length > 3 ? `${role.slice(0, 3).join(', ')}...${role.length - 3} more` : role.join(', ')
  
  let playing = target.presence.activities[0] ? target.presence.activities[0].type : "NONE"
  let game = target.presence.activities[0] !== undefined ? target.presence.activities[0].name  : " "
  if(game === "Custom Status") game = target.presence.activities[0].state !== null ?  message.author.presence.activities[0].state.length > 30 ? `${message.author.presence.activities[0].state.slice(0, 30)}...` : message.author.presence.activities[0].state : "[Emoji Object]"
  
  let bot;
  if (member.user.bot === true) {
    bot = "Yes";
  } else {
    bot = "No";
  }

  let embed = new Discord.MessageEmbed().setColor(client.config.color)
    .setAuthor(member.user.tag, target.displayAvatarURL())
    .addField(`Information`, `
• **ID:** ${target.id}
• **Discriminator:** ${target.discriminator}
• **Username:** ${target.username}
• **Nickname:** ${member.nickname !== null ? `${member.nickname}` : "-"}
• **Bot:** ${bot}
• **Status:** ${status[member.user.presence.status]}
• **Activies:** ${plname[playing] || "-"}**${game || " "}**`)
.addField(`Roles [${member.roles.cache.size}]`, roles || "-")
  .setFooter(`Account created at ${moment.utc(message.guild.members.cache.get(member.id).user.createdAt).format('MM/DD/YY LT')} | Joined Server at ${moment.utc(member.joinedAt).format('MM/DD/YY LT')}`)
  message.channel.send(embed);
}};