const db = require("quick.db")
const { MessageMenu, MessageMenuOption } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "ignore-channel",
  usage: `\`ignorech [ on || off || <#channel> ]\``,
  detail: `**Information**
\`\`\`
- Set Channel
{prefix}ignorech <#channel>

- Delete Channel
{prefix}ignorech <#channel>
Note: Mention a channel that is in the database
\`\`\``,
  description:`Ignore users to use bot command in the channel.`,
  authorPermission: ["MANAGE_GUILD"],
  category: "Configuration",
  aliases: ['igch', 'ignorech'],
  run: async(client, message, args) => { 
    
  let channel = message.mentions.channels.first();
    
  let ignores = await db.fetch(`ignorech_${message.guild.id}.channel`)
  if(ignores === null || ignores === undefined || ignores.length === 0) ignores = "None"
    
    if (!args[0]) {  
    
    let ch4 = [];
    if (ignores === 'None') {
       ch4 = "[ None ]"
    } else {
       ch4 = ignores.map(e => `${client.channels.cache.get(e) ? client.channels.cache.get(e) : "#DeletedChannel"}`).join(', ') || "None"
    }

      const emb = new MessageEmbed()
      .setAuthor('Channel that are ignore', client.user.displayAvatarURL()).setColor(client.config.color)
      .setDescription(`${ch4 || "[ Not set. ]"}`)
      .setFooter(`Read more ${client.config.prefix}help ${module.exports.name}`)
      
            
      let menus = new MessageMenu()
      .setID('ignore-channel') 
      .setMaxValues(3) 
      .setMinValues(1) 
      .setPlaceholder('List Channels');  

      let opsii =  message.guild.channels.cache.filter((c) => c.type === "text" && c.permissionsFor(message.guild.me).has('MANAGE_CHANNELS'))
      
      let kelebihan = false;
      if(opsii.size > 25) kelebihan = true;
      else {
       opsii.forEach(opsi => {
        let option = new MessageMenuOption()
         .setLabel(opsi.name.length > 25 ? opsi.name.slice(0, 25) : opsi.name)
        .setValue(opsi.id) 
        if(ignores && ignores.includes(opsi.id)) option.setDescription(`Channel has added, it'll be removed if you choose`)
        .setDefault()
        menus.addOption(option)
       })
      }
      
      let msg;
      if(kelebihan) message.channel.send(emb)
      else msg = await message.channel.send(emb, menus)
      
      client.on('clickMenu', async (menu) => {
        if(menu.message.id === msg.id) {
            if(menu.clicker.user.id === message.author.id) {
              let embed = new MessageEmbed().setColor(client.config.color)
              .setAuthor(`Ignore Channels`, client.user.displayAvatarURL())
              let chDeleted = [];
              let chAdded = [];
              menu.values.forEach(ch => {
                if(ignores.includes(ch)) {
                  let data = ignores.find(x => x === ch)
                  let value = ignores.indexOf(ch)
                  delete ignores[value]
                  
                  var filter = ignores.filter(x => {
                    return x != null && x != ''
                  })
                  db.set(`ignorech_${message.guild.id}.channel`, filter)
                  chDeleted.push(`<#${ch}>`)
                } else {
                  db.push(`ignorech_${message.guild.id}.channel`, ch)
                  chAdded.push(`<#${ch}>`)
                }
              })
              if (chAdded.length > 0) embed.addField(`Added`, chAdded.map(x => x).join(', '))
              if (chDeleted.length > 0) embed.addField(`Removed`, chDeleted.map(x => x).join(', '))
              menu.message.update({embed: embed, component: null})
            } else menu.reply.send("You're not allowed to use this menus.", true)
          }
      })
      
  } else {
     if(!channel) {
        let wrong = new MessageEmbed().setColor(client.config.color) 
        .setAuthor('Ignore Channel', client.user.displayAvatarURL())
        .setDescription(`Invalid Argument!`)
  
        message.channel.send(wrong)
      } else if(ignores.includes(channel.id)) {
         let database = db.get(`ignorech_${message.guild.id}.channel`)
         let data = database.find(x => x === channel.id)
         let value = database.indexOf(data)
         delete database[value]

         var filter = database.filter(x => {
         return x != null && x != ''
         })
         db.set(`ignorech_${message.guild.id}.channel`, filter) 
        
        let already = new MessageEmbed().setColor(client.config.color)
        .setAuthor('Ignore Channel', client.user.displayAvatarURL())
        .setDescription(`ignorech channel has been delete **${channel.name}**`)   
    
        message.channel.send(already)
      } else {
          db.push(`ignorech_${message.guild.id}.channel`, channel.id) 
          
          let embed = new MessageEmbed().setColor(client.config.color) 
          .setAuthor('Ignore Channel', client.user.displayAvatarURL()) 
          .setDescription(`**${channel.name}** channel has been add to Ignorech`)
          
          message.channel.send(embed)
      }
  }
}}