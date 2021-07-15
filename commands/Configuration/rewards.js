const db = require("quick.db")
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "rewards",
  usage: `\`reward <level> <@roles>\``,
  detail: `**Information**
\`\`\`
- Set Rewards
{prefix}rewards <level> <@roles>
Ex: rewards 10 @level10+

- Delete Rewards
{prefix}rewards <level>
Note: Submit the same reward level in the database
\`\`\``,
  description: `Reward new role to members up level`,
  authorPermission: ["ADMINISTRATOR"],
  botPermission: ["MANAGE_ROLES"],
  category: "Configuration",
  aliases: ["reward", "rwd"],
  run: async(client, message, args) => {
    
    let toggle = await db.fetch(`level_${message.guild.id}.toggle`)
    
    let embed = new MessageEmbed()
     .setColor(client.config.color)
     .setAuthor('Leveling Settings', client.user.displayAvatarURL())
     .setDescription(`This Command has been disable by admins`)
     .setFooter(`To enable use: ${client.config.prefix}level-settings on`)
    if(toggle !== true) return message.channel.send(embed)

    let lvl = args[0]
    let roles = message.mentions.roles.first()

    let database = db.get(`rolerewards_${message.guild.id}.reward`)    
    
   if (!args[0]) {  
    
    let rewards = db.get(`rolerewards_${message.guild.id}.reward`)
    let roles;
    const embd = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`None rewards role has added`, message.guild.iconURL())
    .setDescription(`Read more \`${client.config.prefix}help ${module.exports.name}\``)
    if(rewards === null || rewards === undefined || rewards.length === 0) {
      return message.channel.send(embd)
    } else {
      roles = rewards.sort((a , b) => a.level -b.level).map(e => `\n${rewards.indexOf(e)+1}. Level **${e.level}** - ${message.guild.roles.cache.get(e.roles) ? message.guild.roles.cache.get(e.roles) : "DeletedRoles"}`).join(' ')
    }
     
    const emb = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`Rewards Role in ${message.guild.name}`,message.guild.iconURL())
    .setDescription(`${roles}`)
    .setFooter(`Read more ${client.config.prefix}help ${module.exports.name}`)
    
message.channel.send(emb) 
    } else {
     if(database && database.find(x => x.level === lvl.toLowerCase())) {
       let data = database.find(x => x.level === lvl)
       let value = database.indexOf(data)
       delete database[value]

       var filter = database.filter(x => {
         return x != null && x != ''
       })

        db.set(`rolerewards_${message.guild.id}.reward`, filter)
        let succes = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor('Rewards Deleted', client.user.displayAvatarURL())
        .setDescription(`Deleted **level ${lvl}** rewards!`)
        return message.channel.send(succes)
        } else if (isNaN(args[0])) {
         let wrong1 = new MessageEmbed().setColor(client.config.color) 
          .setAuthor('Rewards Settings', client.user.displayAvatarURL())
          .setDescription(`Invalid Arguments!`) 
          return message.channel.send(wrong1) 
        } else if (!roles) {
          let emb = new MessageEmbed().setColor(client.config.color)
          .setAuthor('Rewards Settings', client.user.displayAvatarURL())
          .setDescription('You need mention the valid roles!')
          message.channel.send(emb)
        } else  if(database && database.find(x => x.roles === roles.id)) {
         const emb = new MessageEmbed().setColor(client.config.color)
         .setAuthor('Rewards Already', client.user.displayAvatarURL())
         .setDescription(`the ${roles} already in rewards roles`)
        return message.channel.send(emb)
        } else {

        let embed = new MessageEmbed()
         .setColor(client.config.color)
         .setAuthor('Rewards Settings', client.user.displayAvatarURL())
         .setDescription(`the role **${roles.name}** is higher than the bot role`)
        if(!roles.editable) return message.channel.send(embed)
     
        let data = {
         level: lvl.toLowerCase(),
         roles: roles.id
        }

        db.push(`rolerewards_${message.guild.id}.reward`, data)
        let succes = new MessageEmbed()
         .setColor(client.config.color)
         .setAuthor('Rewards Settings', client.user.displayAvatarURL())
         .setDescription(`Added level \`${lvl}\` has rewards **${roles.name}**`)
        return message.channel.send(succes) 
      }
    }
  }
}