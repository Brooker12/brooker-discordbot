const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let Invite = await message.guild.channels
    .find(c => c.type === "text")
    .createInvite();
  let Sender = message.author;
  const sayMessage = args.join(" ");
  let xdemb = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Missing Arguments!")
    .setDescription("Usage: `a.contact [reason]`")
    .setTimestamp();
  if (!sayMessage)
    return message.channel.send(xdemb).then(msg => {
      msg.delete(5000);
    });

  let contact = new Discord.RichEmbed()
    .setColor("#67b358")
    .setThumbnail(Sender.displayAvatarURL)
    .setDescription(`Pesan kontak dari [${message.guild.name}](${Invite.url})`)
    .setTitle("Pesan dari perintah kontak!")
    .addField("Pengguna", Sender, true)
    .addField("ID: ", Sender.id, true)
    .addField("Pesan: ", sayMessage)
    .setTimestamp();

  bot.users.get("629937326545567744").send(contact);

  let embed = new Discord.RichEmbed()
    .setColor("#67b358")
    .setTitle("Pesan Terkirim!")
    .setDescription("Pesan kontak Anda telah terkirim!")
    .addField("Diminta oleh ", Sender)
    .addField("Pesan: ", sayMessage)
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp();

  message.channel.send(embed).then(msg => {
    msg.delete(10000);
  });

  message.delete();
};

module.exports.help = {
    name: "contact",
    description: "contact to developer",
    category: "",
    usage: "`contact <message>`"
}