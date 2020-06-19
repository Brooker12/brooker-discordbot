const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  //!tempmute @user 1s/m/h/d
  let ch = message.guild.channels.get("693128532598980688");
  var p = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Messages` permission to use this command!"
    )
    .setTimestamp();
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.sendMessage(p).then(m => m.delete(5000));
  let muterole = message.guild.roles.find(
    muterole => muterole.name === "muted"
  );
  //start of create role
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  var missingArgsEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.mute [@User] [time(s/m/h)] [reason]`")
    .setTimestamp();
  let mutetime = args[1];
  if (!mutetime)
    return message.channel.send(missingArgsEmbed).then(m => m.delete(5000));
 
  let reason = args.slice(2).join(" ");
  if (!reason) {
    reason = "No reason given";
  } else {
    reason = `${reason}`;
  }
  let tomute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!tomute) return message.channel.send(missingArgsEmbed);
  if (tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("🚫 | Can't mute them!");
  await tomute.addRole(muterole.id);
  let mentionedUser = message.mentions.users.first() || message.author;
   let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Muted")
    .setDescription(`**Mute** ${message.mentions.users.first().tag} **for ${ms(ms(mutetime), { long: true })}** \n**Reason:** ${reason}`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1)

  setTimeout(function() {
    tomute.removeRole(muterole.id);
    message.channel
      .send(`<@${tomute.id}> kamu sudah bebas dari muted`)
      .then(m => m.delete(5000));
  }, ms(mutetime));
  // const embed = new Discord.RichEmbed()
  //  .setAuthor('[MUTE] ' + mentionedUser.tag, mentionedUser.avatarURL)
  //  .setFooter(message.author.username, message.author.avatarURL)
  //  .addField('User', mentionedUser, true)
  //  .addField('Moderator:', message.author, true)
  //  .addField(`Channel:`, `${message.channel}`, true)
  //  .addField("Time mute:", `${ms(ms(mutetime), { long:true })}`, true)
  //  .addField('Reason', reason, true)
  //  .setFooter(message.author.username, message.author.avatarURL)
  //  .setColor("0xFF0000")
  //  .setTimestamp()
  // ch.send(embed)

  //end of module
};

module.exports.help = {
    name: "mute",
    description: "mute someone",
    category: "Moderator",
    usage: "`mute <@user> <time[s/m/h]>`"
}