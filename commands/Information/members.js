const Discord = require("discord.js");

module.exports = {
  name: "members",
  aliases: ["mbs", "member"],
  category: "Information",
  description: "Show Discord Server Members!",
  usage: "Members",
  run: async (client, message, args) => {

    const Online = message.guild.members.cache.filter(Mem => Mem.presence.status === "online"), Offline = await message.guild.members.cache.filter(Mem => Mem.presence.status === "offline"), Idle = await message.guild.members.cache.filter(Mem => Mem.presence.status === "idle"), Dnd = await message.guild.members.cache.filter(Mem => Mem.presence.status === "dnd");
    const Bots = await message.guild.members.cache.filter(Mem => Mem.user.bot), 
          Humans = await message.guild.members.cache.filter(Mem => !Mem.user.bot), 
          Players = await message.guild.members.cache.filter(Mem => Mem.presence.activities && Mem.presence.activities[0] && Mem.presence.activities[0].type === "PLAYING"), 
          Websites = await message.guild.members.cache.filter(Mem => Mem.presence.clientStatus && Object.keys(Mem.presence.clientStatus).includes("web")), 
          Desktop = await message.guild.members.cache.filter(Mem => Mem.presence.clientStatus && Object.keys(Mem.presence.clientStatus).includes("desktop")), 
          Mobile = await message.guild.members.cache.filter(Mem => Mem.presence.clientStatus && Object.keys(Mem.presence.clientStatus).includes("mobile")),
          PercenH = await Math.round((message.guild.members.cache.filter(m => !m.user.bot).size / message.guild.memberCount) * 100),
          PercenB = await Math.round((message.guild.members.cache.filter(m => m.user.bot).size / message.guild.memberCount) * 100);
          

    const Embed = new Discord.MessageEmbed().setColor(client.config.color)
    .setAuthor(`${message.guild.name} Members`, message.guild.iconURL())
    .addField(`Information`,`
• **Total:**  ${message.guild.memberCount}
• **Human:**  ${Humans.size} (${PercenH}%)
• **Bots:**  ${Bots.size} (${PercenB}%)
• **Playing:** ${Players.size}
• **<:online:829206093124862002>:** ${Online.size} 
• **Idle:** ${Idle.size}
• **Do Not Distrub:** ${Dnd.size} 
• **Offline:** ${Offline.size}
• **Discord In Website:**  ${Websites.size} | **Desktop:**  ${Desktop.size} | **Mobile:**  ${Mobile.size}`)
    return message.channel.send(Embed);
  }
};