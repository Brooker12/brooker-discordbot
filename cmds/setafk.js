const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const setStatus = message.content.split(" ");
  const user = message.mentions.users.firts()
  
  const as = args.join(" ");
  let xdemb = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.setafk [on/off] [reason]`")
    .setTimestamp();
  var EmbedAfk = new Discord.RichEmbed()
    .setColor("#5267ad")
    .setTitle("Anda Berhasil disetel ke AFK")
    .setDescription(message.author.username + "'s AFK: " + as);
  if (!as) return message.channel.send(xdemb).then(m => m.delete(5000));

  var EmbedNotafk = new Discord.RichEmbed()
    .setColor("#e7de27")
    .setTitle(`Selamat datang kembali ${message.author.username}`);

  
  
  if (args[1] === "on") {
    client.user.setAFK(true);
    message.channel.send(EmbedAfk).then(m => m.delete(5000));
  } else if (args[1] === "off") {
    client.user.setAFK(false);
    message.channel.send(EmbedNotafk).then(m => m.delete(5000));
  } else if (!setStatus[1] || setStatus[1] === undefined) {
    message.channel.send(xdemb).then(m => m.delete(5000));
  } else {
    message.channel.send(xdemb).then(m => m.delete(5000));
  }
};


module.exports.help = {
    name: "",
    description: "",
    category: "",
    usage: "``"
}