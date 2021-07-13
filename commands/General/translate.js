const Discord = require("discord.js");
const db = require('quick.db')
const translate = require("@k3rn31p4nic/google-translate-api")
const { getArgs, getMention, getInvalid } = require("../../utils/missing.js")

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
  if(!text) return getArgs(message, client, db)
  if(!language) return getArgs(message, client, db)

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