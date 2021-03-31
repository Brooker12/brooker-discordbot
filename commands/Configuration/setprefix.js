const {MessageEmbed} = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setprefix",
  description: "Change bot prefix in your server",
  category: "Configuration",
  usage: "`setprefix <new prefix>`",
  authorPermission: ["ADMINISTRATOR"],
  aliases: ["prefix"],
  run: async (client, message, args) => { 
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  let newpref = args.slice(0).join("")
  
  if(!newpref) {
     let embed = new MessageEmbed().setColor(client.config.color)
     .setAuthor('Prefix Settings', client.user.displayAvatarURL())
     .setDescription(`Prefix is \`${prefix}\``)
     .setFooter(`To change prefix use: ${prefix}prefix <newprefix>`)
    return message.channel.send(embed)
  } else {
  db.set(`prefix_${message.guild.id}`, newpref)
  let embed = new MessageEmbed().setColor(client.config.color)
  .setAuthor('Prefix Settings', client.user.displayAvatarURL())
  .setDescription(`Prefix has been set **${newpref}**`)
  message.channel.send(embed)
  }
  
}};