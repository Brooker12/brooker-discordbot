const { Client, MessageEmbed } = require('discord.js'); 
const client = new Client(); 
require('discord-buttons')(client);

module.exports.run = async (button) => {
  
  if (button.id === 'samp') {
    
     await button.reply.send('My message');
    
  }
  
}