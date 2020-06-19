const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    var embedColor = '#ffffff' 
    let ch = message.guild.channels.get("693128532598980688")
    var missingPermissionsEmbed = new Discord.RichEmbed() 
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() 
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `a.warn [@User] [Reason]`') 
        .setTimestamp();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(missingPermissionsEmbed) 
let user = message.mentions.users.first()
if(!user) return message.channel.send(missingArgsEmbed)
let war;
const warns = await db.fetch(`warns_${user.id}`)
if(warns == null) war = 0
else war = warns;

  let reason = args.slice(1).join(" ");
  if (!reason) {
    reason = "No reason given";
  } else {
    reason = `${reason}`;
  }
  
   let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Warned")
    .setDescription(`**Warn** ${message.mentions.users.first().tag} **Total warn:** ${war+1} \n**Reason** ${reason}`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1)
   
var DmWarnEmbed = new Discord.RichEmbed()
.setDescription(`You have been warned in ${message.guild.name} 
\`\`\`by ${message.author.username} 
Reason : ${reason}, 
Total warns: ${war+1}\`\`\` `)
.setColor("#ffffff")
user.send(DmWarnEmbed)
  
db.set(`warns_${user.id}`, war+1)  

    // var warningEmbed = new Discord.RichEmbed()
    //     .setAuthor('[Warn] ' + message.mentions.users.first().tag, message.mentions.users.first().avatarURL)
    //     .setFooter(message.author.username, message.author.avatarURL)
    //     .setColor("0xFF0000")
    //     .setTitle(`Warned`)
    //     .addField('User', mentioned, true)
    //     .addField('Moderator', message.author, true)
    //     .addField('Reason', reason)
    //     .setTimestamp();
    // ch.send(warningEmbed);  
}


module.exports.help = {
    name: "warn",
    description: "Warn Someone",
    category: "Moderator",
    usage: "``warn <@user> <reason>"
}