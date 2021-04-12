const db = require("quick.db")
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const { ownerID, default_prefix, color} = require("../config.json");
const { addexp, getInfo } = require("../handlers/xp.js")
const topgg = require('top.gg-core');
const { Slash } = require("discord-slash-commands");
const dbl = new topgg.Client(process.env.dblToken)
const embed = new MessageEmbed()
let cooldown = {}
let cooldowns = new Set()

module.exports.run = async (client, message) => {
  
  const slash = new Slash({ client: client })
  
  slash.on("create", (d) => { console.log(`Command created: ${JSON.parse(d.config.data).name}`) })

  slash.on("command", async (command) => {
    if (command.name === "activities") {
        let channel = client.channels.cache.get(command.options.find(m => m.name === "channel").value);
        if (channel.type !== "voice") return command.callback("Channel must be a voice channel.")
        if (command.options.find(m => m.name === "type").value === "yt") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **YouTube Together** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "pn") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Poker Night** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "bio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "773336526917861400",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Betrayal.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "fio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "814288819477020702",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Fishington.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
    }
})
  
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = default_prefix;
  
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      let prex = new MessageEmbed().setColor(color)
      .setDescription(`${message.author}, My Current Prefix Is: **${prefix}**`)
        
      return message.channel.send(prex) 
    }
  
  //---------------------------------------------- Clients ---------------------------------------------------
  
  client.config = {
   prefix: prefix,
   owner: ownerID,
   color: color 
  }
  
  client.wait = function(time) {
   return new Promise(resolve => {
     setTimeout(resolve, time)
   })
  }
  
  client.missArgs = function(mod) {
    let missings = new MessageEmbed().setColor(color)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Usage: \`${mod.exports.usage}\``)
    return message.channel.send(missings)
  }
  
  //--------------------------------------------- R E W A R D S ---------------------------------------------
  let rewards = db.get(`rolerewards_${message.guild.id}`)
  
  let xp = db.get(`xp_${message.guild.id}_${message.author.id}`) || 0;
  const { level, remxp, levelxp } = getInfo(xp)
  
  if(rewards && rewards.length && message.guild.me.hasPermission('MANAGE_ROLES')) {
   let rewlvl = rewards.find(x => x.level === `${level}`)
    if(rewlvl && !message.member.roles.cache.has(rewlvl.roles)) {
        message.member.roles.add(rewlvl.roles)  
    }
  }
  
  //-------------------------------------------- I G N O R E C H -------------------------------------------
  
  let ignoreChannel = await db.fetch(`ignorech_${message.guild.id}.channel`)
  
  if (ignoreChannel && ignoreChannel.length && message.content.toLowerCase().startsWith(prefix)) {
    if(ignoreChannel.includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {
        var ignoresend = new MessageEmbed().setColor(color)
         .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`This channel has ignore to send command`)
       return message.channel.send(ignoresend).then(m => m.delete({timeout: 5000}))    
    }
  }  

  //--------------------------------------------  S Y S T E M -------------------------------------------
  
  if (!message.member) message.member = await message.guild.members.fetch(message);

  let msg = message.content.toLowerCase();
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
 addexp(message)
  
  //--------------------------------------------  C H E C K, A F K -------------------------------------------
  
  let target = message.mentions.users.first();
    
  message.mentions.members.forEach((user) => {
  if ( message.content.includes('@here') || message.content.includes('@everyone'))
  return false;
    
  const mentioned = client.afk.get(user.id);
    
  if (mentioned) {
  let users = user.displayName ? user.displayName : user.user.username
  const aefka = new MessageEmbed().setColor(color)
  .setDescription(`**${users} ** is AFK. Reason: ${mentioned.reason} - ${moment.utc(mentioned.time).fromNow()}`)
  
  message.channel.send(aefka);
  } 
 });
 
  let afkcheck = client.afk.get(message.author.id);
  
  const fek = new MessageEmbed().setColor(color)
  .setDescription(`${message.author.username}, has been removed from the afk list!`)
  
  if (afkcheck) [client.afk.delete(message.member.id), message.channel.send(fek).then(msg => msg.delete({ timeout: 5000 }))];  

  //---------------------------------------------- IGNORE COMMAND ------------------------------------------------
  let ignore = db.get(`ignore_${message.guild.id}.command`)
  
  if(ignore && ignore.length && !ignore.length == 0 && !message.member.hasPermission("ADMINISTRATOR")) {
    let ignoreName = ignore.find(x => x === cmd)
     if(ignoreName) {
         let embed = new MessageEmbed().setColor(color)
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`That command has been disable by admin`)
         return message.channel.send(embed)
     }
  }
  
  //-------------------------------------------- CUSTOM COMMAND ---------------------------------------------
  
  if (cmd.length === 0) return;
  
  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) {
     message.channel.send(cmdy.responce) 
    }
  }
  
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));


  if (!command) return;
  
  //-------------------------------------------- P E R M I S S I O N -------------------------------------------

  if (command.botPermission) {
    let neededPerms = []

    command.botPermission.forEach(p => {
      if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`")
    })

    var missingBotPermissionsEmbed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("Insufficient Permissions!")
    .setDescription(`I need the ${neededPerms.join(", ")} permission to use this command!`)
    
    if (neededPerms.length) return message.channel.send(missingBotPermissionsEmbed)
  } 
  
  if (command.authorPermission) {
    let neededPerms = []

       command.authorPermission.forEach(p => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`")
      })   
  
    var missingPermissionsEmbed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("Insufficient Permissions!")
    .setDescription(`You need the ${neededPerms.join(", ")} permission to use this command!`)
     if (neededPerms.length) return message.channel.send(missingPermissionsEmbed)
    
  }

  //--------------------------------------------- V O T E S ----------------------------------------------------------
  if(command.voteOnly) {
      let hasVoted = false;

      const voted = await dbl.isVoted(message.author.id)

      const e = new MessageEmbed().setColor(client.config.color)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`**This command** \`${command.name}\` **required to vote** \n[**CLick Here to Vote**](https://brooker.cf/vote)`)

      if (voted) {
        hasVoted = true;
      }

      if (hasVoted === false) {
        return message.channel.send(e);
      }
  }
  
  // ------ ---------------------------------------O W N E R ----------------------------------------------------------

  if (command.ownerOnly) {
    var ownerr = new MessageEmbed().setColor(color)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`This command can only be use by owner`)
    if (message.author.id !== ownerID) return 
  }

  //------------------------------------------------------COOLDOWN SYSTEM---------------------------------------------

  let uCooldown = cooldown[message.author.id];

  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 0

  if (time && (time > Date.now())) 
  return message.channel.send(`You can again use this command in ${Math.ceil((time - Date.now()) / 1000)} second(s)`)

  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

  //-----------------------------------------------------------------------------------------------------------------
    
   if (command) command.run(client, message, args).catch(e => {
    let embed = new MessageEmbed().setColor(client.config.color)
    .setTitle('There was error command')
    .setDescription(`\`Error [${command.name}]:\`\n\`\`\`js\n${e}\n\`\`\``)
    return client.channels.cache.get('801988747205935144').send(embed)
   })
}