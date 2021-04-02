const moment = require("moment");
const db = require('quick.db')
const discord = require('discord.js')

module.exports = {
  name: "partner",
  description: "parnter",
  category: "Developer",
  ownerOnly: true,
  usage: "partner",
  aliases: [""],
  run: async (client, message, args) => {  
    
  let partner = db.get(`partner`)
  
  let guild = message.guild
  
  let already = partner.find(x => x.id === guild.id)
  if(already) return message.channel.send('This guild has been add to partner')
    
    
  let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
  if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')
    
  invitechannels.random().createInvite().then(invite=> message.channel.send('Found Invite:\ndiscord.gg/' + invite.code))
  
  let data = {
      id: message.guild.id,
      link: 'a'
  }
    
  db.push  
    
    
  }
}