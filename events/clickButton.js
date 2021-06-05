const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (button) => {
  
  if (button.id === 'samp-refresh') {
    
    try {
     await button.reply.send('My message');
     await button.channel.send('My message');
     await button.message.send('My message'); 
    } catch (e) {
      console.log(e)
    }
  }
  
}