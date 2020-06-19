const { get } = require("request-promise-native");
const Discord = require("discord.js")
module.exports.run = async(client, message, args) => {
  
   let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.samp [IP:address]`")
    .setTimestamp();
  if(!args[0]) return message.channel.send(xdemb)
  
  
    if(args[0] !== 'all') {
    var options = {
      url: 'https://api.samp-servers.net/v2/server/'+args[0],
      json: true
    }
    } if(args[0] === 'jgrp') {
      options = {
        url: 'https://api.samp-servers.net/v2/server/139.99.125.54:7777',
        json: true
      }
    }
    let nembed = new Discord.RichEmbed()
    .setColor('#e93c37')
    .setDescription('Server not found or doesn\'t have any cases')
    let oembed = new Discord.RichEmbed()
    .setColor('#5ee63e')
    .setDescription('Fetching data from the internet for the best output')
    message.channel.send(oembed).then(msg => {
      get(options).then(body => {
        let embed = new Discord.RichEmbed()
        .setColor('#4e9cc2')
        .setTitle(`${body.core.hn}`)
        .addField('IP', body.core.ip || 'No IP', true)
        .addField('Gamemode', body.core.gm || 'No Gamemode', true)
        .addField('Map', body.ru.mapname || 'No Map', true)
        .addField('Language', body.core.la || 'No Language', true)
        .addField('Version', body.ru.version || 'No Version', true)
        .addField('World Time', body.ru.worldtime || 'No WorldTime', true)
        .addField('Website', body.ru.weburl || 'No Website', true)
        .setTimestamp()
        msg.edit(embed)
      })
      .catch(body => {
        let nembed = new Discord.RichEmbed()
        .setColor('#e93c37')
         .setDescription('Country not found or doesn\'t have any cases'+`\n\n\`${body}\``)
         msg.edit(nembed)
      })
    })
  }

module.exports.help = {
    name: "samp",
    description: "Get information for SAMP server",
    category: "Information",
    usage: "`samp <IP:addres>`"
}