let {MessageEmbed} = require('discord.js')
let db = require('quick.db')

module.exports = {
  name: 'config',
  description: 'Display all information in configuration',
  usage: 'settings',
  category: 'Configuration',
  authorPermissions: 'MANAGE_GUILD',
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

  
    let pages = [`
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
`,`
**Leveling | ${lvltg ? 'Enable' : 'Disable'}**
• Level Log: ${lvlch}

**Rewards Roles | ${rewards ? rewards.length : 0}**
${roles}

**Guild Prefix**
• Prefix: ${prefix}
`,`
**Custom Commands | ${custom ? custom.length : 0}**
${cmd}

**Ignore Commands | ${ignorex ? ignorex.length : 0}**
${igch}

**Ignore Channels | ${ignores ? ignores.length : 0}**
${igcmd}
`]
    
      let page = 1; 
      const embed = new MessageEmbed().setColor(client.config.color)
      .setAuthor(`Configurations`, client.user.displayAvatarURL())
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page-1])

      message.channel.send(embed).then(msg => {

        msg.react('⬅').then( r => {
        msg.react('➡')

        // Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});

        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            embed.setAuthor(`Setting Command`, client.user.displayAvatarURL())
            msg.edit(embed)
          
            r.users.remove(r.users.cache.filter(u => u === message.author).first())
        })

        forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;
            embed.setAuthor(`Setting Command`, client.user.displayAvatarURL())
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
          
            r.users.remove(r.users.cache.filter(u => u === message.author).first())
          })
       })
    })
  }
}