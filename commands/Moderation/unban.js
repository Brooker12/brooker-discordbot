const {MessageEmbed} = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "unban",
  description: "Unbans a member from your server.",
  category: "Moderation",
  botPermission: ["BAN_MEMBERS"],
  authorPermission: ["BAN_MEMBERS"],
  usage: "`unban <user#tag> [reason]`",
  aliases: [""],
  run: async (client, message, args) => { 
  
     let User = args.slice(0).join(" ")
     let reason = args.slice(1).join(" ");
     if (!reason) {reason = "No reason given";
     } else {reason = `${reason}`;}
    
     let prefix = db.fetch(`prefix_${message.guild.id}`)
     if(prefix === null) prefix = client.config.prefix
  
    if(!args[0]) {
      let bannedUsers = await message.guild.fetchBans(true);
      let noOfPages = bannedUsers.size / 10;
      let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
      i = i - 1;
      message.guild.fetchBans().then(banned => {
      let list = banned.map(user => `**${i + 1}.** ${user.user.tag}`).join('\n');
      if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;
       let embed = new MessageEmbed().setColor(client.config.color)
        .setAuthor(`Banned list in ${message.guild.name}`, message.guild.iconURL())
        .setDescription(`${list || 'No one has banned in your server'}`)
        .setFooter(`To unban use: ${prefix}unban <user#tag>`)
       return message.channel.send(embed)
       })
      
    } else {
      message.guild.fetchBans()
      .then(bans => {
      const user = client.users.cache.find(user => user.tag === User)
      let xdembx = new MessageEmbed().setColor(client.config.color) 
       .setAuthor("Invalid Arguments!", message.author.displayAvatarURL())
       .setDescription(`i can't find that users`)
      if (!user) return message.channel.send(xdembx)
      
      message.guild.members.unban(user.id, reason);
  
      let embed1 = new MessageEmbed().setColor(client.config.color)
       .setTitle("Mod: Unbanned")
       .setDescription(`**Unbanned** ${user.tag} **Reason:** ${reason}`)    
       .setFooter(`Moderator: ${message.author.username}`);
      message.channel.send(embed1)
      })      
    }
  }
}