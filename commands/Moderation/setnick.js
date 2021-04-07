const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "setnick",
  description: "Change user nickname with mention",
  category: "Moderation",
  usage: "`setnick <@user> <NewNick>`",
  botPermission: ["MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: ["setnickname"],
  run: async (client, message, args) => { 

    
    let ctx = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("Mentions users first!")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send(ctx)
    
    let ctxm = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("Enter new nickname for users")
    let ctxw = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("Nickname must be 32 or fewer in length")
    let newnick = args.slice(1).join(' ')
    if(newnick.length > 32) return message.channel.send(ctxw)
    if(!newnick) return message.channel.send(ctxm)
    
    let ctxn = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("You can't change nickname this users")
    if(!user.manageable) return message.channel.send(ctxn)
    
    user.setNickname(newnick).then(() => {
      let embed = new MessageEmbed().setColor(client.config.color)
       .setTitle("Mod: Change Nickname")
       .setDescription(`Succesfully rename **${user.user.username}** with **${newnick}**`)
       .setFooter(`Moderator: ${message.author.username}`)
      message.channel.send(embed)
    })
  }
}