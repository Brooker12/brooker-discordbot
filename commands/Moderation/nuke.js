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
    
    const filter = response => { return response.author.id === message.author.id; } 
    
    let messag = message.channel.send('Are you sure want to clear all chat channel '+ channel.name).then((msg) => {
      
      msg.channel.awaitMessages(filter, {  max: 1, time: 30000, errors: ['time'] })
      .then(collected  => {
        let choice = collected.first().content.toLowerCase();
         if (choice == "yes" || choice == "y") {           
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
          } else if (choice == 'no' || choice == 'n' || choice == 'exit' || choice == 'cancel') {
              let embed1 = new MessageEmbed().setColor(client.config.color)
              .setTitle("Mod: Nuke")
              .setDescription(`**Canceled cleared channel message**`)
              messag.edit(embed1).then(m => m.delete({timeout: 10000}))
         }
       }).catch(collected => {
             let embed1 = new MessageEmbed().setColor(client.config.color)
              .setTitle("Mod: Nuke")
              .setDescription(`**Canceled cleared channel message**`)
             messag.edit(embed1).then(m => m.delete({timeout: 10000}))
       });
    })
}}