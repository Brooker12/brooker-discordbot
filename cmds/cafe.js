const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let user = message.author;

  let author = db.fetch(`money_${message.guild.id}_${user.id}`);

  let Embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(
      `${message.author} Anda membutuhkan 35 koin untuk membeli Kopi`
    );

  if (args[0] == "coffe") {
    if (author < 35) return message.channel.send(Embed);
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Beli Kopi dengan 35 Koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 35);
    message.channel.send(Embed2);
  } else if (args[0] == "milk") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda membutuhkan 20 koin untuk membeli susu`
      );
    if (author < 20) return message.channel.send(Embed2);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Beli Susu dengan 20 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 20);
    message.channel.send(Embed3);
  } else if (args[0] == "tea") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Anda perlu 15 koin untuk membeli teh`);
    if (author < 15) return message.channel.send(Embed2);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Beli teh dengan 5 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 15);
    message.channel.send(Embed3);
  } else if (args[0] == "spageti") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda perlu 50 koin untuk membeli spageti`
      );
    if (author < 50) return message.channel.send(Embed2);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Beli Spageti dengan 50 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 50);
    message.channel.send(Embed3);
  } else if (args[0] == "sushi") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda perlu 45 koin untuk membeli sushi`
      );
    if (author < 45) return message.channel.send(Embed2);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Beli Sushi dengan 45 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 45);
    message.channel.send(Embed3);
  } else if (args[0] == "ramen") {
    let Embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${message.author} Anda membutuhkan 35 koin untuk membeli beberapa ramen`
      );
    if (author < 35) return message.channel.send(Embed2);

    let Embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`${message.author} Beli Ramen dengan 35 koin`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 35);
    message.channel.send(Embed3);
  } else {
    const info = new Discord.RichEmbed()
      .setColor("#0099ff")
      .setTitle("●▬▬● Booker Cafe ●▬▬●")
      .setDescription(
        `di bawah ini adalah semua menu dari Booker Cafe
silakan pesan dengan: \`a.cafe [menu]\`

**Drinks**

Coffe: 35
Milk: 20
Tea: 15

**Food**

Spageti: 50
Sushi: 45
Ramen: 35`
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/693507386236731472/695542500437262436/yLK0aQRz0XUJ6vu29reNZj7GtjBLMVutFfJu49GupqG4Zx93VNAqiHpuE8QFNgZGyh58IozdrAFMj7Qz4wGAwGg8FgMBgMBoPBYD.png"
      );
    message.channel.send(info);
    return;
  }
};


module.exports.help = {
    name: "cafe",
    description: "Booker Cafe",
    category: "Economy",
    usage: "`cafe <menu>`"
}