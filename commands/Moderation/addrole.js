const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "addrole",
  description: "Adding users roles with mention roles",
  category: "Moderation",
  usage: "`addrole <@user> <@roles | roles_name>`",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  aliases: ["setnickname"],
  run: async (client, message, args) => {  
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(x => x.username.toLowerCase() === args[0].toLowerCase())
    let roles = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.get(a => a.name.toLowerCase() === args[0].toLowerCase())
    
    if(!user) return;
    if(!user.manageable) return;
    if(!roles) return;
    if(!roles.editable) return;
    
    user.roles.add(roles).then(() => {
      let embed = new MessageEmbed().setColor(client.config.color)
       .setTitle('Mod: Add Roles')
       .setDescription(`Succseffully added **${roles.name}** to **${user.user.username}**`)
       .setFooter(`Moderator: ${message.author.username}`)
      message.channel.send(embed)
    })    
  }
}