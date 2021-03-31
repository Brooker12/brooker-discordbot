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

     query(options, function (error, response) {
       if(error) {
       let embed = new discord.MessageEmbed().setColor(client.config.color)
       .setTitle('There was error')
       .setDescription(`ERROR: ${error}`)
       message.channel.send(embed)
       } else {
         
         if(args[1] === "player" || args[1] === "players") {
          let embed = new discord.MessageEmbed().setColor(client.config.color) 
          .setTitle(`${response.hostname}`)
          .setDescription(`\`\`\`\n${response.players.map(user => `(${user.id})${user.name}`).join(', ') || "To much player to display or none player"}\n\`\`\``)
          .setFooter(`There are ${response.players.map(user => user.name).length} players online`)
          
          return message.channel.send(embed)
         }
         
       let embed = new discord.MessageEmbed().setColor(client.config.color)
       .setTitle(response.hostname)
       .addField("Information", 
`\`\`\`
Hostname   :: ${response.hostname || "-"}
Gamemode   :: ${response.gamemode || "-"}
Language   :: ${response.mapname || "-"}
Passworded :: ${response.passworded ? 'yes' : 'no' || "-"}
Maxplayers :: ${response.maxplayers || "-"}
Online     :: ${response.online || "-"}
\`\`\``)
        .addField("Rule", 
`\`\`\`
Lagcomp    :: ${response.rules.lagcomp ? 'On' : 'Off'}
Mapname    :: ${response.rules.mapname || "-"}
Version    :: ${response.rules.version || "-"}
Weather    :: ${response.rules.weather || "-"}
Weburl     :: ${response.rules.weburl || "-"}
Worldtime  :: ${response.rules.worldtime || "-"}
\`\`\``)
       .addField("Players",
`\`\`\`${response.players.map(user => user.name).length > 10 ? 
      `${response.players.map(user => user.name).slice(0, 10).join(', ')} and ${response.players.map(user => user.name).length - 10} more....` : 
       response.players.map(user => user.name).join(', ') || "To many players to display or none"}\`\`\``)
       
message.channel.send(embed) 
       }
     })
  }}