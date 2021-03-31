const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans the member from server of the user you mention",
  category: "Moderation",
  botPermission: ["BAN_MEMBERS"],
  authorPermission: ["BAN_MEMBERS"],
  usage: "`ban <@user> <reason>`",
  aliases: [""],
  run: async (client, message, args) => { 
    
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  
  let xdembx = new MessageEmbed().setColor(client.config.color) 
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("You need mentions users first")
    .setTimestamp();  
  if (!member) return message.channel.send(xdembx)
    
  let xdemb = new MessageEmbed().setColor(client.config.color)
  .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
  .setDescription("I can't block this user!")
  let ctx = new MessageEmbed().setColor(client.config.color)
  .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
  .setDescription("You cannot block yourself")
  if (!member.bannable) return message.channel.send(xdemb)
  if (member.id === message.author.id) return message.channel.send(ctx)
    
  let reason = args.slice(1).join(" ");
  if (!reason) { reason = "No reason given";
  } else { reason = `${reason}`;}
  
   message.guild.members.ban(member);
   let embed1 = new MessageEmbed()
    .setTitle("Mod: Banned")
    .setDescription(`**Banned** ${message.mentions.users.first().tag} **Reason:** ${reason}`)
    .setColor(client.config.color)
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1).catch(error => {
        let embed = new MessageEmbed().setColor(client.config.color)
       .setTitle('There was error')
       .setDescription(`ERROR: ${error}`)
       message.channel.send(embed)
    })
  }}