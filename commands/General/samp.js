const { MessageButton, MessageActionRow } = require('discord-buttons');
const discord = require('discord.js')
var query = require('samp-query')

module.exports = {
  name: "samp",
  description: "Show samp server information",
  category: "General",
  usage: "`samp <IP:Address>`",
  aliases: [""],
  cooldown: 2000,
  run: async (client, message, args) => { 
    
    let wrong = new discord.MessageEmbed().setColor(client.config.color) 
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Invalid Argument!`)
    let xdemb = new discord.MessageEmbed().setColor(client.config.color) 
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `samp <IP:Address>`")
    .setTimestamp();  
    
    if(!args[0]) return message.channel.send(xdemb)
    if(!message.content.includes('.')) return message.channel.send(wrong)
    
     var options = {
     host: args[0].split(':')[0],
     port: args[0].split(':')[1]
     }

     query(options, async (error, response) => {
       if(error) {
       let embed = new discord.MessageEmbed().setColor(client.config.color)
       .setTitle('There was error')
       .setDescription(`ERROR: ${error}`)
       message.channel.send(embed)
       } else if (response) {
         
         if(args[1] === "player" || args[1] === "players") {
          let embed = new discord.MessageEmbed().setColor(client.config.color) 
          .setTitle(`${response.hostname}`)
          .setDescription(`\`\`\`\n${response.players.map(user => `(${user.id})${user.name}`).join(', ') || "To much player to display or none player"}\n\`\`\``)
          .setFooter(`There are ${response.online || "0"} players online`)
          
          return message.channel.send(embed)
         }
         
       let embed = new discord.MessageEmbed().setColor(client.config.color)
       .setAuthor(response.hostname, 'https://media.discordapp.net/attachments/801988747205935144/859262458719240202/1503230593_samp.png')
       .setThumbnail('https://media.discordapp.net/attachments/801988747205935144/859262458719240202/1503230593_samp.png')
       .addField("Information",`
• **Hostname:** ${response.hostname || "-"}
• **Gamemode:** ${response.gamemode || "-"}
• **Language:** ${response.mapname || "-"}
• **Passworded:** ${response.passworded ? 'yes' : 'no' || "-"}
• **Maxplayers:** ${response.online || "0"}/${response.maxplayers || "-"}`)
        .addField("Rule", `
• **Lagcomp:** ${response.rules.lagcomp ? 'On' : 'Off'}
• **Mapname:** ${response.rules.mapname || "-"}
• **Version:** ${response.rules.version || "-"}
• **Weather:** ${response.rules.weather || "-"}
• **Weburl:** ${response.rules.weburl || "-"}
• **Worldtime:** ${response.rules.worldtime || "-"}`)
       
      let wtf = new MessageButton()
      .setLabel('Players') 
      .setStyle('blurple')
      .setID('samp-players')

      let wtf2 = new MessageActionRow()
      .addComponent(wtf)
       
      await message.channel.send('', {embed: embed, component: wtf2}) 
         
      client.on('clickButton', async (button) => {
         if (button.clicker.member.id !== message.author.id) return;
         if (button.id === "samp-players") {
          let embedthis = new discord.MessageEmbed().setColor(client.config.color) 
          .setTitle(`${response.hostname}`)
          .setDescription(`\`\`\`\n${response.players.map(user => `(${user.id})${user.name}`).join(', ') || "To much player to display or none player"}\n\`\`\``)
          .setFooter(`There are ${response.players.map(user => user.name).length} players online`)
          let verbut = new MessageButton()
           .setStyle('blurple')
           .setLabel('Server Information')
           .setID('samp-info')
           await button.message.edit('', {embed: embedthis, component: verbut}) 
           await button.defer();
          } else if (button.id === "samp-info") {
            await button.message.edit('', {embed: embed, component: wtf2})
            await button.defer();
          }
        });  
      }
   })
}}