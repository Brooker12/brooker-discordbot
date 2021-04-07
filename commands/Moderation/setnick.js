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
    let newnick = args.slice(1).join(' ')
    if(!newnick) return message.channel.send(ctxm)
    
    if(user.editable)
    
    user.setNickname(newnick).then(() => {
      let embed = new MessageEmbed().setColor(client.config.color)
       .setTitle("Mod: Change Nickname")
       .setDescription(`Succesfully change ${user.user.username} with ${newnick}`)
       .setFooter(`Moderator: ${message.author.username}`)
      message.channel.send(embed)
    })
  }
}