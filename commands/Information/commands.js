const { MessageMenuOption, MessageMenu } = require('discord-buttons');
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

          let option = new MessageMenuOption()
          .setLabel('Moderation')
          .setValue('moderator') 
          .setDescription('Moderation Commands')
          .setDefault() 

          let option2 = new MessageMenuOption()
          .setLabel('Configuration')
          .setValue('config') 
          .setDescription('Configuration Commands')
          .setDefault() 
          
          let option3 = new MessageMenuOption()
          .setLabel('Fun')
          .setValue('fun') 
          .setDescription('Fun Commands')
          .setDefault() 

          let option4 = new MessageMenuOption()
          .setLabel('General')
          .setValue('general') 
          .setDescription('General Commands')
          .setDefault() 

          let option5 = new MessageMenuOption()
          .setLabel('Information')
          .setValue('ingfo') 
          .setDescription('Information Commands')
          .setDefault() 
          
          let select = new MessageMenu()
          .setID('hey') 
          .addOption(option) 
          .addOption(option2)
          .addOption(option3)
          .addOption(option4)
          .addOption(option5)
          .setMaxValues(1) 
          .setMinValues(1) 
          .setPlaceholder('Command Category!');  
          
          await message.channel.send(emx, select);
      
          client.on('clickMenu', async (menu) => {
           if (menu.values[0] === 'moderator') {
            let category = client.commands.filter(a => a.category === 'Moderation')
            emx.setAuthor(`Moderation Commands`, client.user.displayAvatarURL())
            emx.setThumbnail(null)
            emx.setDescription(category.map(a => `\`${a.name}\` - **${a.description}**`).join("\n"))
            emx.setFooter(`There are ${category.size} command(s)`)
            emx.fields = [];
            menu.message.update(emx);
           } else if (menu.values[0] === 'config') {
            let category = client.commands.filter(a => a.category === 'Configuration')
            emx.setAuthor(`Configuration Commands`, client.user.displayAvatarURL())
            emx.setThumbnail(null)
            emx.setDescription(category.map(a => `\`${a.name}\` - **${a.description}**`).join("\n"))
            emx.setFooter(`There are ${category.size} command(s)`)
            emx.fields = [];
            menu.message.update(emx);
           } else if (menu.values[0] === 'fun') {
            let category = client.commands.filter(a => a.category === 'Fun')
            emx.setAuthor(`Fun Commands`, client.user.displayAvatarURL())
            emx.setThumbnail(null)
            emx.setDescription(category.map(a => `\`${a.name}\` - **${a.description}**`).join("\n"))
            emx.setFooter(`There are ${category.size} command(s)`)
            emx.fields = [];
            menu.message.update(emx);
           } else if (menu.values[0] === 'general') {
            let category = client.commands.filter(a => a.category === 'General')
            emx.setAuthor(`General Commands`, client.user.displayAvatarURL())
            emx.setThumbnail(null)
            emx.setDescription(category.map(a => `\`${a.name}\` - **${a.description}**`).join("\n"))
            emx.setFooter(`There are ${category.size} command(s)`)
            emx.fields = [];
            menu.message.update(emx);
           } else if (menu.values[0] === 'ingfo') {
            let category = client.commands.filter(a => a.category === 'Information')
            emx.setAuthor(`Information Commands`, client.user.displayAvatarURL())
            emx.setThumbnail(null)
            emx.setDescription(category.map(a => `\`${a.name}\` - **${a.description}**`).join("\n"))
            emx.setFooter(`There are ${category.size} command(s)`)
            emx.fields = [];
            menu.message.update(emx);
           }
         });
    }
  }
}