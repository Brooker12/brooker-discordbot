const discord = require('discord.js')
const config = require('../config.json')
const Slash = require("dsc-slash")

module.exports.run = async client => {
  
  //Discord-Slash
  
  const slash = new Slash.Client(client, client.user.id)
  
  const cmd = await slash.postCommand({name: "test", description:"Test Slash Command"}, "788251058630688798")
  console.log(cmd)
  
  client.ws.on("INTERACTION_CREATE", async interaction => { 
  
  const inter = await slash.parseCommand(interaction)
  if(inter.name === "test") {
    inter.reply('Test', { ephermal: true })
  } else if(inter.name === "ping") {
    inter.reply("Pingtol")
  }
    
  })
  

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