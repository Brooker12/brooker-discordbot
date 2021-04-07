const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "removerole",
  description: "Remove users roles with mention roles",
  category: "Moderation",
  usage: "`Removerole <@user> <@roles | roles_name>`",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  aliases: [],
  run: async (client, message, args) => {  
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0].toLowerCase()) || message.guild.members.cache.find(x => x.displayName.toLowerCase() === args[0].toLowerCase())
    let roles = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(a => a.name.toLowerCase() === args[1].toLowerCase())
    
    let ctx = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("Mentions users first!")
    if(!user) return message.channel.send(ctx)
    let ctxn = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("I can't add role to this users")
    if(!user.manageable) return message.channel.send(ctxn)
    
    let ctxa = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("Mentions the roles to be added")
    if(!roles || !args[1]) return message.channel.send(ctxa)
    let ctxb = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("This users not have that roles")
    if(!user.roles.cache.has(roles.id)) return message.channel.send(ctxb)
    let ctxz = new MessageEmbed().setColor(client.config.color)
     .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
     .setDescription("I can't acces that roles")
    if(!roles.editable) return message.channel.send(ctxz)
    
    user.roles.remove(roles).then(() => {
      let embed = new MessageEmbed().setColor(client.config.color)
       .setTitle('Mod: Remove Roles')
       .setDescription(`Succseffully remove **${roles.name}** to **${user.user.username}**`)
       .setFooter(`Moderator: ${message.author.username}`)
      message.channel.send(embed)
    })    
  }
}