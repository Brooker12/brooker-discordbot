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

          let categories = ['Configuration', 'Fun', 'General', 'Information', 'Moderation']
          let menuoptions = [];

          for(let x of categories) {
              let data = { label: x, value: x, description: `${x} command(s)`, replymsg:"Just testing" }
              menuoptions.push(data)
          }
         
          let select = new MessageMenu()
          .setID('hey') 
          .setMaxValues(1) 
          .setMinValues(1) 
          .setPlaceholder('Command Category!');  
        
          menuoptions.forEach(opsi => {
            let option = new MessageMenuOption()
            .setLabel(opsi.label ? opsi.label : opsi.value)
            .setValue(opsi.value) 
            .setDescription(opsi.description)
            .setDefault()
            if(opsi.emoji) option.setEmoji(opsi.emoji)
            select.addOption(option)
          })
          
         let menumsg = await message.channel.send(emx, select)
        
          function menuselection(menu) {
            let cmdData = client.commands.filter(x => x.category === menu.values[0])
            
            emx.setAuthor(`${menu.values[0]} Commands`, client.user.displayAvatarURL())
            emx.setThumbnail(null)
            emx.setDescription(cmdData.map(a => `\`${a.name}\` - **${a.description}**`).join("\n"))
            emx.setFooter(`There are ${cmdData.size} command(s)`)
            emx.fields = [];
            
            menu.reply.send({embed: emx, ephemeral: true})
          }
        
          client.on('clickMenu', async (menu) => {
            if(menu.message.id === menumsg.id) {
              if(menu.clicker.user.id === message.author.id) menuselection(menu)
              else menu.reply.send("You're not allowed to use this menus.", true)
            }
         });
    }
  }
}