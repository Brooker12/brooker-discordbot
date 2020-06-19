const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var q = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.talk [text something]`")
    .setTimestamp();
  if (!args[0])
    return (
      message.delete(), message.channel.send(q).then(msg => msg.delete(5000))
    );
  let talk = [
    "Ya",
    "Tidak",
    "Mengapa kamu mencoba?",
    "Bagaimana menurutmu? TIDAK",
    "Mungkin",
    " Tidak pernah",
    " Yup"
  ];
  let random = Math.floor(Math.random() * talk.length);
  const kont = new Discord.RichEmbed()
    .setTitle("🎱8ball Kamu ")
    .addField(`Question`, `${args.join(" ")}`)
    .addField(`Answer`, `${talk[random]}`);
  message.channel.send(kont);
};
module.exports.help = {
    name: "8ball",
    description: "",
    category: "Fun",
    usage: "a.8ball"
}
