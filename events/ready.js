const discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async client => {
  
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
	console.log(`Service in ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  
  client.user.setActivity('a.help', {type: 'LISTENING'})
  
  const webhookClient = new discord.WebhookClient(config.WebhookID, config.WebhookToken);
  const embed = new discord.MessageEmbed().setColor(config.color)
  .setDescription(`**${client.user.tag}** is now online again`)
    
  webhookClient.send({
    username: 'Brooker Status',
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
  
};