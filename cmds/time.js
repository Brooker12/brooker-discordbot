const Discord = require("discord.js");
const bot = new Discord.Client();
let moment = require('moment');

exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = (message.guild.members.filter(m => m.presence.status != 'offline').size - message.guild.members.filter(m=>m.user.bot).size)
   var a = (`${moment().utcOffset('+0700').format("HH : mm")}`)    
   var c = (`${moment().utcOffset('+0800').format("HH : mm")}`)
   var d = (`${moment().utcOffset('+0900').format("HH : mm")}`)
   var b = (`${moment().utcOffset('+0700').format("dddd, DD-MM-YYYY")}`)
   
   const embed = new Discord.RichEmbed()
            .setTitle('Zona Waktu Indonesia')
            .setColor(0x00A2E8)
            .addField('⏰ WIB', a, true)
            .addField('⏰ WITA', c, true)
            .addField('⏰ WIT', d, true)
            .addField('🗓️ Tanggal', b, true)
      message.channel.send(embed) 
}

module.exports.help = {
    name: "Time",
    description: "Show indonesia Time",
    category: "Information",
    usage: "`a.time`"
}