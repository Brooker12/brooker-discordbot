const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "nuke",
  description: "Deleted all message in channel",
  category: "Moderation",
  usage: "`nuke`",
  botPermission: ["MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: [""],
  run: async (client, message, args) => {
    
    let channel = client.channels.cache.get(message.channel.id)
    var posisi = channel.position;
  
  channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
     channel.delete()
      let embed1 = new MessageEmbed().setColor(client.config.color)
       .setTitle("Mod: Nuke")
       .setDescription(`**Sucesfully Cleared channel message**`)       
       .setImage('https://media1.tenor.com/images/f8c9086b7d8baf32a2648d055a9acbfc/tenor.gif')
       .setFooter(`Moderator: ${message.author.username}`);
        channel2.send(embed1).then(m => m.delete({timeout: 10000}))
       })  
}}