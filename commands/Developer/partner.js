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
  
  let filters = respon => respon.author.id === message.author.id
  
  message.channel.send('Enter the guild id first').then(msg => {
    msg.channel.awaitMessages(filters, {max: 1, time: 10000, errors:['time']}).then(collect => {
      let choice = collect.first().content.toLowerCase()
      if(isNaN(choice)){
        message.channel.send('Errors: Invalid ID')
      } else if (choice === 'cancel' || choice === 'exit') {
        return message.channel.send('Partner setup canceled')
      } else {
        let guild = client.guilds.cache.get(collect.first().content)
        if(!guild) return message.channel.send('Im cannot get the guild with this ID')
        
        message.channel.send(guild.name+' has added to partner, now set up the description [Markdown]').then(() => {
          message.channel.awaitMessages(filters, {max: 1, time: 10000, errors:['time']}).then(col => {
            let choice = col.first().content
            message.channel.send(`guild id: ${collect.first().content}\nDescription:\n\n${choice}`, {code: 'markdown'})
          }).catch(col => {
            message.channel.send('timeout')
          })
        })
      }
    }).catch(collect => {
      message.channel.send('timeoutt')
    })
  })
  
//   let guild = client.guilds.cache.get(args[0]);
//   if(!args[0]) return message.reply('Cannot find that ID.')
//   if (!guild) return message.reply("The bot isn't in the guild with this ID.");
  
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