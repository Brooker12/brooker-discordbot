const Discord = require("discord.js");

module.exports = {
  name: "dm",
  description: "answer bug or reports",
  category: "Developer",
  ownerOnly: true,
  usage: "dm <id> <answer>",
  aliases: 'answer',
  run: async (client, message, args) => {
    
    const id = args.shift();
    const sayMessage = args.join(" ")
    if(!sayMessage) return message.reply("Usage `answer ID  your message`")
    
   let contact = new Discord.MessageEmbed().setColor(client.config.color)
     .setAuthor('This message from our team', client.user.displayAvatarURL())
     .addField("Response: ", sayMessage)
     .setFooter(`- ${message.author.username}`, message.author.displayAvatarURL())
    client.users.cache.get(id).send(contact).catch(e => {
      message.channel.send(`I can't send message that user couz:\n\n{e}`)
    });

    let chanemb = new Discord.MessageEmbed().setColor(client.config.color)
     .setDescription(`Message send to <@${id}>`)
     .setAuthor(`Succesfully answer to user`)
    message.channel.send(chanemb).then(msg => msg.delete({timeout: 5000}));
    message.delete();
  }
}