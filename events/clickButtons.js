const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, button) => {
  
  const {MessageButton} = require('discord-buttons')(client)
  
  // commands/General/samp.js 1:72
  if(button.id === 'samp-refresh') {
    button.message.send('pepepepk')
  }
  
}