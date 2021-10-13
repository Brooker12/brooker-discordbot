const db = require("quick.db")
const moment = require('moment')
const topgg = require('top.gg-core');
const dbl = new topgg.Client(process.env.dblToken)
const { MessageEmbed } = require('discord.js'); 
const { ownerID, default_prefix, color} = require("../config.json");
const { addexp, getInfo } = require("../utils/xp.js")
let cooldown = {}
let cooldowns = new Set()

module.exports.run = async (client, message) => {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = default_prefix;
  
  if (message.author.bot) return;
  if (!message.guild) return;

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
  
  //-------------------------------------------- Prefix -------------------------------------------------------
  
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      let prex = new MessageEmbed().setColor(color)
      .setDescription(`${message.author}, My Current Prefix Is: **${prefix}**`)
        
      return message.channel.send(prex) 
  }
  
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  
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
  client.sendMissing = function(usage) {
    let emb = new MessageEmbed().setColor(client.config.color)
    .setAuthor("Missing Arguments!", message.author.displayAvatarURL())
    .setDescription(`Usage: \`${usage}\``)
    return message.channel.send(emb)
  }
  client.sendInvalid = function(msg) {
    let emb = new MessageEmbed().setColor(client.config.color)
    .setAuthor('Invalid Arguments!', message.author.displayAvatarURL())
    .setDescription(msg)
    return message.channel.send(emb)
  }
  client.logs = function(msg) {
    return client.channels.cache.get(`801988747205935144`).send(msg, {code: 'js'})
  }
  
  //--------------------------------------------- R E W A R D S ---------------------------------------------
  try {

  let rewards = db.get(`rolerewards_${message.guild.id}`)
  
  let xp = db.get(`xp_${message.guild.id}_${message.author.id}`) || 0;
  const { level, remxp, levelxp } = getInfo(xp)
  
  if(rewards && rewards.length && message.guild.me.hasPermission('MANAGE_ROLES')) {
   let rewlvl = rewards.find(x => x.level === `${level}`)
    if(rewlvl && !message.member.roles.cache.has(rewlvl.roles)) {
        message.member.roles.add(rewlvl.roles)  
    }
  }
    
  } catch (e) {
    client.logs(`//There was error while run rewards section \n${e}`)
  }
  
  //-------------------------------------------- I G N O R E C H -------------------------------------------
  
  try {

  let ignoreChannel = await db.fetch(`ignorech_${message.guild.id}.channel`)
  
  if (ignoreChannel && ignoreChannel.length && message.content.toLowerCase().startsWith(prefix)) {
    if(ignoreChannel.includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {
        var ignoresend = new MessageEmbed().setColor(color)
         .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`This channel has ignore to send command`)
       return message.channel.send(ignoresend).then(m => m.delete({timeout: 5000}))    
    }
  }  

  } catch (e) {
    client.logs(`//There was error while run Ignore Channel section \n${e}`)
  }

  //--------------------------------------------  S Y S T E M -------------------------------------------
  
  if (!message.member) message.member = await message.guild.members.fetch(message);

  let msg = message.content.toLowerCase();
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  try {
    addexp(message)
  } catch (e) {
    client.logs(`//There was error while run Leveling section \n${e}`)
  }

  //--------------------------------------------- ADMIN LOGS ----------------------------------------------------
  
  
  
  //---------------------------------------------- IGNORE COMMAND ------------------------------------------------

  try {

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

  } catch (e) {
    client.logs(`//There was error while run Ignore Command section \n${e}`)
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
    
  try{
    if (command) command.run(client, message, args)
  } catch (e) {
    client.logs(`There was error in ${command.name}\n${e}`)
  }

}