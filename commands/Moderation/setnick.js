const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "setnick",
  description: "Change user nickname with mention",
  category: "Moderation",
  usage: "`setnick <@user> <NewNick>`",
  botPermission: ["MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: ["setnickname"],
  run: async (client, message, args) => { 
  
    let user = message.mentions.members.first() 
    if(!user)
    
    
  }
}