const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
const cpuStat = require("cpu-stat");

module.exports = {
  name: "stats",
  description: "Show bot information and statistic",
  category: "Information",
  usage: "`stats`",
  aliases: ["st", "botinfo"],
  cooldown: 2000,
  run: async (client, message, args) => { 
      let { version } = require("discord.js");

  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let mins = Math.floor(totalSeconds / 60);
let secs = Math.floor(totalSeconds % 60);

    let embedStats = new Discord.MessageEmbed().setColor(client.config.color)
    .setAuthor('Brooker Stats', client.user.displayAvatarURL(), 'https://brooker.cf/about')
    .setThumbnail(client.user.displayAvatarURL())
    .addField('General', `
• **Users:** ${client.users.cache.size}
• **Guilds:** ${client.guilds.cache.size}
• **Channels:** ${client.channels.cache.size}
• **Commands:** ${client.commands.filter(a => a.category !== 'Developer').size}`)
    .addField('System',`
• **Discord.js:** v${version}
• **Node:** ${process.version}
• **Arch:** ${os.arch()}
• **Platform:** ${os.platform()}
• **Mem Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
• **Uptime:** ${days}d ${hours}h ${mins}m ${secs}s`)  
   .setFooter(`Brooker Created at ${moment.utc(client.user.createdAt).format('MM/DD/YY LT')  }`)
 message.channel.send(embedStats);
    
})}}