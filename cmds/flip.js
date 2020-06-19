const Discord = require("discord.js");
const mapping =
  "¡\"#$%⅋,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~";
// Start with the character '!'
const OFFSET = "!".charCodeAt(0);

exports.run = (bot, message, args) => {
  var q = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.flip [text]`")
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp();
  if (args.length < 1)
    return message.channel.send(q).then(msg => msg.delete(2000));

  message.channel.send(
    args
      .join(" ")
      .split("")
      .map(c => c.charCodeAt(0) - OFFSET)
      .map(c => mapping[c] || " ")
      .reverse()
      .join("")
  );
};

module.exports.help = {
    name: "flip",
    description: "flipping message",
    category: "Fun",
    usage: "`flip <text>`"
}
