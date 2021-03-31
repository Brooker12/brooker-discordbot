const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "clear",
  description: "Deleted message in channel with amount",
  category: "Moderation",
  usage: "`clear <1-100>`",
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: ["purge"],
  run: async (client, message, args) => { 
    
    let invalid = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
    .setDescription(`Input the amount to delete`)
    if(isNaN(args[0])) return message.channel.send(invalid)
    
    let Args = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
    .setDescription(`Usage: ${module.exports.usage || "[ None ]"}`)
    
    if (!args[0]) return message.channel.send(Args)
    
    if(args[0] > 100 || args[0] === '0' || args[0] < 0) return message.channel.send(Args)

   message.channel.bulkDelete(args[0]).then(() => {
    let embed1 = new MessageEmbed().setColor(client.config.color)
    .setTitle("Mod: Clear")
    .setDescription(`**Sucesfully Cleared ${args[0]} message **`)
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete({timeout: 5000}))
 })
}}