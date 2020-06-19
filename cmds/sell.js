const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("a.")) return;
  if (!args[0]) return message.reply("Apa yang ingin kau jual??");
  let user = message.author;

  if (args[0] == "nikes") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`🚫 | Kamu tidak memiliki Nikes untuk dijual`);

    let nikeses = await db.fetch(`nikes_${message.guild.id}_${user.id}`);

    if (nikeses < 1) return message.channel.send(Embed2);

    db.fetch(`nikes_${message.guild.id}_${user.id}`);
    db.subtract(`nikes_${message.guild.id}_${user.id}`, 1);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`✅ | Menjual Fresh Nikes dengan 600 koin`);

    db.add(`money_${message.guild.id}_${user.id}`, 600);
    message.channel.send(Embed3);
  } else if (args[0] == "car") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`🚫 | Kamu tidak memiliki Car untuk dijual`);

    let cars = await db.fetch(`car_${message.guild.id}_${user.id}`);

    if (cars < 1) return message.channel.send(Embed2);

    db.fetch(`car_${message.guild.id}_${user.id}`);
    db.subtract(`car_${message.guild.id}_${user.id}`, 1);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`✅ | Menjual Car dengan 800 koin`);

    db.add(`money_${message.guild.id}_${user.id}`, 800);
    message.channel.send(Embed3);
  } else if (args[0] == "mansion") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`🚫 | Kamu tidak memiliki Mansion untuk dijual`);

    let houses = await db.fetch(`house_${message.guild.id}_${user.id}`);

    if (houses < 1) return message.channel.send(Embed2);

    db.fetch(`house_${message.guild.id}_${user.id}`);
    db.subtract(`house_${message.guild.id}_${user.id}`, 1);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`✅ | Menjual Mansion dengan 1200 koin`);

    db.add(`money_${message.guild.id}_${user.id}`, 1200);
    message.channel.send(Embed3);
  }
};

module.exports.help = {
    name: "sell",
    description: "sell you item",
    category: "Economy",
    usage: "`sell <item>`"
}