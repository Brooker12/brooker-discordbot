module.exports = {
  name: "youtubes",
  description: "to;",
  category: "Developer",
  ownerOnly: true,
  usage: "k",
  aliases: [],
  run: async (client, message, args) => { 
    
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        } else {
          message.channel.send('u must in voice channel')
        }
  }
}