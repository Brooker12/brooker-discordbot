const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("a.")) return;

  let user = message.author;

  let author = db.fetch(`money_${message.guild.id}_${user.id}`);

  let Embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(
      `${message.author} Anda perlu 2000 koin untuk membeli Bronze VIP`
    );

  if (args[0] == "bronze") {
    if (author < 3500) return message.channel.send(Embed);

    db.fetch(`bronze_${message.guild.id}_${user.id}`);
    db.set(`bronze_${message.guild.id}_${user.id}`, true);

    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Membeli VIP Bronze dengan 3500 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 3500);
    message.channel.send(Embed2);
  } else if (args[0] == "nikes") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda perlu 600 koin untuk membeli beberapa Nikes`
      );

    if (author < 600) return message.channel.send(Embed2);

    db.fetch(`nikes_${message.guild.id}_${user.id}`);
    db.add(`nikes_${message.guild.id}_${user.id}`, 1);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Membeli Nikes dengan 600 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 600);
    message.channel.send(Embed3);
  } else if (args[0] == "car") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda perlu 800 koin untuk membeli mobil baru`
      );

    if (author < 800) return message.channel.send(Embed2);

    db.fetch(`car_${message.guild.id}_${user.id}`);
    db.add(`car_${message.guild.id}_${user.id}`, 1);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Membeli mobil baru dengan 800`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 800);
    message.channel.send(Embed3);
  } else if (args[0] == "mansion") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda membutuhkan 1.200 koin untuk membeli Mansion`
      );

    if (author < 1200) return message.channel.send(Embed2);

    db.fetch(`house_${message.guild.id}_${user.id}`);
    db.add(`house_${message.guild.id}_${user.id}`, 1);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Membeli mansion dengan 1200 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 1200);
    message.channel.send(Embed3);
  } else {
    let embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription("Masukkan item untuk dibeli\n `a.store` untuk item");
    message.channel.send(embed3);
  }
};

module.exports.help = {
    name: "buy",
    description: "buy someone",
    category: "Economy",
    usage: "`buy <item>`"
}