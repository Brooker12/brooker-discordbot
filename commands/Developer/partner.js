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
  
  let guild = client.guilds.cache.get(args[0]);
  if(!args[0]) return message.reply('Cannot find that ID.')
  if (!guild) return message.reply("The bot isn't in the guild with this ID.");
  
  if(!partner) {
  let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
   if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')

   invitechannels.random().createInvite().then((invite) => {
     let data = {
       id: guild.id,
       link: invite.code
     }
     db.push(`partner`, data)
     message.channel.send('Succesfully added that server to partner list')
   })  
  }
    
   if(partner.find(x => x.id === guild.id)) {
     let data = partner.find(x => x.id === guild.id)
         let value = partner.indexOf(data)
         delete partner[value]

         var filter = partner.filter(x => {
         return x != null && x != ''
         })
         db.set(`partner`, filter) 
          
        return message.channel.send(`Deleted partner ${guild.name}`)
   } else {
  let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
   if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')

   invitechannels.random().createInvite().then((invite) => {
     let data = {
       id: guild.id,
       link: invite.code
     }
     db.push(`partner`, data)
     message.channel.send('Succesfully added that server to partner list')
   }) 
   }
  }
}