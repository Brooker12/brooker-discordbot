const db = require("quick.db")
const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require('discord-buttons')
const Discord = require('discord.js')

module.exports = {
  name: "level-settings",
  usage: `\`leveling [ on || off || <#channel> ]\``,
  detail: `**Information**
\`\`\`
- Set Channel
{prefix}leveling <#channel>

- Toggle Leveling
{prefix}leveling <on || off>

- Delete Channel
{prefix}leveling <#channel>
Note: Mention a channel that is in the database
\`\`\``,
  description: `Settings for the leveling system`,
  authorPermission: ["MANAGE_GUILD"],
  category: "Configuration",
  aliases: ["leveling", "xp-settings"],
  run: async(client, message, args) => { 
    
  let channel = message.mentions.channels.first(); 
  
  let lvlch = await db.fetch(`level_${message.guild.id}.channel`)
  let toggle = await db.fetch(`level_${message.guild.id}.toggle`)
    
   if (!args[0]) {  
    
    let lvlch = await db.fetch(`level_${message.guild.id}.channel`)
    let ch3 = client.channels.cache.get(lvlch)
    if (ch3 === null) ch3 = "[ Not set ]"
    if (ch3 === undefined) ch3 = "[ Not set ]"
     
    const emb = new Discord.MessageEmbed()
    .setAuthor('Level Settings', client.user.displayAvatarURL()).setColor(client.config.color)
    .addField(`Leveling toggle is`,`[${toggle ? 'ON' : 'OFF'}]`)
    .addField(`Leveling log set in`,`${ch3 || "[ Auto: message channel ]"}`)
    .setFooter(`Read more ${client.config.prefix}help ${module.exports.name}`)
    
    let lvlON = new MessageButton()
    .setLabel('ON')
    .setID('leveling-on')
    .setStyle('green')

    let lvlONdisable = new MessageButton()
    .setLabel('ON')
    .setID('leveling-on-disable')
    .setStyle('green')
    .setDisabled(true)
    
    let lvlOFF = new MessageButton()
    .setLabel('OFF')
    .setID('leveling-off')
    .setStyle('red')

    let lvlOFFdisable = new MessageButton()
    .setLabel('OFF')
    .setID('leveling-off-disable')
    .setStyle('red')
    .setDisabled(true)
    
      let menus = new MessageMenu()
      .setID('level-settings') 
      .setMaxValues(1) 
      .setMinValues(1) 
      .setPlaceholder('List Channels');  

      let opsii =  message.guild.channels.cache.filter((c) => c.type === "text" && c.permissionsFor(message.guild.me).has('MANAGE_CHANNELS'))
      opsii.forEach(opsi => {
        let option = new MessageMenuOption()
        .setLabel(opsi.name)
        .setValue(opsi.id) 
        .setDefault()
        menus.addOption(option)
      })
    
    let lvlRow = new MessageActionRow()
    .addComponent([lvlON, lvlOFF])
    
    let lvlRowON = new MessageActionRow()
    .addComponent([lvlON, lvlOFFdisable])
    
    let lvlRowOFF = new MessageActionRow()
    .addComponent([lvlONdisable, lvlOFF])
    
    let menuRow = new MessageActionRow()
    .addComponent(menus)
    
    let lvls;
  
    if(toggle === true) { lvls = lvlRowOFF } else { lvls = lvlRowON }
    
     message.channel.send({embed: emb, components: [menuRow, lvls]})
    
    client.on('clickButton', async (button) => {
      if (button.clicker.member.id === message.author.id) { 
        if(button.id === 'leveling-on') {
          db.set(`level_${message.guild.id}.toggle`, true)
          let embed = new Discord.MessageEmbed()
           .setColor(client.config.color)
           .setAuthor('Level Toggle', client.user.displayAvatarURL())
           .setDescription(`level has been set [ON]`)
          await button.message.update({embed: embed, components: [menuRow, lvlRowOFF]})
        } else if (button.id === 'leveling-off') {
          db.set(`level_${message.guild.id}.toggle`, null)
          let embed = new Discord.MessageEmbed()
           .setColor(client.config.color)
           .setAuthor('Level Toggle', client.user.displayAvatarURL())
           .setDescription(`level has been set [OFF]`)
          await button.message.update({embed: embed, components: [menuRow, lvlRowON]})
        }
      } else return button.reply.send("You're not allowed to use this menus.", true) 
    }) 
    client.on('clickMenu', async (menu) => {
        if(menu.clicker.user.id === message.author.id) {
          if(lvlch === menu.values[0]) {
             db.delete(`level_${message.guild.id}.channel`) 
        
            let already = new Discord.MessageEmbed().setColor(client.config.color)
             .setAuthor('Level Channel', client.user.displayAvatarURL())
             .setDescription(`Level channel has changed to message channel`)   
            menu.message.update({embed: already, components: [menuRow, lvls]})
          } else {
             db.set(`level_${message.guild.id}.channel`, menu.values[0]) 
          
            let embed = new Discord.MessageEmbed().setColor(client.config.color) 
            .setAuthor('Level Channel', client.user.displayAvatarURL()) 
            .setDescription(`level channel has been set in **<#${menu.values[0]}>**`)
            menu.message.update({embed: embed, components: [menuRow, lvls]})
          }          
        } else return menu.reply.send("You're not allowed to use this menus.", true) 
    })
    
  } else if (args[0] === "on") {
    db.set(`level_${message.guild.id}.toggle`, true)
    let embed = new Discord.MessageEmbed()
    .setColor(client.config.color)
    .setAuthor('Level Toggle', client.user.displayAvatarURL())
    .setDescription(`level has been set [ON]`)
    
    message.channel.send(embed)
    
    
  } else if (args[0] === "off") {
    db.set(`level_${message.guild.id}.toggle`, null)
    let embed = new Discord.MessageEmbed()
    .setColor(client.config.color)
    .setAuthor('Level Toggle', client.user.displayAvatarURL())
    .setDescription(`level has been set [OFF]`)
    
    message.channel.send(embed)
    
    
  } else {
      if(toggle !== true) {
        let wrong = new Discord.MessageEmbed().setColor(client.config.color) 
        .setAuthor('Level Settings', client.user.displayAvatarURL())
        .setDescription(`Leveling must be [ON] first `)
  
        message.channel.send(wrong)        
      } else if(!channel) {
        let wrong = new Discord.MessageEmbed().setColor(client.config.color) 
        .setAuthor('Level Settings', client.user.displayAvatarURL())
        .setDescription(`Invalid Argument!`)
  
        message.channel.send(wrong)
      } else if(lvlch === channel.id) {
         db.delete(`level_${message.guild.id}.channel`) 
        
        let already = new Discord.MessageEmbed().setColor(client.config.color)
        .setAuthor('Level Channel', client.user.displayAvatarURL())
        .setDescription(`Level channel has changed to message channel`)   
    
        message.channel.send(already)
      } else if(channel.permissionsFor(client.user).has("SEND_MESSAGES", "VIEW_CHANNEL")) {
          db.set(`level_${message.guild.id}.channel`, channel.id) 
          
          let embed = new Discord.MessageEmbed().setColor(client.config.color) 
          .setAuthor('Level Channel', client.user.displayAvatarURL()) 
          .setDescription(`level channel has been set in **${channel.name}**`)
          
          message.channel.send(embed)
      } else {
          var missingPermissionsEmbed = new Discord.MessageEmbed()
          .setColor(client.config.color)
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setTitle("Insufficient Permissions!")
          .setDescription(`I need the \`SEND_MESSAGES, VIEW_CHANNEL\` permission in ${channel} channel!`)
          
          message.channel.send(missingPermissionsEmbed)
      }
  }
}}