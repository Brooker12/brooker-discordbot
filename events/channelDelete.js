const discord = require("discord.js")
const db = require('quick.db')

module.exports.run = async(client, channel) => {
  let ignores = await db.fetch(`ignorech_${channel.guild.id}.channel`)
  let finds = ignores.find(x => x === channel.id)
  
  if(!finds.length || !ignores.length)  return;
   
   if(ignores && finds) {
         let value = ignores.indexOf(finds)
         delete ignores[value]

         var filter = ignores.filter(x => {
         return x != null && x != ''
         })
         
         db.set(`ignorech_${channel.guild.id}.channel`, filter) 
   }
}