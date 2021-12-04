module.exports = {
  name: "activity",
  description: "",
  category: "Developer",
  ownerOnly: true,
  usage: "activity",
  aliases: ['act', 'acti'],
  run: async (client, message, args) => { 
  
    if(!message.member.voice.channel) return message.channel.send('You must be in voice channel.')
    
    let voiceID = message.member.voice.channelID
    let link =  await voiceID.activityInvite("youtube_together")
    if (link) {
      message.channel.send(`[Click Here](https://discord.com/invite/${link.code})`)
    }
  }
}