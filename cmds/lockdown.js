const ms = require("ms");
const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  let validUnlocks = ["release", "unlock"];
  let ch = message.guild.channels.get("693128532598980688");

  var missingPermissionsEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Insufficient Permissions!")
    .setDescription(
      "You need the `Manage Channel` permission to use this command!"
    )
    .setTimestamp();
  if (
    !message.member.hasPermission("KICK_MEMBERS") &&
    message.author.id !== "629937326545567744"
  )
    return message.channel
      .send(missingPermissionsEmbed)
      .then(m => m.delete(5000));
  let xdemb = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.lockdown [time (s/m/h)]`")
    .setTimestamp();
  let time = args.join(" ");
  if (!time) return message.channel.send(xdemb);
  if (validUnlocks.includes(time)) {
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
      })
      .then(() => {
        message.channel.sendMessage("**Lockdown lifted.**");
        clearTimeout(client.lockit[message.channel.id]);
        delete client.lockit[message.channel.id];
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        client.lockit[message.channel.id] = setTimeout(() => {
          var warnSuccessfulEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("Lockdown lifted")
            .setColor("#ff2050");
          message.channel.send(warnSuccessfulEmbed).then(m => m.delete(10000));
          message.delete();

          message.channel
            .overwritePermissions(message.guild.id, {
              SEND_MESSAGES: null
            })
            .catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

         let embed1 = new Discord.RichEmbed()
    .setTitle("Mod: Lockdown")
    .setDescription(`**Suucesfully lockdown for ${ms(ms(time), { long: true })}**`)
    .setColor("#ff2050")
    .setFooter(`Moderator: ${message.author.username}`);
   message.channel.send(embed1)
      
        // const embed = new Discord.RichEmbed()
        //   .setFooter(message.author.username, message.author.avatarURL)
        //   .setColor("#25c059")
        //   .setTitle("Channel Locked")
        //   .addField("Moderator: ", message.author, true)
        //   .addField(`Channel:`, `${message.channel}`, true)
        //   .addField("Time: ", `${ms(ms(time), { long: true })}`)
        //   .setTimestamp();
        // ch.send(embed);
      });
  }
};

module.exports.help = {
    name: "lockdown",
    description: "lockdown time",
    category: "Moderator",
    usage: "`lockdown <time[s/m/h]>`"
}