const db = require("quick.db")
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "rewards",
  usage: `\`reward <level> <@roles>\``,
  detail: `**Information**
\`\`\`
- Toggle Rewards
{prefix}Rewards <on || off>

- Set Rewards
{prefix}rewards <level> <@roles>
Ex: rewards 10 @level10+

- Delete Rewards
{prefix}rewards <level>
Note: Send a rewards level that is in the database
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
    if(toggle !== "on") return message.channel.send(embed)

    let lvl = args[0]
    let roles = message.mentions.roles.first()

    let database = db.get(`rolerewards_${message.guild.id}.reward`)    
    
   if (!args[0]) {  
    
    let rewards = db.get(`rolerewards_${message.guild.id}.reward`)
    let roles;
    if(rewards === null || rewards === undefined) {
      roles = "[ None ]"
    } else {
    roles = rewards.map(e => `\nLevel ${e.level} - ${message.guild.roles.cache.get(e.roles) ? message.guild.roles.cache.get(e.roles).name : "DeletedRoles"}`).join(' ') || "[ None ]"
    }
     
    const emb = new MessageEmbed()
    .setAuthor('Rewards Settings', client.user.displayAvatarURL())
    .setColor(client.config.color)
    .setDescription(`Rewards List: \n${roles}`)
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
      } else {
        let wrong1 = new MessageEmbed().setColor(client.config.color) 
        .setAuthor('Rewards Settings', client.user.displayAvatarURL())
        .setDescription(`Invalid Arguments!`) 
       if(isNaN(args[0])) return message.channel.send(wrong1)
       let wrong = new MessageEmbed().setColor(client.config.color) 
        .setAuthor('Rewards Settings', client.user.displayAvatarURL())
        .setDescription(`Invalid Roles!`)
       if(!roles) return  message.channel.send(wrong)
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