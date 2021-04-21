let {MessageEmbed} = require('discord.js')
let db = require('quick.db')

module.exports = {
  name: 'settings',
  description: 'Display all information in configuration',
  usage: 'settings',
  authorPermissions: 'MANAGE_GUILD',
  aliases: ['config', 'setting'],
  run: async(client, message, args) => {
    
    /*================ Custom Commands ===================*/
    let cmd = db.get(`cmd_${message.guild.id}`)
    if(cmd) {
     cmd = `\`${cmd.map(a => `${a.name}`).join('`, `')}\``
    } else {
     cmd = '[ None Commands ]'
    }
    
    
  }
}