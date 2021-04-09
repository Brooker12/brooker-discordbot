const db = require("quick.db")
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const { ownerID, default_prefix } = require("../config.json");
const { addexp, getInfo } = require("../handlers/xp.js")
const TicTacToe = require('discord-tictactoe');
const topgg = require('top.gg-core');
const dbl = new topgg.Client(process.env.dblToken)
let cooldown = {}
let cooldowns = new Set()

module.exports.run = async (client, message) => {
  
  if (message.author.bot) return;
  if (!message.guild) return;

  
  
  //-------------------------------------------- L E V E L I N G -------------------------------------------
  
  let lvl = db.get(`level_${message.guild.id}.toggle`)
  
  if (lvl === "on") {
  addexp(message) 
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
  //-------------------------------------------- M E N T I O N ----------------------------------------------
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = default_prefix;
  
  client.config = {
   prefix: prefix,
   owner: ownerID,
   color: '#2f3136' 
  }

  //-------------------------------------------- BLACKLISTED ------------------------------------------- 
  let blacklist = await db.fetch(`blacklist_${message.author.id}`);
  let user = db.fetch(`userblacklist_${message.author.id}`);

  if (blacklist === "Blacklisted") {
    if ((message.author.id = user)) {
      if (message.content.startsWith(prefix)) {
        let blembed = new MessageEmbed().setColor('#2f3136')
        .setDescription(`${message.author}, You're blacklisted from the bot!`)
        
        return message.channel.send(blembed)
      }
    }
  }
  //---------------------------------------------- IGNORE COMMAND ------------------------------------------------
  let ignore = db.get(`ignore_${message.guild.id}.command`)
  
  if(ignore && ignore.length && !message.member.hasPermission("ADMINISTRATOR")) {
     let content = message.content.toLowerCase().slice(0).trim().split(/ +/g)[0].split(prefix)[1]
     let prop =  client.commands
     let ignoreName = prop.get(content) || prop.get(client.aliases.get(content))
      if(ignoreName) {
         let embed = new MessageEmbed().setColor('#2f3136')
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`That command has been disable by admin`)
        if(ignore.includes(ignoreName.name)) return message.channel.send(embed).then(m => m.delete({timeout: 5000}))   
      }
  }
  //-------------------------------------------- I G N O R E C H -------------------------------------------
  
  let ignoreChannel = await db.fetch(`ignorech_${message.guild.id}.channel`)
  
  if (ignoreChannel && ignoreChannel.length && message.content.toLowerCase().startsWith(prefix)) {
    if(ignoreChannel.includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {
        var ignoresend = new MessageEmbed().setColor('#2f3136')
         .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`This channel has ignore to send command`)
       return message.channel.send(ignoresend).then(m => m.delete({timeout: 5000}))    
    }
  }  

  //--------------------------------------------  S Y S T E M -------------------------------------------
  
  if (!message.member)
    message.member = await message.guild.members.fetch(message);

  let msg = message.content.toLowerCase();
  const args = message.content.slice(prefix.length)
               .trim()
               .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  //--------------------------------------------  C H E C K, A F K -------------------------------------------
  
  let target = message.mentions.users.first();
    
  message.mentions.members.forEach((user) => {
  if ( message.content.includes('@here') || message.content.includes('@everyone'))
  return false;
    
  const mentioned = client.afk.get(user.id);
    
  if (mentioned) {
  let users = user.displayName ? user.displayName : user.user.username
  const aefka = new MessageEmbed().setColor('#2f3136')
  .setDescription(`**${users} ** is AFK. Reason: ${mentioned.reason} - ${moment.utc(mentioned.time).fromNow()}`)
  
  message.channel.send(aefka);
  } 
 });
 
  let afkcheck = client.afk.get(message.author.id);
  
  const fek = new MessageEmbed().setColor('#2f3136')
  .setDescription(`${message.author.username}, has been removed from the afk list!`)
  
  if (afkcheck) [client.afk.delete(message.member.id), message.channel.send(fek).then(msg => msg.delete({ timeout: 5000 }))];  
  
  //-------------------------------------------- CUSTOM COMMAND ---------------------------------------------
  
  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  
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
    .setColor('#2f3136')
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
    .setColor('#2f3136')
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
    var ownerr = new MessageEmbed().setColor('#2f3136')
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