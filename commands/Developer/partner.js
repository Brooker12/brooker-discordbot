const moment = require("moment");
const db = require('quick.db')
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "partner",
  description: "parnter",
  category: "Developer",
  ownerOnly: true,
  usage: "partner",
  aliases: [""],
  run: async (client, message, args) => {  
    
  let partner = db.get(`partner`)
    
  const filter = response => { return response.author.id === message.author.id}
    
  message.channel.send('Enter the guild id').then(msg => {
    msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then(ch => {
      let c = ch.first().content.toLowerCase()
      if(c == isNaN) {
        message.channel.send('thanks')
      } else {
        message.channel.send('Command Canceled')
      }
    }).catch(ch => { message.channel.send('Time\'s up') })
  })
  
//   if(!partner) {
//   let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
//    if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')

//    invitechannels.random().createInvite().then((invite) => {
//      let data = {
//        id: guild.id,
//        link: invite.code
//      }
//      db.push(`partner`, data)
//      message.channel.send('Succesfully added that server to partner list')
//    })  
//   }
    
//    if(partner.find(x => x.id === guild.id)) {
//      let data = partner.find(x => x.id === guild.id)
//          let value = partner.indexOf(data)
//          delete partner[value]

//          var filter = partner.filter(x => {
//          return x != null && x != ''
//          })
//          db.set(`partner`, filter) 
          
//         return message.channel.send(`Deleted partner ${guild.name}`)
//    } else {
//   let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
//    if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')

//    invitechannels.random().createInvite().then((invite) => {
//      let data = {
//        id: guild.id,
//        link: invite.code
//      }
//      db.push(`partner`, data)
//      message.channel.send('Succesfully added that server to partner list')
//    }) 
//    }
  }
}