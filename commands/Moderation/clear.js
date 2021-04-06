const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "clear",
  description: "Deleted message in channel or user with amount",
  category: "Moderation",
  usage: "`clear <1-100> || clear <@user> <1-100>`",
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  aliases: ["purge"],
  run: async (client, message, args) => { 

    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (member) {
      args.shift();
    }
    
    let invalid = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
    .setDescription(`Input the amount to delete`)
    if(isNaN(args[0])) return message.channel.send(invalid)
    
    let Args = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
    .setDescription(`Usage: ${module.exports.usage || "[ None ]"}`)
    
    if (!args[0]) return message.channel.send(Args)
    
    if(args[0] > 100 || args[0] === '0' || args[0] < 0) return message.channel.send(Args)

    const amount = Number(args[0]) > 100 ? 101 : Number(args[0]) + 1;
    
    let messages;
    if (member) {
      messages = (await message.channel.messages.fetch({ limit: amount })).filter(m => m.member.id === member.id);
    } else messages = amount;
    
   message.channel.bulkDelete(messages).then(() => {
    let embed1 = new MessageEmbed().setColor(client.config.color)
    .setTitle("Mod: Clear")
    .setDescription(`**Sucesfully Cleared ${args[0]} message **`)
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).then(m => m.delete({timeout: 8000}))
 })
}}  