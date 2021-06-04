const { MessageEmbed } = require('discord.js')

module.exports.run = async(button) => {
  
  // commands/General/samp.js 75:81
  if(button.id === 'samp-refresh') {
     await button.defer();
     let embed = MessageEmbed()
     .setTitle('Test dulu babi')
     
     button.message.edit(embed);
  }
  
}