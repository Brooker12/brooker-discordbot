const Discord = require("discord.js");
const moment = require('moment')

module.exports = {
  name: "serverinfo",
  description: "Information Your Server",
  usage: "`server`",
  category: "Information",
  aliases: ["si", "server"],
  cooldown: 2000,
  run: async (client, message, args) => {
    
  let guild = message.guild
  let lvl = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    VERY_HIGH: "Very High",
  }
  let roles = message.guild.roles.cache.map(c => c)
  let role = roles.length > 3 ?  `${roles.slice(0, 3).join(' ')} and ${roles.length - 3} more` : roles.join(' ')
  let emoji = message.guild.emojis.cache.map(b => b)
  let emojis = emoji.length > 8 ? `${emoji.slice(0, 8).join(' ')} and ${emoji.length - 8} more` : emoji
  let boost;
  if(message.guild.premiumSubscriptionCount === 0) boost = '-'
  else boost = `Level ${message.guild.premiumTier}/Boosts ${message.guild.premiumSubscriptionCount}`
  
  
  let serverembed = new Discord.MessageEmbed().setColor(client.config.color)
.setAuthor(guild.name, guild.iconURL())
.addField(`Information`,`
\`\`\`
• Owners: ${guild.owner.user.tag}
• ID: ${guild.id}
• Region: ${guild.region}
• Verification: ${lvl[guild.verificationLevel]}
• Boost: ${boost}
\`\`\``)
.addField(`Channels [${guild.channels.cache.size}]`,`
\`\`\`
• Category: ${guild.channels.cache.filter((c) => c.type === "category").size}
• Text: ${guild.channels.cache.filter((c) => c.type === "text").size}
• Voice: ${guild.channels.cache.filter((c) => c.type === "voice").size}
\`\`\``)
.addField(`Members [${guild.memberCount}]`,`
\`\`\`
• Bots: ${guild.members.cache.filter(m => m.user.bot).size} (${ Math.round((message.guild.members.cache.filter(m => !m.user.bot).size / message.guild.memberCount) * 100);})
• Users: ${guild.members.cache.filter(m => !m.user.bot).size}
\`\`\``)
.addField(`Roles [${guild.roles.cache.size || " "}]`, role)
.addField(`Emoji [${guild.emojis.cache.size}]`, emojis)
.setFooter(`Server created at ${moment.utc(guild.createdAt).format('MM/DD/YY LT')}`)
message.channel.send(serverembed);
  }}