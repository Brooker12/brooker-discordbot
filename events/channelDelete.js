const discord = require("discord.js")
const db = require('quick.db')

module.exports.run = async(client, channel) => {
  let ignores = await db.fetch(`ignorech_${channel.guild.id}.channel`)
  
  if(ignores === null || ignores === undefined || !ignores.length || ignores.length === 0) return;
  
  let finds = ignores.find(x => x === channel.id)
   
   if(ignores && finds) {
         let value = ignores.indexOf(finds)
         delete ignores[value]

         var filter = ignores.filter(x => {
         return x != null && x != ''
         })
         
         db.set(`ignorech_${channel.guild.id}.channel`, filter) 
   }
}