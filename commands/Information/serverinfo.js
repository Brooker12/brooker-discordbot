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
  let roles = message.guild.roles.cache.filter(c => c.name !== '@everyone').map(c => c)
  let role = roles.length > 3 ?  `${roles.slice(0, 3).join(' ')} and ${roles.length - 3} more` : roles.join(' ')
  let emoji = message.guild.emojis.cache.map(b => b)
  let emojis = emoji.length > 6 ? `${emoji.slice(0, 6).join(' ')} and ${emoji.length - 6} more` : emoji
  let boost;
  if(message.guild.premiumSubscriptionCount === 0) boost = '-'
  else boost = `Level ${message.guild.premiumTier}/Boosts ${message.guild.premiumSubscriptionCount}`
  
  let category = guild.channels.cache.filter((c) => c.type === "category").size,
      text = guild.channels.cache.filter((c) => c.type === "text").size,
      voice = guild.channels.cache.filter((c) => c.type === "voice").size;
    
  let channel = guild.channels.cache.size, 
      news = message.guild.channels.cache.filter(a => a.type  === 'news').size;
  
  
  let serverembed = new Discord.MessageEmbed().setColor(client.config.color)
.setAuthor(guild.name, guild.iconURL()).setThumbnail(guild.banner ? guild.bannerURL() : guild.iconURL())
.addField(`Information`,`
• **Owners:** ${guild.owner.user.tag}
• **ID:** ${guild.id}
• **Region:** ${guild.region}
• **Verification:** ${lvl[guild.verificationLevel]}
• **Roles:** ${guild.roles.cache.size}
• **MemberCount:** ${guild.memberCount}
• **Boost:** ${boost}`)
.addField(`Channel [${channel}]`,
`<:text:832048400018178148> ${text} | <:voice:832048400119496724> ${voice} | <:categoria:832048400814833675> ${category} | <:anuncio:832048399855124490> ${news}`)
.addField(`Emoji [${guild.emojis.cache.size}]`, emojis)
.setFooter(`Server created at ${moment.utc(guild.createdAt).format('MM/DD/YY LT')}`)
message.channel.send(serverembed);
  }}