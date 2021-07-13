
module.exports = {
  name: "invite",
  description: "Brooker Invite URL",
  category: "Slash",
  usage: "invite",
  options: [],
  run: async (client, interaction, args) => { 
    
    interaction.reply('https://brooker.cf/invite', { ephermal: true }) 
    
  }
}