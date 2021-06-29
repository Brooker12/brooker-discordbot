const { Client, MessageEmbed } = require('discord.js'); 
const client = new Client(); 
require('discord-buttons')(client);

module.exports.run = async (button) => {
  
  await button.defer()
  if (button.id === "samp") {
    button.reply.send("Hola")
  }
  
}