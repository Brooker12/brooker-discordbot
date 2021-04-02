const discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async client => {
  
	console.log(`I am ready! Logged in as ${client.user.tag}!`);
	console.log(`Service in ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  
   //   client.api.applications(client.user.id).guilds('788251058630688798').commands.post({data: {
   //    name: 'ping',
   //    description: 'Check the bots ping'
   // }})
  
  const cmd = await client.api.applications(client.user.id).guilds('788251058630688798').commands.get()
  console.log(cmd)
  
//     client.ws.on('INTERACTION_CREATE', async interaction => {
//         const command = interaction.data.name.toLowerCase();
//         const args = interaction.data.options;

//         if (command === 'ping'){ 
//             // here you could do anything. in this sample
//             // i reply with an api interaction
//             client.api.interactions(interaction.id, interaction.token).callback.post({
//                 data: {
//                     type: 4,
//                     data: {
//                         content: interaction.token + ' ' + interaction.id
//                     }
//                 }
//             })
//         }
//     });
  
  const webhookClient = new discord.WebhookClient(config.WebhookID, config.WebhookToken);
  const embed = new discord.MessageEmbed().setColor(config.color)
  .setDescription(`**${client.user.tag}** is now online again`)
    
  
  webhookClient.send({
    username: 'Brooker Status',
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
  
};