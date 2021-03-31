const discord = require("discord.js")
const db = require('quick.db')

module.exports.run = async(client, channel) => {
  let ignores = await db.fetch(`ignorech_${channel.guild.id}.channel`)
  if(ignores === null) ignores = "p"
  
   if(ignores.includes(channel.id)) {
         let database = db.get(`ignorech_${channel.guild.id}.channel`)
         let data = database.find(x => x === channel.id)
         let value = database.indexOf(data)
         delete database[value]

         var filter = database.filter(x => {
         return x != null && x != ''
         })
         db.set(`ignorech_${channel.guild.id}.channel`, filter) 
   }
}