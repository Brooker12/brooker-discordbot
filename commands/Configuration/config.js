let { MessageEmbed } = require('discord.js')
//let { MessageButton, MessageActionRow } = require('discord-buttons')
let db = require('quick.db')

module.exports = {
  name: 'config',
  description: 'Display all information in configuration',
  usage: 'settings',
  category: 'Configuration',
  authorPermissions: ['MANAGE_GUILD'],
  aliases: ['settings'],
  run: async(client, message, args) => {
    
    /*================ Prefix ===================*/
    let prefix = client.config.prefix
  
    /*================ Custom Commands ===================*/
    let custom = db.get(`cmd_${message.guild.id}`)
    let cmd;
    if(custom && custom.length) {
      cmd = `\`${custom.map(a => `${a.name}`).join('`, `')}\``
    } else {
     cmd = '[ None Commands ]'
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
   let ignorex = db.get(`ignore_${message.guild.id}.command`)
   let igch = [];
    if(ignorex === null || ignorex === undefined || ignorex.length === 0) {
      igch = '[ None ]'
    } else {
      igch = "`" + igch.join("`, `") + '`'
    }  
    /*================ Leveling ===================*/
    let leveling = await db.fetch(`level_${message.guild.id}.channel`)
    let lvltg = await db.fetch(`level_${message.guild.id}.toggle`)
    let lvlch = client.channels.cache.get(leveling)
    if (lvlch === null) lvlch = "[ Not set ]"
    if (lvlch === undefined) lvlch = "[ Not set ]"
    /*================ Rewards Role ===================*/
     let rewards = db.get(`rolerewards_${message.guild.id}.reward`)
     let roles;
    if(rewards === null || rewards === undefined || rewards.length === 0) {
      roles = '[ None ]'
    } else {
      roles = rewards.sort((a, b) => a.level - b.level)
              .map(e =>`• Level **${e.level}** - ${message.guild.roles.cache.get(e.roles) ? 
                                                                              message.guild.roles.cache.get(e.roles) : "DeletedRoles"}`).join("\n");
    }
    /*================ Welomcers ===================*/
    let weltg = await db.fetch(`welcome_${message.guild.id}.toggle`)
    let welmsg = await db.fetch(`welcome_${message.guild.id}.msg`)
    if (welmsg === null || welmsg === undefined) welmsg = "[ Default by bot ]"
    
    let welcome = await db.fetch(`welcome_${message.guild.id}.channel`)
    let welch = client.channels.cache.get(welcome)
    if (welch === undefined || welch === null) welch = "[ Not set ]"
    /*================ Welomcers ===================*/
    let levtg = await db.fetch(`leave_${message.guild.id}.toggle`)
    let levmsg = await db.fetch(`leave_${message.guild.id}.msg`)
    if (levmsg === null || levmsg === undefined) levmsg = "[ Default by bot ]"
    
    let leave = await db.fetch(`leave_${message.guild.id}.channel`)
    let levch = client.channels.cache.get(leave)
    if (levch === undefined || levch === null) levch = "[ Not set ]"

    
      const cf1 = new MessageEmbed().setColor(client.config.color)
      .setAuthor(`Configurations`, client.user.displayAvatarURL())
      .setFooter(`Page 1 of 3`)
.setDescription(`
**Welcomer System | ${weltg ? 'Enable' : 'Disable'}**
• Channel: ${welch}
• Message: 
\`\`\`
${welmsg}
\`\`\`
**Leave System | ${levtg ? 'Enable' : 'Disable'}**
• Channel: ${levch}
• Message: 
\`\`\`
${levmsg}
\`\`\`
`)
      
      const cf2 = new MessageEmbed().setColor(client.config.color)
      .setAuthor(`Configurations`, client.user.displayAvatarURL())
      .setFooter(`Page 2 of 3`)
      .setDescription(`
**Leveling | ${lvltg ? 'Enable' : 'Disable'}**
• Level Log: ${lvlch}

**Rewards Roles | ${rewards ? rewards.length : 0}**
${roles}

**Guild Prefix**
• Prefix: ${prefix}
`)

      const cf3 = new MessageEmbed().setColor(client.config.color)
      .setAuthor(`Configurations`, client.user.displayAvatarURL())
      .setFooter(`Page 3 of 3`)
      .setDescription(`
**Custom Commands | ${custom ? custom.length : 0}**
${cmd}

**Ignore Commands | ${ignorex ? ignorex.length : 0}**
${igch}

**Ignore Channels | ${ignores ? ignores.length : 0}**
${igcmd}
`)
      
  let next = new MessageButton().setStyle('grey').setID('next').setLabel('>>')
  let back = new MessageButton().setStyle('grey').setID('back').setLabel('<<')
  
  let nextDisable = new MessageButton().setStyle('grey').setID('next-disable').setLabel('>>').setDisabled();
  let backDisable = new MessageButton().setStyle('grey').setID('back-disable').setLabel('<<').setDisabled();      
  
  let active = new MessageActionRow().addComponent([back, next])
  let disable = new MessageActionRow().addComponent([backDisable, nextDisable])
  
  let embed = [cf1, cf2, cf3]
  
  message.channel.send({embed: embed[0], components:active}).then(msg => {
    
   const collector = msg.createButtonCollector((button) => message.author.id === message.author.id, {time: 300000});
    
    let pages = 0;
    
    collector.on('collect', btn => {
      btn.reply.defer()
      if(btn.clicker.user.id === message.author.id) {
        if(btn.id === 'back') {
          if(pages !== 0) {
            --pages
            msg.edit({embed: embed[pages], components: active})
          } else {
            pages = embed.length - 1
            msg.edit({embed: embed[pages], components: active})
          }
        } else if(btn.id === 'next') {
          if(pages < embed.length - 1) {
            pages++
            msg.edit({embed: embed[pages], components: active})
          } else {
            pages = 0;
            msg.edit({embed: embed[pages], components: active})
          }
        }
      }
    })
    collector.on('end', btn => {
      if(msg) {
        msg.edit('This message has disabled', {embed: cf1, components: disable})
      }
    })
      
   })
  }
}