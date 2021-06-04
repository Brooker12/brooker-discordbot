const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, button) => {
  
  const {MessageButton} = require('discord-buttons')(client)
  
  // commands/General/samp.js 75:81
  if(button.id === 'samp-refresh') {
     await button.defer();
     let embed = MessageEmbed().setColor(client.config.color)
     .setTitle('Test dulu babi')
     
     button.message.edit(embed);
  }
  
}