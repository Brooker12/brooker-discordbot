const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {
  var missingArgsEmbed = new Discord.RichEmbed()
    .setColor("#e43131")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.giveaway [time(s/m/h)] [#channel] [prize]`")
    .setTimestamp();

  const time = args[0];
  const channel = message.mentions.channels.first();
  const prize = args.slice(2).join(" ");

  
  if(!args[0]) return message.channel.send(missingArgsEmbed)
  if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
  if (
    !args[0].endsWith("d") &&
    !args[0].endsWith("h") &&
    !args[0].endsWith("m") &&
    !args[0].endsWith("s")
  )
    return message.channel.send(
      `You did not use the correct formatting for the time!`
    );
  if (!time) return message.channel.send(missingArgsEmbed);
  if (!channel)
    return message.channel.send(missingArgsEmbed);
  if (!prize) return message.channel.send(missingArgsEmbed);
  message.channel
    .send(`*Giveaway created in ${channel}*`)
    .then(m => m.delete(5000));

  let Embed = new Discord.RichEmbed()
    .setTitle(`New giveaway!`)
    .setDescription(
      `The user ${message.author} is started giveaway for the prize of **${prize}**`
    )
    .setTimestamp()
    .setFooter(`${ms(ms(time), { long: true })}`)
    .setColor("#76d9dd");
  let m = await channel.send(Embed);
  m.react("🎉");
  setTimeout(() => {
    if (m.reactions.get("🎉").count === 1) {

     let nol = new Discord.RichEmbed()
      .setTitle(`🎉 Giveaway End! 🎉`)
      .setDescription(`Not enough people reacted for me to start draw a winner!`)
      .setTimestamp() 
      .setColor("#c43838"); 
      m.clearReactions()
      m.edit(nol);
} else {
    let winner = m.reactions
      .get("🎉")
      .users.filter(m => !m.bot)
      .random();
    let win = new Discord.RichEmbed()
      .setTitle(`🎉 Giveaway End! 🎉`)
      .setDescription(
        `Congratulations ${winner} for getting a **${prize}** prize`
      )
      .setTimestamp()
      .setColor("#76d9dd");
    m.clearReactions()
    m.edit(win);
}}, ms(args[0]));
};
module.exports.help = {
  name: 'giveaway',
  description: "create simple giveaway by time (m | h | d)",
  category: "Guild",
  usage: "`giveaway <time> <channel> <prize>`"
};
