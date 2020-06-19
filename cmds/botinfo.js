const Discord = require("discord.js");
const { get } = require("request-promise-native");
const moment = require('moment')

module.exports.run = async (bot, message, args) => {
  let inline = true;
  let bicon = bot.user.displayAvatarURL;
  let usersize = bot.users.size;
  let chansize = bot.channels.size;
  let uptimxd = bot.uptime;
  let servsize = bot.guilds.size;
  
  
  if(args[0] === 'check') {
     var options = {
        url: 'https://app.statuscake.com/Slack/hidayat0249gmailcom/r34Z0x8huM6CCkBLh3SU/',
        json: true
      }
     let oembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Fetching data from the internet for the best output')
    message.channel.send(oembed).then(msg => {
      get(options).then(body => {
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Bot Status Check`)
        .setDescription(body.text)
        .setTimestamp()
        msg.edit(embed)
      })
    }) 
     
     } else {  let botembed = new Discord.RichEmbed()
    .setColor("#67b358")
    .setThumbnail(bicon)
    .setTitle('●▬▬● BOOKER BOT ●▬▬●')
    .addField("Bot Owner", "<@629937326545567744>", inline)
    .addField("Servers", `${servsize}`, inline)
    .addField("Channels",  `${chansize}`, inline)
    .addField("Users", `${usersize}`, inline)
    .addField("Created On", moment.utc(bot.user.createdAt).format('dddd, MMMM do, YYYY'))
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp();

    message.channel.send(botembed);
 }
};

module.exports.help = {
    name: "botinfo",
    description: "show bot info",
    category: "Information",
    usage: "`a.botinfo`"
}
