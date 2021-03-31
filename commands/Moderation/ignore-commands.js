const {MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "ignore-commands",
  description: "Ignore command to use in your server",
  category: "Moderation",
  usage: `\`ignorecmd <commandName>\``,
  detail: `**Information**
\`\`\`
- Toggle Settings
{prefix}ignorecmd <on || off>
  
- Set Command
{prefix}ignorecmd <#channel>

- Delete Command
{prefix}ignorecmd <#channel>
Note: Send command that is in the database
\`\`\``,
  authorPermission: ["MANAGE_GUILD"],
  aliases: ["igcmd", "ignorecmd"],
  run: async (client, message, args) => {  
    
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = client.config.prefix
    let ignore = db.get(`ignore_${message.guild.id}.command`)
    if(ignore === null || ignore === undefined) {
      ignore = 'None'
    } else {
      ignore = "\n- " + ignore.join("\n- ")
    }
    let ignoret = db.get(`ignore_${message.guild.id}.toggle`)
    if(ignoret === null || ignoret === undefined) ignoret = "off"
  
    let commandName = args[0]
    let prop =  client.commands
    
    if(!args[0]) {
    let embed = new MessageEmbed().setColor(client.config.color)
    .setAuthor('Ignores Settings', client.user.displayAvatarURL())
    .setDescription(`
\`\`\`
Ignores is [${ignoret.toUpperCase()}]
ignores list: ${ignore}
\`\`\``)   
    .setFooter(`Read more ${prefix}help ${module.exports.name}`)
      
    message.channel.send(embed)
    } else if (args[0] === "on") {
      db.set(`ignore_${message.guild.id}.toggle`, "on")
      let embed = new MessageEmbed()
       .setColor(client.config.color)
       .setAuthor('Ignore Command', client.user.displayAvatarURL())
       .setDescription(`ignorecmd has been set **[ON]**`)
    
      message.channel.send(embed)
      
    } else if (args[0] === "off") {
      db.set(`ignore_${message.guild.id}.toggle`, "off")
      let embed = new MessageEmbed()
       .setColor(client.config.color)
       .setAuthor('Ignore Command', client.user.displayAvatarURL())
       .setDescription(`ignorecmd has been set **[OFF]**`)
    
       message.channel.send(embed)
      
    } else {
      const command = prop.get(commandName) || prop.get(client.aliases.get(commandName));
      if(ignoret !== 'on') {
        let wrong = new MessageEmbed().setColor(client.config.color) 
        .setAuthor('Ignores Settings', client.user.displayAvatarURL())
        .setDescription(`Ignorecmd must be [ON] first `)
  
        message.channel.send(wrong)        
      } else if(!command) {
        let embed = new MessageEmbed().setColor(client.config.color) 
          .setAuthor('Ignore Command', client.user.displayAvatarURL()) 
          .setDescription(`That command doesn't exits`)
       return message.channel.send(embed) 
      }else if(ignore.includes(command.name)) {
         let database = db.get(`ignore_${message.guild.id}.command`)
         let data = database.find(x => x === command.name)
         let value = database.indexOf(data)
         delete database[value]

         var filter = database.filter(x => {
         return x != null && x != ''
         })
         db.set(`ignore_${message.guild.id}.command`, filter) 
         let embed = new MessageEmbed().setColor(client.config.color) 
          .setAuthor('Ignore Command', client.user.displayAvatarURL()) 
          .setDescription(`\`${command.name}\` command has been **enable**`)
          
         message.channel.send(embed)
    
      } else {
      
        db.push(`ignore_${message.guild.id}.command`, command.name)
         let embed = new MessageEmbed().setColor(client.config.color) 
          .setAuthor('Ignore Command', client.user.displayAvatarURL()) 
          .setDescription(`\`${command.name}\` command has been **disable**`)
          
         message.channel.send(embed)
      }
    } 
  }
}