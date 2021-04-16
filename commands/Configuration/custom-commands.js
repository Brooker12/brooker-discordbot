const db = require("quick.db")
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "custom-commands",
  usage: `\`custom-commands <cmd_name> <cmd_responce>\``,
  detail: `**Information**
\`\`\`
- Delete Command
{prefix}custom-commands <cmd_name>
Note: Send command that is in the database
\`\`\``,
  cooldown: 1500,
  description: "Custom command to respon with prefix.",
  authorPermission: ["ADMINISTRATOR"],
  category: "Configuration",
  aliases: ["cc", "addcmd", "custom-command"],
  run: (client, message, args) => {

    let cmdname = args[0]
    let cmdresponce = args.slice(1).join(" ")
    let cmd = db.get(`cmd_${message.guild.id}`)
    if(cmd) {
     cmd = `\`${cmd.map(a => `${a.name}`).join('`, `')}\``
    } else {
     cmd = '[ None Commands ]'
    }
    let i = 0;
        
      let already = new MessageEmbed()
       .setColor(client.config.color)
       .setAuthor('Custom Commands in', client.user.displayAvatarURL())
       .setDescription("Invalid arguments")
    
    if(!args[0]) {
    let xdemb = new MessageEmbed().setColor(client.config.color) 
     .setAuthor('Custom Commands in '+message.guild.name, client.user.displayAvatarURL())
     .setDescription(`${cmd || '[ None Commands ]'}`)
     .setFooter(`Read more ${client.config.prefix}help ${module.exports.name}`)
    message.channel.send(xdemb)
    } else {
     let database = db.get(`cmd_${message.guild.id}`)
    
    if(database && database.find(x => x.name === cmdname.toLowerCase())) {
      let data = database.find(x => x.name === cmdname.toLowerCase())
      if(!data) return message.channel.send(already)

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      
        let succes = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor('AddCmd Settings', client.user.displayAvatarURL())
        .setDescription(`Deleted the **${cmdname}** Command!`)
        return message.channel.send(succes)
    } else {
      
      if(!cmdresponce) return message.channel.send(already)
      let data = {
        name: cmdname.toLowerCase(),
        responce: cmdresponce
      }

     db.push(`cmd_${message.guild.id}`, data)
    
     let succes = new MessageEmbed()
      .setColor(client.config.color)
      .setAuthor('AddCmd Settings', client.user.displayAvatarURL())
      .setDescription("Added **" + cmdname.toLowerCase() + "** as a custom command in guild.")
     return message.channel.send(succes)
    } 
    }
  }
}