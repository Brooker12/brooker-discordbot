  
const db = require('quick.db')
const discord = require('discord.js')
const canvacord = require("canvacord");
const { getInfo } = require("../../utils/xp.js")

module.exports = {
  name: "rank",
  description: "Returns the current rank of a member.",
  usage: "`rank <user>`",
  category: "Information",
  aliases: ["rk", "rank"],
  run: async (client, message, args) => {
    
    let toggle = await db.fetch(`level_${message.guild.id}.toggle`)
    
      let embed = new discord.MessageEmbed()
     .setColor(client.config.color)
     .setAuthor('Leveling Settings', client.user.displayAvatarURL())
     .setDescription(`This Command has been disable by admins`)
     .setFooter(`To enable use: ${client.config.prefix}level-settings on`)
    if(toggle !== true) return message.channel.send(embed)
    
    
    const user = message.mentions.users.first() || message.author;

    if (user.bot) {
      return message.channel.send("Bot do not have levels")
    }
    
    let msg = message.channel.send('Loading...')
    
    let xp = db.get(`xp_${message.guild.id}_${user.id}`) || 0;

    const { level, remxp, levelxp } = getInfo(xp);
    let img = user.displayAvatarURL({dynamic: true, format: 'jpg'})
    
    let every = await db.all()
    every = every.filter(i => i.ID.startsWith(`xp_${message.guild.id}_`)).sort((a, b) => b.data - a.data);
    let ranking = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${user.id}`) + 1;
    
     const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(remxp)
    .setRequiredXP(levelxp)
    .setLevel(level)
    .setRank(ranking)
    .setStatus(user.presence.status)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(user.username)
    .setDiscriminator(user.discriminator);
 
rank.build()
    .then(async data => {
        const attachment = new discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
        (await msg).delete()
    });
  }
}