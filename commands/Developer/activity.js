module.exports = {
  name: "activity",
  description: "",
  category: "Developer",
  ownerOnly: true,
  usage: "activity",
  aliases: ['act', 'acti'],
  run: async (client, message, args) => { 
  
    if(!message.member.voice.channel) return message.channel.send('You must ')
    
    let voiceID = message.member.voice.channelID
    
  }
}