const { Client, MessageEmbed } = require('discord.js'); 
const client = new Client(); 
require('discord-buttons')(client);

module.exports.run = async (button) => {
  if (button.id === 'samp-refresh') {
    
    let embed = new MessageEmbed()
    .setDescription('This is help page 2 the red one')
    .setTitle('Help page 2')
    .setColor('#FF0000')
    .setFooter('Click on the buttons for other pages') 
    button.reply.send(embed);
    
  }
}