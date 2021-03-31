const discord = require('discord.js')

module.exports = {
  name: "ping",
  description: "Checks the bot's ping to the Discord server.",
  category: "Information",
  usage: "`ping`",
  aliases: ["pong", "pingpong"],
  cooldown: 5000,
  run: async (client, message, args) => { 
    
    let embed = new discord.MessageEmbed().setColor(client.config.color)
    .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    message.channel.send(embed)
  }}