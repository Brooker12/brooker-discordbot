const { MessageEmbed } = require("discord.js");
const ms = require('ms')
const db = require("quick.db")

module.exports = {
  name: "commands",
  description: "Get list of all command and command detials",
  usage: "`commands`",
  category: "Information",
  aliases: ['command', 'cmds', 'cmd'],
  cooldown: 2000,
  run: async (client, message, args) => {
    
      
    
    if(args[0]) {
      let category = client.commands.filter(a => a.category.toLowerCase() === args[0].toLowerCase()).map(a => `\`${a.name}\` - **${a.description}**`).join("\n")
        
        let embed = new MessageEmbed().setColor(client.config.color)
        .setAuthor(`${category ? args[0].toUpperCase() : 'Unknown'} Category`, client.user.displayAvatarURL())
        .setDescription(`${category ? `${category}` : `Invalid category \`${args[0]}\``}`)
        .setFooter(`There are ${client.commands.filter(a => a.category.toLowerCase() === args[0].toLowerCase()).size} commands`)
        return message.channel.send(embed) 
    } else {
let emx = new MessageEmbed().setColor(client.config.color)
        .setAuthor("Brooker Command", client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setFooter(`Type: ${client.config.prefix}commands <category> to get description`)

      let com = {};
      let cmd = client.commands.filter(a => a.category !== 'Developer')
      for (let comm of cmd.array()) {    
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;
        
        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category} - [\`${value.length}\`]`, desc); //- [\`${value.length}\`]
      }

      let database = db.get(`cmd_${message.guild.id}`)

      if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push("`" + m.name + "`")
        })

        emx.addField("Custom Commands", array.join(", "))
      }
      return message.channel.send(emx);
    }
  }
}