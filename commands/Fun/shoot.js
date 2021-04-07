const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "shoot",
  description: "shoot someone with guns.",
  category: "Fun",
  usage: "`shoot <@user>`",
  aliases: [""],
  run: async (client, message, args) => { 
    
    const user = message.mentions.members.first()
  
    const mention = new MessageEmbed().setColor(client.config.color)
    .setAuthor('Invalid Argument', message.author.displayAvatarURL())
    .setDescription(`${message.author}, You have to mention the people you want to shoot him!`)
    if(!user) return message.channel.send(mention)
    
    const self = new MessageEmbed().setColor(client.config.color)
    .setAuthor('Invalid Argument', message.author.displayAvatarURL())
    .setDescription(`${message.author}, You cannot shoot yourself!`)
    if (user.id === message.author.id) return message.channel.send(self);
    
    var players = [message.author.username, user.user.username];
    var player = players[Math.floor(Math.random() * players.length)];
    var guns = ["M4", "m24", "Akm,", "Awm", "Groza", "P90", "nerf gun"];
    
    var gun = Math.floor(Math.random() * guns.length);
    var shots = ["Headshot", "Bodyshot", "Jumpshot", "Squatshot"];
    var shot = Math.floor(Math.random() * shots.length);
    
    let users;
    if (player === message.author.username) users = message.author
    else if (player === user.user.username) users = user.user
    
    let embed = new MessageEmbed().setColor(client.config.color)
    .setAuthor(`${users.username}'s shot`, users.displayAvatarURL())
    .setDescription(`**${player}** has killed his opponent with **${guns[gun]}** by **${shots[shot]}**`)
    return message.channel.send(embed)

  }
}