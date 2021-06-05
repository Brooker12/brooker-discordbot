const { Client, MessageEmbed } = require('discord.js'); 
const client = new Client(); 
require('discord-buttons')(client);

module.exports.run = async(button) => {
  
  // commands/General/samp.js 
  if(button.id === 'samp-refresh') {
    await button.reply.send('My message');
  }
  
}