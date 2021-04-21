const {MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "ignore-commands",
  description: "Ignore command to use in your server",
  category: "Configuration",
  usage: `\`ignorecmd <commandName>\``,
  detail: `**Information**
\`\`\`
- Set Command
{prefix}ignorecmd <#channel>

- Delete Command
{prefix}ignorecmd <#channel>
Note: Send command that is in the database
\`\`\``,
  authorPermission: ["MANAGE_GUILD"],
  aliases: ["igcmd", "ignorecmd"],
  run: async (client, message, args) => {  
    
    let ignore = db.get(`ignore_${message.guild.id}.command`)
    if(ignore === null || ignore === undefined || ignore.length === 0) {
      ignore = '[ None ]'
    } else {
      ignore = "`" + ignore.join("`, `") + '`'
    }  
    let commandName = args[0]
    let prop =  client.commands
    
    if(!args[0]) {
    let embed = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`Commands that are disabled`, client.user.displayAvatarURL())
    .setDescription(`${ignore}`)   
    .setFooter(`Read more ${client.config.prefix}help ${module.exports.name}`)
      
    message.channel.send(embed)
    } else {
      const command = prop.get(commandName) || prop.get(client.aliases.get(commandName));
      if(!command) {
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