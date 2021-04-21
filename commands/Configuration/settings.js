let {MessageEmbed} = require('discord.js')
let db = require('quick.db')

module.exports = {
  name: 'settings',
  description: 'Display all information in configuration',
  usage: 'settings',
  authorPermissions: 'MANAGE_GUILD',
  aliases: ['config', 'setting'],
  run: async(client, message, args) => {
    
    /*================ Prefix ===================*/
    let prefix = client.config.prefix
  
    /*================ Custom Commands ===================*/
    let custom = db.get(`cmd_${message.guild.id}`)
    if(custom) {
     custom = `\`${custom.map(a => `${a.name}`).join('`, `')}\``
    } else {
     custom = '[ None Commands ]'
    }
    /*================ Ignore Channel ===================*/
    let ignores = await db.fetch(`ignorech_${message.guild.id}.channel`)
    if(ignores === null || ignores === undefined || ignores.length === 0) ignores = "None"
    let igcmd = [];
    if (ignores === 'None') {
       igcmd = "[ None ]"
    } else {
       igcmd = ignores.map(e => `${client.channels.cache.get(e) ? client.channels.cache.get(e) : "#DeletedChannel"}`).join(', ') || "None"
    }
    /*================ Ignore Commands ===================*/
   let igch = db.get(`ignore_${message.guild.id}.command`)
    if(igch === null || igch === undefined || igch.length === 0) {
      igch = '[ None ]'
    } else {
      igch = "`" + igch.join("`, `") + '`'
    }  
    /*================ Leveling ===================*/
    let leveling = await db.fetch(`level_${message.guild.id}.channel`)
    let lvltg = await db.fetch(`level_${message.guild.id}.toggle`)
    let lvlch = client.channels.cache.get(lvlch)
    if (lvlch === null) lvlch = "[ Not set ]"
    if (lvlch === undefined) lvlch = "[ Not set ]"
    /*================ Rewards Role ===================*/
     let rewards = db.get(`rolerewards_${message.guild.id}.reward`)
     let roles;
    if(rewards === null || rewards === undefined || rewards.length === 0) {
      roles = '[ None ]'
    } else {
      roles = rewards.sort((a, b) => a.level - b.level)
              .map(e =>`\n${rewards.indexOf(e) + 1}. Level **${e.level}** - ${message.guild.roles.cache.get(e.roles) ? 
                                                                              message.guild.roles.cache.get(e.roles) : "DeletedRoles"}`).join(" ");
    }
    /*================ Welomcers ===================*/
  
  }
}