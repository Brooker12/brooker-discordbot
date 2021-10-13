const Discord = require("discord.js");
const db = require('quick.db')
const translate = require("google-translate-api")

module.exports = {
  name: "translate",
  description: "Translates language using country abbreviations",
  category: "General",
  usage: "`translate <language> <text>`",
  detail: `Language short name like: 
id - indonesia
en - english

Example:
{prefix}translate en Hai apa kabar dengamu?`,
  aliases: ["tr"],
  cooldown: 1500,
  run: async (client, message, args) => { 
  
    
  let text = args.slice(1).join(" ")
  let language = args[0]
  
  let Args = new Discord.MessageEmbed().setColor(client.config.color)
   .setAuthor(`Missing Arguments!`, message.author.displayAvatarURL())
   .setDescription(`Usage: ${client.config.prefix}translate <lang> <text>`);
  
  if(!text) return message.channel.send(Args);
  if(!language) return message.channel.send(Args);

  translate(text, {to: language}).then(res => {
    let embed = new Discord.MessageEmbed().setColor(client.config.color)
    .setAuthor(`Translate ${res.from.language.iso} to ${language}`, message.author.displayAvatarURL())
    .setDescription(res.text)
    message.channel.send(embed)
  }).catch(error => {
        let embed = new Discord.MessageEmbed().setColor(client.config.color)
       .setTitle('There was error')
       .setDescription(`${error}`)
       message.channel.send(embed)
    })     
}}